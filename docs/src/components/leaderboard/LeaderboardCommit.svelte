<script>
  import { onMount } from 'svelte';
  import UserBox from './UserBox.svelte';

  let users = [];
  let loading = true;
  let error = null;

  async function fetchGitHubUsers() {
    try {
      const prCounts = {};
      let page = 1;

      while (true) {
        const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+no:label&per_page=100&page=${page}`);
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

        if(total_count < page * 100) {
          break;
        }

        page++;

      }

      users = Object.entries(prCounts).map(([login, pr]) => ({
        login,
        avatar: pr.avatar,
        count: pr.count,
        challengeNumber: pr.challengeNumber
      })).filter((r) => r.login !== 'allcontributors[bot]').sort((a, b) => b.count - a.count);

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }

  }

  onMount(() => {
    fetchGitHubUsers();
  });
</script>

{#if loading}
  <p>Loading...</p>
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

<style>
  .box {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
</style>
