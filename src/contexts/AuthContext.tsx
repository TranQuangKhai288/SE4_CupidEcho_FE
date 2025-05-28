import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as UserAPI from "../apis/UserAPI";
import { socketService } from "../sockets/socket";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isSocketConnected: boolean;
}

type AuthAction =
  | {
      type: "RESTORE_TOKEN";
      payload: {
        token: string | null;
        user: IUser | null;
        refreshToken: string | null;
      };
    }
  | {
      type: "LOGIN";
      payload: { token: string; user: IUser; refreshToken: string };
    }
  | { type: "LOGOUT" }
  | { type: "SET_SOCKET_CONNECTED"; payload: boolean }
  | { type: "UPDATE_USER"; payload: IUser }; // Thêm action này

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  isSocketConnected: false,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (userData: {
    token: string;
    user: IUser;
    refreshToken: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>; // Thêm vào context
}>(undefined!);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.payload.token,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };
    case "SET_SOCKET_CONNECTED":
      return {
        ...state,
        isSocketConnected: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        console.log("Restoring token...");
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const userString = await AsyncStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (token && user) {
          dispatch({
            type: "RESTORE_TOKEN",
            payload: { token, refreshToken, user },
          });
        } else if (refreshToken) {
          try {
            const res = await UserAPI.refreshToken(refreshToken);
            const {
              access_token,
              refresh_token: newRefreshToken,
              user: refreshedUser,
            } = res.data;

            await AsyncStorage.setItem("token", access_token);
            await AsyncStorage.setItem("refreshToken", newRefreshToken);
            await AsyncStorage.setItem("user", JSON.stringify(refreshedUser));

            dispatch({
              type: "RESTORE_TOKEN",
              payload: {
                token: access_token,
                refreshToken: newRefreshToken,
                user: refreshedUser,
              },
            });
          } catch (err) {
            console.log("Token refresh failed. Logging out.");
            await logout();
          }
        } else {
          dispatch({
            type: "RESTORE_TOKEN",
            payload: { token: null, refreshToken: null, user: null },
          });
        }
      } catch (e) {
        console.error("Error restoring token", e);
        dispatch({
          type: "RESTORE_TOKEN",
          payload: { token: null, refreshToken: null, user: null },
        });
      }
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.token) {
      const socket = socketService.connect(state.token);

      socket.on("connect", () => {
        dispatch({ type: "SET_SOCKET_CONNECTED", payload: true });
      });

      socket.on("disconnect", () => {
        dispatch({ type: "SET_SOCKET_CONNECTED", payload: false });
      });

      socket.on("connect_error", async (error: any) => {
        if (error.code === "TOKEN_EXPIRED" && state.refreshToken) {
          try {
            const res = await UserAPI.refreshToken(state.refreshToken);
            const {
              access_token,
              refresh_token: newRefreshToken,
              user: refreshedUser,
            } = res.data;

            await AsyncStorage.setItem("token", access_token);
            await AsyncStorage.setItem("refreshToken", newRefreshToken);
            await AsyncStorage.setItem("user", JSON.stringify(refreshedUser));

            dispatch({
              type: "LOGIN",
              payload: {
                token: access_token,
                refreshToken: newRefreshToken,
                user: refreshedUser,
              },
            });
          } catch (err) {
            console.log("Token refresh failed. Logging out.");
            await logout();
          }
        } else if (error.code === "INVALID_TOKEN") {
          console.log("Token không hợp lệ. Logging out.");
          await logout();
        }
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socketService.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token, state.refreshToken]);

  const login = async ({
    token,
    user,
    refreshToken,
  }: {
    token: string;
    user: IUser;
    refreshToken: string;
  }) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { token, user, refreshToken } });
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "refreshToken", "user"]);
    dispatch({ type: "LOGOUT" });
    socketService.disconnect();
  };

  // THÊM PHƯƠNG THỨC UPDATE USER
  const updateUser = async (user: IUser) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
