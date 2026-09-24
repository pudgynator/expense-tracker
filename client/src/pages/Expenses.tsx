import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound, Receipt } from 'lucide-react';
import { expenseCategories } from '../data/transactions';
import { useTransactions } from '../context/TransactionsContext';
import { TransactionRow } from '../components/TransactionRow';

export function Expenses() {
  const { transactions, addExpense, deleteTransaction } = useTransactions();
  const expenses = transactions.filter((transaction) => transaction.amount < 0);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('Food');

  const total = expenses.reduce(
    (sum, expense) => sum + Math.abs(expense.amount),
    0
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedAmount = Number(amount);
    if (!name.trim() || !date || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    addExpense({
      name: name.trim(),
      amount: parsedAmount,
      date,
      category,
    });
    setName('');
    setAmount('');
  }

  return (
    <div className="flex flex-col px-6 py-4 gap-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-stone-800 font-bold text-2xl">Expenses</h1>
          <p className="text-stone-400 leading-none text-sm">
            Add spending and it shows up on the dashboard
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

      <div className="flex flex-col gap-2 p-3 rounded-3xl border border-stone-300 w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="rounded-full p-2 border border-stone-300">
            <Receipt className="w-4 h-4 text-violet-500" />
          </span>
          <p className="text-stone-800 text-sm font-bold">Total spent</p>
        </div>
        <p className="text-stone-800 text-xl font-bold">
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs font-light text-stone-400">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-4 rounded-3xl border border-stone-300"
        >
          <p className="text-stone-800 text-sm font-bold">New expense</p>
          <div>
            <label className="mb-1 block text-sm font-semibold text-stone-400">
              Description
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Coffee"
              className="w-full border-b border-stone-400 bg-transparent pb-2 text-sm text-stone-900 outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-stone-400">
              Amount
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="12.50"
              className="w-full border-b border-stone-400 bg-transparent pb-2 text-sm text-stone-900 outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-stone-400">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-b border-stone-400 bg-transparent pb-2 text-sm text-stone-900 outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-stone-400">Category</p>
            <div className="flex flex-wrap gap-2">
              {expenseCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-3xl px-4 py-2 text-sm font-medium border ${
                    category === item
                      ? 'bg-violet-500 text-white border-violet-500'
                      : 'border-stone-300 text-stone-800 hover:bg-violet-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-violet-500 px-8 py-2 w-max rounded-3xl text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            Add expense
          </button>
        </form>

        <div className="flex flex-col gap-3 p-4 rounded-3xl border border-stone-300 lg:col-span-2">
          <p className="text-stone-800 text-sm font-bold">Your expenses</p>
          {expenses.length === 0 ? (
            <p className="text-stone-400 text-sm">No expenses yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {expenses.map((expense) => (
                <TransactionRow
                  key={expense.id}
                  transaction={expense}
                  onDelete={deleteTransaction}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
