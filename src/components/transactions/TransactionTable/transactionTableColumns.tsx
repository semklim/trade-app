import { Transaction } from "@/store/transactionsSlice";
import { formatTimestamp } from "@/utils/dateformater";
import { cn } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./ui/TransactionTableHead";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "operation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operation" />
    ),
    cell: ({ row }) => {
      const operation = row.getValue("operation");
      return (
        <span
          className={cn(
            "uppercase px-3 py-1 rounded",
            operation === "Buy"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800",
          )}
        >
          {row.getValue("operation")}
        </span>
      );
    },
  },
  {
    accessorKey: "currency1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency1" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("currency1")}</div>
    ),
  },
  {
    accessorKey: "amount1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount1" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount1"));
      const currency = row.getValue<string>("currency1") || "USD";
      // Format the amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "currency2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency2" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("currency2")}</div>
    ),
  },
  {
    accessorKey: "amount2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount2" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount2"));
      const currency = row.getValue<string>("currency2") || "USD";
      // Format the amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "exchangeRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("exchangeRate")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const formattedDate = formatTimestamp(row.getValue("time"));
      return <div className="lowercase">{formattedDate.date} in {formattedDate.time}</div>;
    },
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => {
      const client = row.getValue<string>("client");

      const formatted = client.slice(0, 4) + "..." + client.slice(-4);

      return <div className="lowercase">{formatted}</div>;
    },
  },
];
