# Expense Tracker

A personal finance app for tracking spending, income, and budgets. The project is split into a React frontend and an Express API with PostgreSQL.

This is a work in progress.

## Features

- Register and log in with name, email, and password
- JWT-based authentication 
- Dashboard with balance, income, expense, and savings cards
- Recent transactions list
- Monthly budget progress
- User profile page for name and email
- Sidebar navigation between Dashboard and Profile

## Tech stack

**Client** (`client/`)

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide icons

**Server** (`server/`)

- Express 5
- TypeScript 
- PostgreSQL
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

Create `server/.env`:

```env
PORT=3000
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/expense_tracker
JWT_SECRET=replace-with-a-long-random-string
```

The `users` table should include at least `id`, `name`, `email`, and `password_hash`.

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

Open the Vite URL
## API

| Method | Path            | Body                                      | Description                          |
| ------ | --------------- | ----------------------------------------- | ------------------------------------ |
| POST   | `/api/register` | `{ name, email, password }`               | Create a user and return a JWT       |
| POST   | `/api/login`    | `{ email, password }`                     | Verify credentials and return a JWT  |

Password must be at least 8 characters.

Successful responses look like:

```json
{
  "token": "<jwt>",
  "user": { "id": 1, "name": "Ada", "email": "ada@example.com" }
}
```

Protected routes can use the `requireAuth` middleware with:

```http
Authorization: Bearer <token>
```

Expense and category types are already defined on the server, but those endpoints are not implemented yet.

## Scripts

**Client**

| Script            | What it does              |
| ----------------- | ------------------------- |
| `npm run dev`     | Start Vite                |
| `npm run build`   | Type-check and production build |
| `npm run lint`    | Run ESLint                |
| `npm run format`  | Format with Prettier      |
| `npm run preview` | Preview the production build |

**Server**

| Script          | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Watch mode with `tsx` and `.env`     |
| `npm run build` | Compile TypeScript to `dist/`        |
| `npm run start` | Run the compiled server              |

## Formatting

Prettier is configured at the repo root (`.prettierrc`). From either `client` or `server`:

```bash
npm run format
```

## Current status

The UI for dashboard, profile, login, and register is in place. Dashboard numbers and transactions are placeholders. Login and register screens are not yet connected to the API, and expense CRUD is still to come.
