import { z } from 'zod';
import { SUPPORTED_CURRENCIES } from '../constants/currency';
import { TransactionOperation } from '../constants/transactionOperations';

export const transactionSchema = z.object({
  currency1: z.custom<CurrencyCode>((val) => SUPPORTED_CURRENCIES.includes(val as CurrencyCode), {
    message: "Please select a valid currency",
  }),
  amount1: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid positive amount",
  }),
  currency2: z.custom<CurrencyCode>((val) => SUPPORTED_CURRENCIES.includes(val as CurrencyCode), {
    message: "Please select a valid currency",
  }),
  amount2: z.string().optional(),
  operation: z.enum([TransactionOperation.Buy, TransactionOperation.Sell], {
    required_error: "Please select an operation.",
  }),
  exchangeRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Exchange rate must be a positive number",
  }),
  amountFromClient: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount",
  }),
  client: z.string().refine((val) => val.length > 1, { message: "Client name is required"}),
  comment: z.string().optional(),
});

export type TransactionValidation = z.infer<typeof transactionSchema>;