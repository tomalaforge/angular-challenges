export const prerender = false;

const GITHUB_OAUTH_REFRESH_TOKEN = 'https://github.com/login/oauth/access_token';

export async function GET({cookies}) {

  const refresh_token = cookies.get('refresh').value;

  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = import.meta.env;


  const init = {
    method: 'POST',
    body: new URLSearchParams({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, grant_type: "refresh_token" , refresh_token }),
    headers: {
      Accept: 'application/json'
    },
  };

  let accessToken = '';
  let refreshToken = '';
  try {

    const response = await fetch(GITHUB_OAUTH_REFRESH_TOKEN, init);
    if (response.ok) {
      const data = await response.json();
      if(data.error) {
        cookies.delete('refresh');
        return new Response(
          JSON.stringify({
            token: 'delete'
          }), {
            status: 200
          }
        )
      }

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

  return new Response(
    JSON.stringify({
      token: accessToken
    }), {
      status: 200
    }
  )
}
