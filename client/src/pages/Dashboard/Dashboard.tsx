import { Link } from 'react-router-dom';
import { StatCard } from './StatCard';
import { CircleUserRound } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex flex-col px-6 py-4 gap-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-stone-800 font-bold text-2xl">Welcome back, User!</h1>
          <p className="text-stone-400 leading-none text-sm">
            It is best time to manage your finances
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

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total balance" amount={5000} change={10} />
        <StatCard title="Income" amount={5000} change={10} />
        <StatCard title="Expense" amount={5000} change={10} />
        <StatCard title="Total savings" amount={5000} change={10} />
      </div>
    </div>
  );
}
