type MonthlyBudgetProps = {
  spent: number;
  limit: number;
};

export function MonthlyBudget({ spent, limit }: MonthlyBudgetProps) {
  const remaining = Math.max(limit - spent, 0);
  const percent = Math.min(Math.round((spent / limit) * 100), 100);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300">
      <p className="text-stone-800 text-sm font-bold">Monthly budget</p>
      <p className="text-stone-800 text-xl font-bold">
        ${spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        <span className="text-stone-400 text-sm font-light">
          {' '}
          / ${limit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </p>
      <div className="h-2 w-full rounded-full bg-stone-200">
        <div
          className="h-2 rounded-full bg-violet-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs font-light text-stone-400">
        {percent}% used · ${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })} left
      </p>
    </div>
  );
}
