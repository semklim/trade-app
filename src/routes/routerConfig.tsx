import { RouteProps } from "react-router-dom";

import {
  CashDeskPage,
  ClientsPage,
  CurrencyPage,
  MainPage,
  NotFoundPage,
  TransactionsPage,
} from "@/pages";

export enum AppRoutes {
  MAIN = "main",
  TRANSACTIONS = "transactions",
  CURRENCY = "currency",
  CASH_DESK = "cash_desk",
  CLIENTS = "clients",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.TRANSACTIONS]: "/transactions",
  [AppRoutes.CURRENCY]: "/currency",
  [AppRoutes.CASH_DESK]: "/cash-desk",
  [AppRoutes.CLIENTS]: "/clients",
};

export const routeConfig: RouteProps[] = [
  {
    path: RoutePath.main,
    element: <MainPage />,
  },
  {
    path: RoutePath.transactions,
    element: <TransactionsPage />,
  },
  {
    path: RoutePath.currency,
    element: <CurrencyPage />,
  },
  {
    path: RoutePath.cash_desk,
    element: <CashDeskPage />,
  },
  {
    path: RoutePath.clients,
    element: <ClientsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
