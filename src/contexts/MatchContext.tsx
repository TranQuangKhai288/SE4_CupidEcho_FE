// src/contexts/MatchContext.ts
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

interface MatchState {
  matches: {id: number; name: string}[];
  pendingMatches: {id: number; name: string}[];
}

interface MatchAction {
  type: 'SET_MATCHES' | 'ADD_PENDING';
  payload: any;
}

const initialState: MatchState = {
  matches: [],
  pendingMatches: [],
};

const MatchContext = createContext<
  | {
      state: MatchState;
      dispatch: React.Dispatch<MatchAction>;
    }
  | undefined
>(undefined);

const matchReducer = (state: MatchState, action: MatchAction): MatchState => {
  switch (action.type) {
    case 'SET_MATCHES':
      return {...state, matches: action.payload};
    case 'ADD_PENDING':
      return {
        ...state,
        pendingMatches: [...state.pendingMatches, action.payload],
      };
    default:
      return state;
  }
};

export const MatchProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  return (
    <MatchContext.Provider value={{state, dispatch}}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};
