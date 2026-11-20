import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { UserRole } from './permissions';

const SESSION_COOKIE_NAME = 'suggi_session';
const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cafeId?: string | null;
  cafeSlug?: string | null;
  cafeName?: string | null;
}

interface TokenPayload extends SessionUser {
  iat: number;
  exp: number;
}

function getSecretKey(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_SECRET is required in production');
    }
    return 'dev-suggi-club-jwt-secret-key-min-32-chars-long';
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export function createSessionToken(user: SessionUser): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    ...user,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', getSecretKey())
      .update(encodedPayload)
      .digest('base64url');

    // Constant-time comparison
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

    // Check expiration
    if (Date.now() / 1000 > payload.exp) {
      return null;
    }

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      cafeId: payload.cafeId,
      cafeSlug: payload.cafeSlug,
      cafeName: payload.cafeName,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const token = createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
