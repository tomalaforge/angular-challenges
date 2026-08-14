export const prerender = false;

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const QUERY = `
  query {
    user(login: "tomalaforge") {
      sponsorshipsAsMaintainer(activeOnly: true, first: 100) {
        nodes {
          sponsorEntity {
            ... on User {
              login
              avatarUrl
            }
            ... on Organization {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const { GITHUB_TOKEN } = import.meta.env;

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: 'GITHUB_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    const sponsors = data.user.sponsorshipsAsMaintainer.nodes.map((node) => ({
      username: node.sponsorEntity.login,
      avatar: node.sponsorEntity.avatarUrl,
    }));

    return new Response(JSON.stringify({ sponsors }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
