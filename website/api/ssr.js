// Vercel serverless entry: delegates every non-static request to the Angular SSR server.
// CommonJS on purpose — Vercel's Node launcher require()s the handler, and CJS can
// still dynamic-import the ESM server bundle.
let handlerPromise;

module.exports = async (req, res) => {
  try {
    handlerPromise ??= import('../dist/angular-challenges-website/server/server.mjs').catch(
      (error) => {
        // Don't cache a rejected import: the next request on this warm instance retries.
        handlerPromise = undefined;
        throw error;
      },
    );
    const { reqHandler } = await handlerPromise;
    return reqHandler(req, res);
  } catch (error) {
    console.error('SSR handler failed', error);
    if (res.headersSent) {
      res.destroy(error);
      return;
    }
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    res.end('Internal server error');
  }
};
