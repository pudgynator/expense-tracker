import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import { categories, transactions } from '../data/transactions';

export function Transactions() {
  const [activeCategory, setActiveCategory] = useState('All');

  const visibleTransactions =
    activeCategory === 'All'
      ? transactions
      : transactions.filter((transaction) => transaction.category === activeCategory);

  return (
    <div className="flex flex-col px-6 py-4 gap-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-stone-800 font-bold text-2xl">Transactions</h1>
          <p className="text-stone-400 leading-none text-sm">
            Review your income and spending
          </p>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 border p-2 border-stone-300 rounded-full text-sm leading-none text-stone-800"
        >
          <CircleUserRound className="w-8 h-8 rounded-full" />
          <span className="text-stone-800 font-medium text-sm">User</span>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-3xl px-4 py-2 text-sm font-medium border ${
              activeCategory === category
                ? 'bg-violet-500 text-white border-violet-500'
                : 'border-stone-300 text-stone-800 hover:bg-violet-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300">
        {visibleTransactions.length === 0 ? (
          <p className="text-stone-400 text-sm">No transactions in this category.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visibleTransactions.map((transaction) => (
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
        )}
      </div>
    </div>
  );
}
