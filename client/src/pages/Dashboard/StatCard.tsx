import { MoveUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  amount: number;
  change: number;
};

export function StatCard({ title, amount, change }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-3xl border border-stone-300 w-full min-w-[100px]">
      <div className="flex justify-between items-center">
        <p className="text-stone-800 text-sm font-bold">{title}</p>
        <a href="" className="rounded-full p-2 border border-stone-300">
          <MoveUpRight className="w-4 h-4" />
        </a>
      </div>
      <p className="text-stone-800 text-xl font-bold">{amount}</p>
      <p className="text-xs font-light text-stone-400">{change}</p>
    </div>
  );
}
