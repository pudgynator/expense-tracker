# Expense Tracker

A personal finance app for tracking spending, income, and budgets. The project is split into a React frontend and an Express API with PostgreSQL.

This is a work in progress. Auth and expense endpoints exist on the server. The UI still uses shared in-memory sample data, and the login/register screens are not wired to the API yet.

## Features

- Register and log in with name, email, and password
- JWT-based authentication (tokens expire after 3 hours)
- Dashboard with balance, income, expense, and savings cards
- Recent transactions list (shared with the Expenses page)
- Monthly budget progress
- Transactions page with search and category filters
- Expenses page to add and delete spending
- User profile page for name and email
- Sidebar navigation between Dashboard, Transactions, Expenses, and Profile

## Tech stack

**Client** (`client/`)

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide icons

**Server** (`server/`)

- Express 5
- TypeScript (`tsx` in development)
- PostgreSQL (`pg`)
- bcrypt for password hashing
- JSON Web Tokens for auth


## Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL

## Getting started

Clone the repo, then install dependencies in both apps:

```bash
cd client && npm install
cd ../server && npm install
```

### Server environment

Create `server/.env` (this file is gitignored):

```env
PORT=3000
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/expense_tracker
JWT_SECRET=replace-with-a-long-random-string
```

The client Vite proxy sends `/api` requests to `http://localhost:3000`, so set `PORT=3000` (the server otherwise defaults to `3001`).

**Tables**

`users` should include at least `id`, `name`, `email`, and `password_hash`.

```sql
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER,
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Run in development

Use two terminals:

```bash
# terminal 1 — API
cd server
npm run dev
```

```bash
# terminal 2 — UI
cd client
npm run dev
```

Open the Vite URL (usually `http://localhost:5173`).

| Path             | Page         |
| ---------------- | ------------ |
| `/login`         | Sign in      |
| `/register`      | Create account |
| `/`              | Dashboard    |
| `/dashboard`     | Dashboard    |
| `/transactions`  | Transactions |
| `/expenses`      | Expenses     |
| `/profile`       | User profile |
Password must be at least 8 characters.

Successful register/login responses look like:

```json
{
  "token": "<jwt>",
  "user": { "id": 1, "name": "Ada", "email": "ada@example.com" }
}
```

Expense routes require:

```http
Authorization: Bearer <token>
```

Unexpected errors go through `errorHandler` in `server/src/middleware/error.ts`.

## Scripts

**Client**

| Script            | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start Vite                      |
| `npm run build`   | Type-check and production build |
| `npm run lint`    | Run ESLint                      |
| `npm run format`  | Format with Prettier            |
| `npm run preview` | Preview the production build    |

**Server**

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Watch mode with `tsx` and `.env` |
| `npm run build` | Compile TypeScript to `dist/`    |
| `npm run start` | Run the compiled server          |

## Formatting

Prettier is configured at the repo root (`.prettierrc`). From either `client` or `server`:

```bash
npm run format
```

## Current status

Dashboard, transactions, expenses, profile, login, and register screens are in place. Client spending data is shared in React context (not fetched from the API yet). Login and register forms are not connected to `/api/login` and `/api/register`.
