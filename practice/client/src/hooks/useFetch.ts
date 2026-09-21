import { useEffect, useState } from 'react';
import { ApiError } from '../api.ts';

type UseFetchOptions = {
  headers?: HeadersInit;
};

export function useFetch<T>(url: string | null, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const headers = options.headers;
  const headerKey = JSON.stringify(headers ?? {});

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      setStatus(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setStatus(null);

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers,
        });
        setStatus(res.status);

        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message =
            (body as { error?: string; message?: string }).error ||
            (body as { error?: string; message?: string }).message ||
            `Request failed (${res.status})`;
          throw new ApiError(message, res.status);
        }

        setData(body as T);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const message = err instanceof Error ? err.message : 'Request failed';
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => controller.abort();
  }, [url, headerKey]);

  return { data, loading, error, status };
}
