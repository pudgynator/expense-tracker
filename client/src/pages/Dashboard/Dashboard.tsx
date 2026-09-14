import { StatCard } from "./StatCard";


export function Dashboard() {
    return (
        <div className="flex flex-col px-6 py-4 gap-6 w-full">
            <div>
                <h1 className="text-stone-800 bold text-2xl">Welcome back, User!</h1>
                <p className="text-stone-400 leading-none text-sm">It is best time to manage your finances</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <StatCard title="Total balance" amount={5000} change={10} />
                <StatCard title="Income" amount={5000} change={10} />
                <StatCard title="Expense" amount={5000} change={10} />
                <StatCard title="Total savings" amount={5000} change={10} />
            </div>
        </div>
    )
}