import { Link } from 'react-router-dom';
import { StatCard } from './StatCard';
import { RecentTransactions } from './RecentTransactions';
import { MonthlyBudget } from './MonthlyBudget';
import { CircleUserRound, Wallet, TrendingUp, Receipt, PiggyBank } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex flex-col px-6 py-4 gap-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-stone-800 font-bold text-2xl">
            Welcome back, User!
          </h1>
          <p className="text-stone-400 leading-none text-sm">
            It is the best time to manage your finances
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
        <StatCard title="Total balance" amount={5840} change={12} icon={Wallet} />
        <StatCard title="Income" amount={3200} change={8} icon={TrendingUp} />
        <StatCard title="Expense" amount={1460} change={-4} icon={Receipt} />
        <StatCard title="Total savings" amount={1180} change={15} icon={PiggyBank} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <MonthlyBudget spent={1460} limit={2000} />
      </div>
    </div>
  );
}
