type CurrencyCode = "USD" | "EUR" | "GBP";

interface ExchangeRate {
  rate: number;
  lastUpdated: string;
}

interface CurrencyExchangeRates {
  [key: string]: number;  // Format: "USD-EUR": 0.91
}

type TransactionOperation = "Buy" | "Sell";