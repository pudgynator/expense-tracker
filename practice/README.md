# Group C practice (raw Node + React + TypeScript)

Mini-projects from the fetch/hooks list, kept separate from the expense tracker.

## Run

Two terminals:

```bash
cd practice/server && npm install && npm run dev
```

```bash
cd practice/client && npm install && npm run dev
```

Open http://localhost:5174

The Vite app proxies `/api` and `/login` to the raw Node server on port 4000.

## Tasks

1. **Todos** — `GET/POST/DELETE /api/todos`, `useFetch` for the initial list, optimistic delete with rollback. Toggle “Simulate delete failure” to see the item return.
2. **Live search** — `useDebounce(term, 400)` feeds `useFetch('/api/books?search=...')`.
3. **Paginated table** — page state drives `?page=&limit=10`, with Prev/Next.
4. **Auth-gated page** — login POSTs to `/login`, JWT is stored with `useLocalStorage`, profile fetches `GET /api/profile` with `Authorization: Bearer …` and redirects on 401.

Demo login: `ada` / `password123`.
