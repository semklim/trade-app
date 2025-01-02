/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import {
  type IInitialState,
  initialState,
  type TransactionAction,
  transactionReducer,
} from './reducer';

interface TransactionContextType {
  state: IInitialState[];
  dispatch: Dispatch<TransactionAction>;
} 

export const TransactionContext = createContext<TransactionContextType>({
  state: initialState,
  dispatch: () => null,
});

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};