import { useEffect, useState } from 'react';
import { apiFetch, type Todo } from '../api.ts';
import { useFetch } from '../hooks/useFetch.ts';

export function TodosPage() {
  const { data, loading, error } = useFetch<Todo[]>('/api/todos');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  useEffect(() => {
    if (data) setTodos(data);
  }, [data]);

  const addTodo = async () => {
    if (!text.trim()) return;
    setNotice(null);
    try {
      const newTodo = await apiFetch<Todo>('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      setTodos((prev) => [...prev, newTodo]);
      setText('');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Could not add todo');
    }
  };

  const deleteTodo = async (id: number) => {
    const previous = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setNotice(null);

    try {
      await apiFetch<{ success: boolean }>(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: simulateFailure ? { 'X-Force-Fail': '1' } : undefined,
      });
    } catch (err) {
      setTodos(previous);
      setNotice(
        err instanceof Error
          ? `Delete failed — restored. ${err.message}`
          : 'Delete failed — restored.'
      );
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800">Todo list with persistence</h2>
      <p className="mt-1 text-sm text-stone-500">
        GET/POST/DELETE <code>/api/todos</code>. Delete is optimistic: the item
        leaves the UI immediately and comes back if the request fails.
      </p>

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void addTodo();
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a todo"
          className="flex-1 rounded-2xl border border-stone-200 px-4 py-2 outline-none focus:border-violet-400"
        />
        <button
          type="submit"
          className="rounded-2xl bg-violet-500 px-5 py-2 font-semibold text-white hover:bg-violet-600"
        >
          Add
        </button>
      </form>

      <label className="mt-4 flex items-center gap-2 text-sm text-stone-500">
        <input
          type="checkbox"
          checked={simulateFailure}
          onChange={(event) => setSimulateFailure(event.target.checked)}
        />
        Simulate delete failure (to see rollback)
      </label>

      {loading && todos.length === 0 ? (
        <p className="mt-4 text-sm text-stone-400">Loading todos...</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
      {notice ? <p className="mt-4 text-sm text-amber-600">{notice}</p> : null}

      <ul className="mt-4 divide-y divide-stone-100">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-3">
            <span>{todo.text}</span>
            <button
              type="button"
              onClick={() => void deleteTodo(todo.id)}
              className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600 hover:bg-red-50 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
