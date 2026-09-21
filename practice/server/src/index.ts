import http from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { addTodo, books, deleteTodo, todos, users } from './data.ts';
import { signJwt, verifyJwt } from './jwt.ts';

const PORT = Number(process.env.PORT) || 4000;

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function setCors(res: ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Force-Fail'
  );
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function readJson<T>(req: IncomingMessage): Promise<T> {
  const raw = await readBody(req);
  if (!raw) return {} as T;
  return JSON.parse(raw) as T;
}

function getBearerToken(req: IncomingMessage): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim() || null;
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  setCors(res);

  const method = req.method ?? 'GET';
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const path = url.pathname;

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (method === 'POST' && path === '/login') {
    const body = await readJson<{ username?: string; password?: string }>(req);
    const user = users.find(
      (entry) =>
        entry.username === body.username && entry.password === body.password
    );

    if (!user) {
      sendJson(res, 401, { error: 'Invalid username or password' });
      return;
    }

    const token = signJwt({ username: user.username, role: user.role });
    sendJson(res, 200, { token, user: { username: user.username, role: user.role } });
    return;
  }

  if (method === 'GET' && path === '/api/todos') {
    sendJson(res, 200, todos);
    return;
  }

  if (method === 'POST' && path === '/api/todos') {
    const body = await readJson<{ text?: string }>(req);
    const text = body.text?.trim();
    if (!text) {
      sendJson(res, 400, { error: 'text is required' });
      return;
    }
    sendJson(res, 201, addTodo(text));
    return;
  }

  const todoDelete = path.match(/^\/api\/todos\/(\d+)$/);
  if (method === 'DELETE' && todoDelete) {
    if (req.headers['x-force-fail'] === '1') {
      sendJson(res, 500, { error: 'Simulated server failure' });
      return;
    }

    const id = Number(todoDelete[1]);
    const removed = deleteTodo(id);
    if (!removed) {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }
    sendJson(res, 200, { success: true });
    return;
  }

  if (method === 'GET' && path === '/api/books') {
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);

    const filtered = search
      ? books.filter(
          (book) =>
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search)
        )
      : books;

    const start = (page - 1) * limit;
    sendJson(res, 200, {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
    });
    return;
  }

  if (method === 'GET' && path === '/api/profile') {
    const token = getBearerToken(req);
    if (!token) {
      sendJson(res, 401, { error: 'Unauthorized. Missing token.' });
      return;
    }

    const payload = verifyJwt(token);
    if (!payload) {
      sendJson(res, 401, { error: 'Unauthorized. Invalid token.' });
      return;
    }

    sendJson(res, 200, { username: payload.username, role: payload.role });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
}

const server = http.createServer((req, res) => {
  void handleRequest(req, res).catch((error: unknown) => {
    console.error(error);
    if (!res.headersSent) {
      sendJson(res, 500, { error: 'Internal server error' });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Practice API running on http://localhost:${PORT}`);
});
