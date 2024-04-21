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

  async function fetchGitHubUsers() {
    try {
      const prCounts = {};
      let page = 1;

      while (true) {
        const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+no:label&per_page=100&page=${page}`, {
          headers: {
            Authorization: `token ${$token}`
          }
        });
        if (!response.ok) {
          throw new Error('API rate limit exceeded. Please try again in a few minutes.');
        }
        const { total_count, items } = await response.json();

        if (!items || items.length === 0) {
          break;
        }

        items.forEach(pr => {
          const userLogin = pr.user.login;
          if (prCounts[userLogin]) {
            prCounts[userLogin].count++;
            prCounts[userLogin].challengeNumber.push(pr.labels.filter(l => !isNaN(Number(l.name))).map(l => l.name).join(', '));
          } else {
            prCounts[userLogin] = {
              avatar: pr.user.avatar_url,
              count: 1,
              challengeNumber: [pr.labels.filter(l => !isNaN(Number(l.name))).map(l => l.name).join(', ')]
            };
          }
        });

        if (total_count < page * 100) {
          break;
        }

        page++;

      }

      isUsernamePresent = Object.keys(prCounts).some((value) => value === $username);

      users = Object.entries(prCounts).map(([login, pr]) => ({
        login,
        avatar: pr.avatar,
        count: pr.count,
        challengeNumber: pr.challengeNumber
      })).filter((r) => r.login !== 'allcontributors[bot]' && r.login !== 'tomalaforge').sort((a, b) => b.count - a.count);

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
          {count} PRs merged
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
