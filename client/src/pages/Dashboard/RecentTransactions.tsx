import { Link } from 'react-router-dom';
import { transactions } from '../../data/transactions';

export function RecentTransactions() {
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300">
      <div className="flex items-center justify-between">
        <p className="text-stone-800 text-sm font-bold">Recent transactions</p>
        <Link
          to="/transactions"
          className="text-xs font-medium text-violet-500 hover:underline"
        >
          See all
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {recentTransactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between gap-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full p-2 border border-stone-300">
                <transaction.icon className="w-4 h-4 text-violet-500" />
              </span>
              <div>
                <p className="text-stone-800 text-sm font-medium">
                  {transaction.name}
                </p>
                <p className="text-stone-400 text-xs">
                  {transaction.category} · {transaction.date}
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-semibold ${
                transaction.amount >= 0 ? 'text-green-600' : 'text-stone-800'
              }`}
            >
              {transaction.amount >= 0 ? '+' : '-'}$
              {Math.abs(transaction.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
