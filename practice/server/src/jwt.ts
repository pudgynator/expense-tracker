import { createHmac, timingSafeEqual } from 'node:crypto';

const SECRET = 'practice-secret-not-for-production';

export type JwtPayload = {
  username: string;
  role: string;
  exp: number;
};

function encode(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function sign(encodedHeader: string, encodedPayload: string): string {
  return createHmac('sha256', SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
}

export function signJwt(
  payload: Omit<JwtPayload, 'exp'>,
  expiresInMs = 1000 * 60 * 60 * 8
): string {
  const encodedHeader = encode({ alg: 'HS256', typ: 'JWT' });
  const encodedPayload = encode({ ...payload, exp: Date.now() + expiresInMs });
  const signature = sign(encodedHeader, encodedPayload);
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyJwt(token: string): JwtPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  if (!encodedHeader || !encodedPayload || !signature) return null;

  const expected = sign(encodedHeader, encodedPayload);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(actualBuf, expectedBuf)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as JwtPayload;

    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
