import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../api.ts';
import { useFetch } from '../hooks/useFetch.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

export function ProfilePage() {
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const navigate = useNavigate();
  const { data, loading, error, status } = useFetch<Profile>(
    token ? '/api/profile' : null,
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );

  useEffect(() => {
    if (!token || status === 401) {
      if (status === 401) setToken(null);
      navigate('/login', { replace: true });
    }
  }, [navigate, setToken, status, token]);

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  if (!token || status === 401) {
    return <p className="text-sm text-stone-400">Redirecting to login...</p>;
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-800">Protected profile</h2>
      <p className="mt-1 text-sm text-stone-500">
        Fetches <code>GET /api/profile</code> with the stored JWT. A 401 sends
        you back to login.
      </p>

      {loading ? <p className="mt-4 text-sm text-stone-400">Loading profile...</p> : null}
      {error && status !== 401 ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : null}

      {data ? (
        <div className="mt-5 rounded-2xl bg-stone-50 p-4">
          <p className="text-lg font-semibold text-stone-800">
            Welcome, {data.username}
          </p>
          <p className="text-sm text-stone-500">Role: {data.role}</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={logout}
        className="mt-5 rounded-2xl bg-stone-800 px-5 py-2 text-sm font-semibold text-white"
      >
        Log out
      </button>
    </section>
  );
}
