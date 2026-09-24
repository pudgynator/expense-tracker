import { Trash2 } from 'lucide-react';
import type { Transaction } from '../data/transactions';

type TransactionRowProps = {
  transaction: Transaction;
  onDelete?: (id: number) => void;
};

export function TransactionRow({ transaction, onDelete }: TransactionRowProps) {
  const isIncome = transaction.amount >= 0;

  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-3">
        <span className="rounded-full p-2 border border-stone-300">
          <transaction.icon className="w-4 h-4 text-violet-500" />
        </span>
        <div>
          <p className="text-stone-800 text-sm font-medium">{transaction.name}</p>
          <p className="text-stone-400 text-xs">
            {transaction.category} · {transaction.date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p
          className={`text-sm font-semibold ${isIncome ? 'text-green-600' : 'text-stone-800'}`}
        >
          {isIncome ? '+' : '-'}$
          {Math.abs(transaction.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </p>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(transaction.id)}
            className="rounded-full p-2 border border-stone-300 hover:bg-violet-50"
            aria-label={`Delete ${transaction.name}`}
          >
            <Trash2 className="w-4 h-4 text-stone-500" />
          </button>
        ) : null}
      </div>
    </li>
  );
}
