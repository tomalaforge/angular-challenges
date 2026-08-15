// Vercel serverless entry: delegates every non-static request to the Angular SSR server.
// CommonJS on purpose — Vercel's Node launcher require()s the handler, and CJS can
// still dynamic-import the ESM server bundle.
let handlerPromise;

module.exports = async (req, res) => {
  try {
    handlerPromise ??= import(
      '../dist/angular-challenges-website/server/server.mjs'
    );
    const { reqHandler } = await handlerPromise;
    return reqHandler(req, res);
  } catch (error) {
    console.error('SSR handler failed', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    res.end('Internal server error');
  }
};
