export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Book = {
  id: number;
  title: string;
  author: string;
};

export type Paginated<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type Profile = {
  username: string;
  role: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, { ...options, headers });
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (body as { error?: string; message?: string }).error ||
      (body as { error?: string; message?: string }).message ||
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return body as T;
}
