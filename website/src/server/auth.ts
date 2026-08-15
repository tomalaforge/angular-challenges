import { randomBytes, timingSafeEqual } from 'node:crypto';
import { Router, Request } from 'express';

export const AUTH_COOKIE = 'gh_token';
const STATE_COOKIE = 'gh_oauth_state';

/** Reads a single cookie value from the request `Cookie` header. */
export function readCookie(req: Request, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) {
    return null;
  }
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

export function readAuthCookie(req: Request): string | null {
  return readCookie(req, AUTH_COOKIE);
}

/**
 * Resolves the public origin of the site. `SITE_ORIGIN` wins when configured, because
 * forwarded headers are client-supplied and must not decide the OAuth `redirect_uri`
 * nor whether cookies get the `Secure` attribute.
 */
function siteOrigin(req: Request): string {
  const configured = process.env['SITE_ORIGIN'];
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  const forwardedHost = String(req.headers['x-forwarded-host'] ?? '')
    .split(',')[0]
    .trim();
  const host = forwardedHost || req.headers.host || 'localhost:4000';
  const forwardedProto = String(req.headers['x-forwarded-proto'] ?? '')
    .split(',')[0]
    .trim();
  const proto = forwardedProto || (isLocalHost(host) ? 'http' : 'https');
  return `${proto}://${host}`;
}

function isLocalHost(host: string): boolean {
  const hostname = host.split(':')[0];
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Only same-site paths are allowed as post-login redirect targets. */
function safePath(value: unknown): string {
  const path = String(value ?? '/');
  return path.startsWith('/') && !path.startsWith('//') ? path : '/';
}

export const authRoutes = Router();

authRoutes.get('/authorize', (req, res) => {
  const clientId = process.env['GITHUB_CLIENT_ID'];
  if (!clientId) {
    res.status(503).send('GitHub sign-in is not configured yet (missing GITHUB_CLIENT_ID).');
    return;
  }
  const origin = siteOrigin(req);
  const secure = origin.startsWith('https') ? '; Secure' : '';
  const nonce = randomBytes(16).toString('hex');
  res.setHeader(
    'Set-Cookie',
    `${STATE_COOKIE}=${nonce}; Path=/auth; HttpOnly; SameSite=Lax; Max-Age=600${secure}`,
  );
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/auth/callback`,
    scope: 'public_repo',
    state: `${nonce}:${safePath(req.query['redirect_uri'])}`,
  });
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
});

authRoutes.get('/callback', async (req, res) => {
  const clientId = process.env['GITHUB_CLIENT_ID'];
  const clientSecret = process.env['GITHUB_CLIENT_SECRET'];
  const [nonce, ...pathParts] = String(req.query['state'] ?? '').split(':');
  const returnTo = safePath(pathParts.join(':'));
  const expectedNonce = readCookie(req, STATE_COOKIE);
  const code = req.query['code'];

  const secure = siteOrigin(req).startsWith('https') ? '; Secure' : '';
  const clearState = `${STATE_COOKIE}=; Path=/auth; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;

  // The nonce ties the callback to the browser that started the flow: without it an
  // attacker could plant their own authorization code in a victim's session.
  if (
    !clientId ||
    !clientSecret ||
    !code ||
    req.query['error'] ||
    !expectedNonce ||
    !safeEqual(nonce, expectedNonce)
  ) {
    res.setHeader('Set-Cookie', clearState);
    res.redirect(302, returnTo);
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = (await response.json()) as { access_token?: string };
    if (data.access_token) {
      res.setHeader('Set-Cookie', [
        clearState,
        `${AUTH_COOKIE}=${encodeURIComponent(data.access_token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${secure}`,
      ]);
    }
  } catch {
    // Fall through: user comes back logged out.
  }
  if (!res.hasHeader('Set-Cookie')) {
    res.setHeader('Set-Cookie', clearState);
  }
  res.redirect(302, returnTo);
});

authRoutes.get('/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.redirect(302, safePath(req.query['redirect_uri']));
});
