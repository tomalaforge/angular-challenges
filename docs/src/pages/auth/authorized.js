const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export async function GET({params, request}) {

  console.log('Authorized', params);


  return new Response({
    status: 302,
    path: `/`,
  });
}
