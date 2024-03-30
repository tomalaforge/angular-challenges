<script>
  import UserBox from './UserBox.svelte';
  import Spinner from './Spinner.svelte';
  import { token } from '../github/github-store';

  let users = [];
  let loading = true;
  let error = null;

  token.subscribe(token => {
    if (token) {
      fetchGitHubUsers();
    }
  })

  async function fetchGitHubUsers() {
    try {
      const prCounts = {};
      let page = 1;

      while (true) {
        const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+label:%22answer%22&per_page=200&page=${page}`, {
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
            prCounts[userLogin].challengeNumber.push(pr.labels.filter(l => !isNaN(Number(l.name))).map(l => Number(l.name))?.[0]);
          } else {
            prCounts[userLogin] = {
              avatar: pr.user.avatar_url,
              count: 1,
              challengeNumber: [pr.labels.filter(l => !isNaN(Number(l.name))).map(l => Number(l.name))?.[0]]
            };
          }
        });

        if(total_count < page * 100) {
          break;
        }

        page++;
      }

      users = Object.entries(prCounts).map(([login, pr]) => ({
        login,
        avatar: pr.avatar,
        count: pr.count,
        challengeNumber: pr.challengeNumber.sort((a, b) => a - b)
      })).filter((r) => r.login !== 'allcontributors[bot]').sort((a, b) => b.count - a.count);

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }

  }

</script>

{#if loading}
  <Spinner />
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="box not-content">
    {#each users as { avatar, count, login,challengeNumber }, index}
      <UserBox {avatar} {login} {index}>
        {count} Answers
        <div slot="addon" class="challenge-number">{challengeNumber.join(', ')}</div>
      </UserBox>
    {/each}
  </div>
{/if}

<style>
  .box {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .challenge-number {
    font-size: 0.7rem;
    color: var(--sl-color-gray-3);
  }
</style>
