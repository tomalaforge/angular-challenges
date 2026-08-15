import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { githubApi } from './server/github-api';
import { authRoutes } from './server/auth';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Custom domains can be added later via the NG_ALLOWED_HOSTS env var (takes precedence).
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['localhost', '*.vercel.app'],
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * The in-browser editor runs challenges in a WebContainer, which needs
 * cross-origin isolation. Scoped to the editor route (and reached via hard
 * navigation) so third-party embeds elsewhere keep working.
 */
app.use((req, res, next) => {
  if (/^\/challenges\/[^/]+\/[^/]+\/editor\/?$/.test(req.path)) {
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('Cross-Origin-Embedder-Policy', 'credentialless');
  }
  next();
});

/**
 * JSON API backed by the GitHub REST API (cached server-side).
 */
app.use('/api', githubApi);

/**
 * GitHub OAuth sign-in flow (sets an httpOnly cookie).
 */
app.use('/auth', authRoutes);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
