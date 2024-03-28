import { defineMiddleware } from 'astro/middleware';

const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export const onRequest = defineMiddleware((context, next) => {
  console.log(context.url.pathname);
  if (context.url.pathname !== '/auth') {
    return next();
  }

  const appReturnUrl = context.request.url;
  const url = new URL(context.request.url);

  console.log('je rentre ici');
  console.log(context.url);
  console.log(context.site);
  // console.dir(context.params);

  // if (!appReturnUrl) {
  //   res.status(400).json({ error: '`redirect_uri` is required.' });
  //   return;
  // }

  // const { client_id } = env;
  // const redirect_uri = `http://${context.headers.host}/api/oauth/authorized`;
  // const state = await encodeState(appReturnUrl, env.encryption_password);
  //
  // const oauthParams = new URLSearchParams({ client_id, redirect_uri, state });
  // context.redirect(`${GITHUB_OAUTH_AUTHORIZE_URL}?${oauthParams}`, 302);

  return Response.redirect(new URL('/', context.url));
});
