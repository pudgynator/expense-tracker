import { Coffee, ShoppingBag, Bus, type LucideIcon } from 'lucide-react';

type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
};

const recentTransactions: Transaction[] = [
  {
    id: 1,
    name: 'Coffee shop',
    category: 'Food',
    amount: -4.5,
    date: 'Today',
    icon: Coffee,
  },
  {
    id: 2,
    name: 'Grocery store',
    category: 'Shopping',
    amount: -32.8,
    date: 'Yesterday',
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: 'City bus pass',
    category: 'Transport',
    amount: -12,
    date: 'Sep 14',
    icon: Bus,
  },
];

export function RecentTransactions() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300">
      <p className="text-stone-800 text-sm font-bold">Recent transactions</p>
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
