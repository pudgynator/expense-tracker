import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

export function LoginPage() {
  const [, setToken] = useLocalStorage<string | null>('token', null);
  const [username, setUsername] = useState('ada');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await apiFetch<{ token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      setToken(result.token);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800">Auth-gated login</h2>
      <p className="mt-1 text-sm text-stone-500">
        POSTs to <code>/login</code>, then stores the JWT with{' '}
        <code>useLocalStorage</code>. Demo user: <strong>ada</strong> /{' '}
        <strong>password123</strong>.
      </p>

      <form
        className="mt-5 flex max-w-sm flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void handleLogin();
        }}
      >
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="rounded-2xl border border-stone-200 px-4 py-2 outline-none focus:border-violet-400"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="rounded-2xl border border-stone-200 px-4 py-2 outline-none focus:border-violet-400"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-2xl bg-violet-500 px-5 py-2 font-semibold text-white hover:bg-violet-600 disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Login'}
        </button>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </form>
    </section>
  );
}
