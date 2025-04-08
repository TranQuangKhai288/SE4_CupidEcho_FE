import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as UserAPI from "../apis/UserAPI"; // Giả sử bạn đã có UserAPI

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

type AuthAction =
  | {
      type: "RESTORE_TOKEN";
      payload: {
        token: string | null;
        user: User | null;
        refreshToken: string | null;
      };
    }
  | {
      type: "LOGIN";
      payload: { token: string; user: User; refreshToken: string };
    }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (userData: {
    token: string;
    user: User;
    refreshToken: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
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
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore token + refresh nếu cần khi app mở
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const userString = await AsyncStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (token && user) {
          // Token hợp lệ → restore
          dispatch({
            type: "RESTORE_TOKEN",
            payload: { token, refreshToken, user },
          });
        } else if (refreshToken) {
          // Không có access_token → thử làm mới token
          try {
            const res = await UserAPI.refreshToken(refreshToken);
            const {
              access_token,
              refresh_token: newRefreshToken,
              user: refreshedUser,
            } = res.data;

            // Lưu mới vào AsyncStorage
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
  }, []);

  const login = async ({
    token,
    user,
    refreshToken,
  }: {
    token: string;
    user: User;
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
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
