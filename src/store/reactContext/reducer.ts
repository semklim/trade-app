/* eslint-disable default-case */
import mockTransactions from '@/constants/mock_transactions_result';
import { TransactionValidation } from '@/validation/TransactionValidation';
import { TRANSACTION_ACTION_TYPES } from './actionTypes';

export interface IInitialState extends TransactionValidation {
  id: string;
  time: string;
}

export type TransactionAction =
  | { type: TRANSACTION_ACTION_TYPES.ADD_TRANSACTION; payload: IInitialState }
  | { type: TRANSACTION_ACTION_TYPES.UPDATE_TRANSACTION; payload: IInitialState }
  | { type: TRANSACTION_ACTION_TYPES.DELETE_TRANSACTION; payload: { id: string } }
  | { type: TRANSACTION_ACTION_TYPES.SET_TRANSACTIONS; payload: IInitialState[] };

export const initialState: IInitialState[] = mockTransactions;

export const transactionReducer = (state: IInitialState[], action: TransactionAction): IInitialState[] => {
  try {
    const { type, payload } = action;

    switch (type) {
      case TRANSACTION_ACTION_TYPES.ADD_TRANSACTION: {
        if (!payload) {
          throw new Error('Payload is required for ADD_TRANSACTION');
        }
        return [...state, payload];
      }

      case TRANSACTION_ACTION_TYPES.UPDATE_TRANSACTION: {
        if (!payload) {
          throw new Error('Payload is required for UPDATE_TRANSACTION');
        }
        return state.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        );
      }

      case TRANSACTION_ACTION_TYPES.DELETE_TRANSACTION: {
        if (!payload.id) {
          throw new Error('ID is required for DELETE_TRANSACTION');
        }
        return state.filter((item) => item.id !== payload.id);
      }

      case TRANSACTION_ACTION_TYPES.SET_TRANSACTIONS: {
        if (!Array.isArray(payload)) {
          throw new Error('Payload must be an array for SET_TRANSACTIONS');
        }
        return payload;
      }

      default: {
        return state;
      }
    }
  } catch (error) {
    console.error('Error in dataReducer:', error);
    return state;
  }
};