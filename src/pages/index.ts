import { lazy } from "react";
import MainPage from "./MainPage";

const TransactionsPage = lazy(() => import("./TransactionsPage"));
const CurrencyPage = lazy(() => import("./CurrencyPage"));
const CashDeskPage = lazy(() => import("./CashDeskPage"));
const ClientsPage = lazy(() => import("./ClientsPage")); 

export { CashDeskPage, ClientsPage, CurrencyPage, MainPage, TransactionsPage };
export { default as NotFoundPage } from './NotFoundPage';
