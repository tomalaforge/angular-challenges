<script>
  import UserBox from './UserBox.svelte';
  import Spinner from './Spinner.svelte';
  import { isConnected, token, username } from '../github/github-store';


  let users = [];
  let loading = true;
  let error = null;
  let isUsernamePresent = false;

  token.subscribe(token => {
    if (token) {
      fetchGitHubUsers();
    }
  });

  const createUser = (items) => {
    const prCounts = {};
    items.forEach((pr) => {
      const userLogin = pr.user.login;
      if (prCounts[userLogin]) {
        prCounts[userLogin].count++;
      } else {
        prCounts[userLogin] = {
          avatar: pr.user.avatar_url,
          count: 1
        };
      }
    });

    isUsernamePresent = Object.keys(prCounts).some((value) => value === $username);

    return Object.entries(prCounts).map(([login, pr]) => ({
      login,
      avatar: pr.avatar,
      count: pr.count
    })).filter((r) => r.login !== 'allcontributors[bot]' && r.login !== 'tomalaforge').sort((a, b) => b.count - a.count);
  };

  async function fetchGitHubUsers() {
    try {
      const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+label:%22challenge-creation%22`, {
        headers: {
          Authorization: `token ${$token}`
        }
      });
      if (!response.ok) {
        throw new Error('API rate limit exceeded. Please try again in a few minutes.');
      }
      const { items } = await response.json();
      users = createUser(items);
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if !$isConnected}
  <div class="important-block not-connected">Log in to Github to see the list</div>
{:else}
  {#if isUsernamePresent}
    <div class="link-username">
      <a href={`#${$username}`}>Check my position</a>
    </div>
  {/if}
  {#if loading}
    <Spinner />
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="box not-content">
      {#each users as { avatar, count, login }, index}
        <UserBox {avatar} {login} {index}>
          {count} Challenges Created
        </UserBox>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .not-connected {
    margin-top: 1rem;
  }

  .link-username {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .box {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
</style>
