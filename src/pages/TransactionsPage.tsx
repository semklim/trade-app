import TransactionsTable from '@/components/transactions/TransactionTable/TransactionsTable';
import { Button } from '@/components/ui/button';
import { lazy, Suspense, useState, useTransition } from 'react';

const TransactionForm = lazy(() => import("@/components/transactions/TransactionForm/TransactionForm"));

const TransactionsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleOpenForm = () => {
    startTransition(() => {
      setIsFormOpen(true);
    });
  };

  return (
    <div className="container mx-auto p-4 pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button onClick={handleOpenForm}>Add Transaction</Button>
      </div>

      <TransactionsTable />
      <Suspense fallback={<div>Loading...</div>}>
        {isFormOpen && (
          <TransactionForm onClose={() => setIsFormOpen(false)} />
        )}
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
