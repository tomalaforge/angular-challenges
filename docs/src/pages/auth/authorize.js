const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export async function GET({params, redirect}) {

  console.log('Authorize request', params);

  const redirect_uri = 'http://localhost:4321/auth/localized'

  const oauthParams = new URLSearchParams({ client_id:'Iv1.711903007f608691' , redirect_uri, state: 'lqsksqd' });
  return redirect(`${GITHUB_OAUTH_AUTHORIZE_URL}?${oauthParams}`, 302)
}
