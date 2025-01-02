import { TRANSACTION_ACTION_TYPES } from './actionTypes';
import { type IInitialState, type TransactionAction } from './reducer';

export const addTransaction = (transaction: IInitialState): TransactionAction => ({
  type: TRANSACTION_ACTION_TYPES.ADD_TRANSACTION,
  payload: transaction,
});

export const updateTransaction = (transaction: IInitialState): TransactionAction => ({
  type: TRANSACTION_ACTION_TYPES.UPDATE_TRANSACTION,
  payload: transaction,
});

export const deleteTransaction = (id: string): TransactionAction => ({
  type: TRANSACTION_ACTION_TYPES.DELETE_TRANSACTION,
  payload: { id },
});

export const setTransactions = (transactions: IInitialState[]): TransactionAction => ({
  type: TRANSACTION_ACTION_TYPES.SET_TRANSACTIONS,
  payload: transactions,
});
