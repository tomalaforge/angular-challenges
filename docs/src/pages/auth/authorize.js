import { toHexString } from '../../utils/encrypt';

export const prerender = false;

const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export async function GET({url, redirect}) {

  const myUrl = new URL(url);
  const params = new URLSearchParams(myUrl.search);
  const redirectUrl = params.get('redirect_uri');

  const { GITHUB_CLIENT_ID } = import.meta.env;


  const redirect_uri = `${myUrl.origin}/auth/authorized`
  const state =  toHexString(redirectUrl);

  const oauthParams = new URLSearchParams({ client_id:GITHUB_CLIENT_ID , redirect_uri, state });
  return redirect(`${GITHUB_OAUTH_AUTHORIZE_URL}?${oauthParams}`, 302)
}
