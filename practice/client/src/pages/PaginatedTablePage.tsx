import { useState } from 'react';
import type { Book, Paginated } from '../api.ts';
import { useFetch } from '../hooks/useFetch.ts';

const LIMIT = 10;

export function PaginatedTablePage() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch<Paginated<Book>>(
    `/api/books?page=${page}&limit=${LIMIT}`
  );
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / LIMIT));

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800">Paginated table</h2>
      <p className="mt-1 text-sm text-stone-500">
        The backend supports <code>?page=1&limit=10</code>. Changing page
        updates state, which changes the URL passed to <code>useFetch</code>.
      </p>

      {loading ? <p className="mt-4 text-sm text-stone-400">Loading...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th className="py-2 pr-4 font-medium">ID</th>
              <th className="py-2 pr-4 font-medium">Title</th>
              <th className="py-2 font-medium">Author</th>
            </tr>
          </thead>
          <tbody>
            {(data?.data ?? []).map((book) => (
              <tr key={book.id} className="border-b border-stone-100">
                <td className="py-2 pr-4 text-stone-400">{book.id}</td>
                <td className="py-2 pr-4 font-medium">{book.title}</td>
                <td className="py-2 text-stone-600">{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((current) => current - 1)}
          className="rounded-2xl bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40"
        >
          Prev
        </button>
        <p className="text-sm text-stone-500">
          Page {page} of {totalPages}
        </p>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((current) => current + 1)}
          className="rounded-2xl bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
