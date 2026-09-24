import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  iconForCategory,
  transactions as starterTransactions,
  type Transaction,
} from '../data/transactions';

type AddExpenseInput = {
  name: string;
  amount: number;
  date: string;
  category: string;
};

type TransactionsContextValue = {
  transactions: Transaction[];
  addExpense: (input: AddExpenseInput) => void;
  deleteTransaction: (id: number) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(starterTransactions);

  function addExpense({ name, amount, date, category }: AddExpenseInput) {
    setTransactions((prev) => [
      {
        id: Date.now(),
        name,
        category,
        amount: -Math.abs(amount),
        date,
        icon: iconForCategory(category),
      },
      ...prev,
    ]);
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, addExpense, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used inside TransactionsProvider');
  }
  return context;
}
