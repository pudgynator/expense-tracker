import { MoveUpRight } from 'lucide-react';

type StatCardProps = {
  title: string;
  amount: number;
  change: number;
};

export function StatCard({ title, amount, change }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-3xl border border-stone-300 w-full min-w-25">
      <div className="flex justify-between items-center">
        <p className="text-stone-800 text-sm font-bold">{title}</p>
        <button
          type="button"
          className="rounded-full p-2 border border-stone-300"
        >
          <MoveUpRight className="w-4 h-4" />
        </button>
      </div>
      <p className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
      <p className="text-xs font-light text-stone-400">
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        <span className="font-light text-stone-400">vs last month</span>
      </p>
    </div>
  );
}
