import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getExchangeRate, SUPPORTED_CURRENCIES } from "@/constants/currency";
import { addTransaction } from "@/store/transactionsSlice";
import {
  type TransactionValidation,
  transactionSchema,
} from "@/validation/TransactionValidation";
import { CircleX } from "lucide-react";
import { useCallback, useEffect } from "react";

interface TransactionFormProps {
  onClose: () => void;
}

const DEFAULT_VALUES: Partial<TransactionValidation> = {
  currency1: SUPPORTED_CURRENCIES[0],
  currency2: SUPPORTED_CURRENCIES[1],
  amount1: "",
  amount2: "",
  operation: "Buy",
  exchangeRate: "",
  amountFromClient: "",
  client: "",
  comment: "",
};

const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const dispatch = useDispatch();
  const form = useForm<TransactionValidation>({
    resolver: zodResolver(transactionSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const updateClientAmount = useCallback((amount: string) => {
      form.setValue("amountFromClient", amount);
  }, [form]);

  const updateAmount2 = useCallback(
    (amount1: string, rate: number) => {
      const baseAmount = parseFloat(amount1) || 0;
      if (!isNaN(baseAmount) && !isNaN(rate)) {
        const amount2 = (baseAmount * rate).toFixed(2);
        form.setValue("amount2", amount2);
        updateClientAmount(amount2);
      }
    },
    [form]
  );

  const updateExchangeRate = useCallback(() => {
    const currency1 = form.watch("currency1");
    const currency2 = form.watch("currency2");
    const amount1 = form.watch("amount1");

    if (currency1 && currency2) {
      const rate = getExchangeRate(currency1, currency2);
      form.setValue("exchangeRate", rate.toString());
      updateAmount2(amount1, rate);
    }
  }, [form, updateAmount2]);

  // Initialize exchange rate when component mounts
  useEffect(() => {
    updateExchangeRate();
  }, [updateExchangeRate]);

  const calculateTotalPayment = useCallback(() => {
    const amount = parseFloat(form.watch("amount1") || "0");
    const rate = parseFloat(form.watch("exchangeRate") || "0");
    const total = Number(amount * rate).toFixed(2);
    return isNaN(amount) || isNaN(rate) ? 0 : Number(total);
  }, [form]);

  const calculateChange = useCallback(() => {
    const totalPayment = calculateTotalPayment();
    const amountFromClient = parseFloat(form.watch("amountFromClient") || "0");
    return isNaN(amountFromClient) ? 0 : Math.abs(Number(amountFromClient - totalPayment)).toFixed(2);
  }, [calculateTotalPayment, form]);

  const onSubmit = useCallback(
    (values: TransactionValidation) => {
      const transaction = {
        id: uuidv4(),
        ...values,
        time: new Date().toISOString(),
      };
      dispatch(addTransaction(transaction));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background p-6 rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Exchange</h2>
          <button onClick={onClose}><CircleX /></button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="currency1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateExchangeRate();
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPORTED_CURRENCIES.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount1"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            updateExchangeRate();
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="currency2"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateExchangeRate();
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPORTED_CURRENCIES.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount2"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <FormLabel className="min-w-[110px]">Operation</FormLabel>
                <FormField
                  control={form.control}
                  name="operation"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select operation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Buy">Buy</SelectItem>
                            <SelectItem value="Sell">Sell</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <FormLabel className="min-w-[110px]">Amount</FormLabel>
                <FormField
                  control={form.control}
                  name="amount1"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <FormLabel className="min-w-[110px]">Rate</FormLabel>
                <FormField
                  control={form.control}
                  name="exchangeRate"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <FormLabel className="min-w-[110px]">Amount from client</FormLabel>
                <FormField
                  control={form.control}
                  name="amountFromClient"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <FormLabel className="min-w-[110px]">Client</FormLabel>
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div >
                <FormLabel>Comment</FormLabel>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total payment:</span>
                <span>{calculateTotalPayment()}</span>
              </div>
              <div className="flex justify-between">
                <span>Change:</span>
                <span>{calculateChange()}</span>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TransactionForm;
