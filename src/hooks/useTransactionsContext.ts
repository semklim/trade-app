import { TransactionContext } from '@/store/reactContext';
import { addTransaction, deleteTransaction, setTransactions, updateTransaction } from '@/store/reactContext/actions';
import type { IInitialState } from '@/store/reactContext/reducer';
import { useContext } from 'react';

export const useTransactionsContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }

  const { state, dispatch } = context;

  const add = (transaction: IInitialState) => {
    dispatch(addTransaction(transaction));
  };

  const update = (transaction: IInitialState) => {
    dispatch(updateTransaction(transaction));
  };

  const remove = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const setAll = (transactions: IInitialState[]) => {
    dispatch(setTransactions(transactions));
  };

  return {
    transactions: state,
    add,
    update,
    remove,
    setAll,
  };
};