// src/contexts/AuthContext.ts
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

// Định nghĩa type cho state và action
interface AuthState {
  isAuthenticated: boolean;
  user: {id: number; name: string} | null;
  token: string | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: {user: {id: number; name: string}; token: string};
}

// Khởi tạo state ban đầu
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Tạo context với type
const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
