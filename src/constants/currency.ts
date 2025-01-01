export const SUPPORTED_CURRENCIES: CurrencyCode[] = ["USD", "EUR", "GBP"];

// Exchange rates as of a specific date
export const EXCHANGE_RATES: CurrencyExchangeRates = {
  "USD-EUR": 0.91,  // 1 USD = 0.91 EUR
  "USD-GBP": 0.79,  // 1 USD = 0.79 GBP
  "EUR-USD": 1.10,  // 1 EUR = 1.10 USD
  "EUR-GBP": 0.87,  // 1 EUR = 0.87 GBP
  "GBP-USD": 1.27,  // 1 GBP = 1.27 USD
  "GBP-EUR": 1.15,  // 1 GBP = 1.15 EUR
};

export const getExchangeRate = (currency1: CurrencyCode, currency2: CurrencyCode): number => {
  if (currency1 === currency2) return 1;
  return EXCHANGE_RATES[`${currency1}-${currency2}`] || 0;
};
