import { MoveUpRight, type LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  amount: number;
  change: number;
  icon: LucideIcon;
};

export function StatCard({ title, amount, change, icon: Icon }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col gap-2 p-3 rounded-3xl border border-stone-300 w-full min-w-25">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="rounded-full p-2 border border-stone-300">
            <Icon className="w-4 h-4 text-violet-500" />
          </span>
          <p className="text-stone-800 text-sm font-bold">{title}</p>
        </div>
        <button
          type="button"
          className="rounded-full p-2 border border-stone-300"
        >
          <MoveUpRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-stone-800 text-xl font-bold">
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
      <p
        className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}
      >
        {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        <span className="font-light text-stone-400"> vs last month</span>
      </p>
    </div>
  );
}
