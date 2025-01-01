import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionValidation } from '../validation/TransactionValidation';

export interface Transaction extends TransactionValidation {
  id: string;
  time: string;
}

interface TransactionsState {
  items: Transaction[];
}

const initialState: TransactionsState = {
  items: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
