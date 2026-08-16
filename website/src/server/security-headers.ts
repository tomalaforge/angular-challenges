/**
 * Security headers applied to every SSR response. Keep in sync with the
 * `headers` block in vercel.json, which applies the same set to the static
 * and prerendered pages served straight from the Vercel CDN.
 *
 * The CSP allow-list covers the third parties the site actually loads:
 * Google Tag Manager / Analytics and AdSense (injected after consent, see
 * src/app/consent.ts), the giscus comments iframe, GitHub avatars and the
 * GitHub-hosted demo videos embedded in challenge docs. `unsafe-inline` for
 * scripts is required by the two bootstrap scripts in index.html and
 * Angular's hydration event-replay script; for styles by Angular's inlined
 * component styles and shiki's inline color attributes.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep2.adtrafficquality.google https://giscus.app",
  "style-src 'self' 'unsafe-inline'",
  // https: because AdSense creatives load images from arbitrary Google CDNs.
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google",
  'frame-src https://giscus.app https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://ep2.adtrafficquality.google',
  "media-src 'self' https://github.com https://user-images.githubusercontent.com https://private-user-images.githubusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "frame-ancestors 'self'",
].join('; ');

export const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
