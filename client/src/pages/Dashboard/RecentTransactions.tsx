import { Link } from 'react-router-dom';
import { TransactionRow } from '../../components/TransactionRow';
import { useTransactions } from '../../context/TransactionsContext';

export function RecentTransactions() {
  const { transactions } = useTransactions();
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300">
      <div className="flex items-center justify-between">
        <p className="text-stone-800 text-sm font-bold">Recent transactions</p>
        <Link
          to="/expenses"
          className="text-xs font-medium text-violet-500 hover:underline"
        >
          See all
        </Link>
      </div>
      {recentTransactions.length === 0 ? (
        <p className="text-stone-400 text-sm">No transactions yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {recentTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
}
