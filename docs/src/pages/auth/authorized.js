import { fromHexString } from '../../utils/encrypt';

export const prerender = false;

const GITHUB_OAUTH_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export async function GET({ url, redirect, cookies}) {

  const myUrl = new URL(url);
  const params = new URLSearchParams(myUrl.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = import.meta.env;

  const redirectUrl = new URL(fromHexString(state));

  if (error && error === 'access_denied') {
    redirect(redirectUrl.href, 302);
    return;
  }

  const init = {
    method: 'POST',
    body: new URLSearchParams({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET , code, state }),
    headers: {
      Accept: 'application/json'
    },
  };

  let accessToken = '';
  let refreshToken = '';
  try {
    const response = await fetch(GITHUB_OAUTH_ACCESS_TOKEN_URL, init);
    if (response.ok) {
      const data = await response.json();
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
    } else {
      throw new Error(`Access token response had status ${response.status}.`);
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message
      }), {
        status: 503
      }
    )
  }

  cookies.set('refresh', refreshToken, { secure: true, httpOnly: true, path: '/' });

  redirectUrl.searchParams.set('token', accessToken);

  return redirect(redirectUrl.href, 302);
}
