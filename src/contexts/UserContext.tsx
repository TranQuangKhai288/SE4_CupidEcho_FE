// src/contexts/UserContext.ts
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

interface UserState {
  profile: {id: number; name: string; bio?: string} | null;
  preferences: {ageRange: number[]; distance: number} | {};
}

interface UserAction {
  type: 'SET_PROFILE' | 'UPDATE_PREFERENCES';
  payload: any; // Có thể refine thêm tùy yêu cầu
}

const initialState: UserState = {
  profile: null,
  preferences: {},
};

const UserContext = createContext<
  | {
      state: UserState;
      dispatch: React.Dispatch<UserAction>;
    }
  | undefined
>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {...state, profile: action.payload};
    case 'UPDATE_PREFERENCES':
      return {...state, preferences: action.payload};
    default:
      return state;
  }
};

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
