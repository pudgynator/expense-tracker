import { useState } from 'react';
import type { Book, Paginated } from '../api.ts';
import { useDebounce } from '../hooks/useDebounce.ts';
import { useFetch } from '../hooks/useFetch.ts';

export function LiveSearchPage() {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 400);
  const url = debouncedTerm
    ? `/api/books?search=${encodeURIComponent(debouncedTerm)}&limit=20`
    : null;
  const { data, loading, error } = useFetch<Paginated<Book>>(url);
  const waiting = term !== debouncedTerm;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800">Live search with debounce</h2>
      <p className="mt-1 text-sm text-stone-500">
        Typing updates <code>term</code> immediately. <code>useDebounce</code>{' '}
        waits 400ms, then <code>useFetch</code> hits{' '}
        <code>/api/books?search=</code>.
      </p>

      <input
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search books by title or author"
        className="mt-5 w-full rounded-2xl border border-stone-200 px-4 py-2 outline-none focus:border-violet-400"
      />

      <p className="mt-2 text-xs text-stone-400">
        live: “{term || '…'}” · debounced: “{debouncedTerm || '…'}”
      </p>

      {waiting || loading ? (
        <p className="mt-4 text-sm text-violet-500">Searching...</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

      {!debouncedTerm ? (
        <p className="mt-4 text-sm text-stone-400">Start typing to search.</p>
      ) : (
        <ul className="mt-4 divide-y divide-stone-100">
          {(data?.data ?? []).map((book) => (
            <li key={book.id} className="py-3">
              <p className="font-medium text-stone-800">{book.title}</p>
              <p className="text-sm text-stone-500">{book.author}</p>
            </li>
          ))}
        </ul>
      )}

      {debouncedTerm && !loading && !waiting && data?.data.length === 0 ? (
        <p className="mt-4 text-sm text-stone-400">No books matched.</p>
      ) : null}
    </section>
  );
}
