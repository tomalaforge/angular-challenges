import { Router, Request } from 'express';

export const AUTH_COOKIE = 'gh_token';

export function readAuthCookie(req: Request): string | null {
  const header = req.headers.cookie;
  if (!header) {
    return null;
  }
  for (const part of header.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === AUTH_COOKIE) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

function siteOrigin(req: Request): string {
  const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost:4000';
  const proto = String(host).startsWith('localhost') ? 'http' : 'https';
  return `${proto}://${host}`;
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
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteOrigin(req)}/auth/callback`,
    scope: 'public_repo',
    state: safePath(req.query['redirect_uri']),
  });
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
});

authRoutes.get('/callback', async (req, res) => {
  const clientId = process.env['GITHUB_CLIENT_ID'];
  const clientSecret = process.env['GITHUB_CLIENT_SECRET'];
  const returnTo = safePath(req.query['state']);
  const code = req.query['code'];

  if (!clientId || !clientSecret || !code || req.query['error']) {
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
      const secure = siteOrigin(req).startsWith('https') ? '; Secure' : '';
      res.setHeader(
        'Set-Cookie',
        `${AUTH_COOKIE}=${encodeURIComponent(data.access_token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${secure}`,
      );
    }
  } catch {
    // Fall through: user comes back logged out.
  }
  res.redirect(302, returnTo);
});

authRoutes.get('/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.redirect(302, safePath(req.query['redirect_uri']));
});
