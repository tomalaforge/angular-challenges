<script>
  import { onMount } from 'svelte';
  import UserBox from './UserBox.svelte';


  let users = [];
  let loading = true;
  let error = null;

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

    return Object.entries(prCounts).map(([login, pr]) => ({
      login,
      avatar: pr.avatar,
      count: pr.count
    })).filter((r) => r.login !== 'allcontributors[bot]').sort((a, b) => b.count - a.count);
  };

  async function fetchGitHubUsers() {
    try {
      const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+label:%22challenge-creation%22`);
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
    {#each users as { avatar, count, login, challengeNumber }, index}
      <UserBox {avatar} {login} {index}>
        {count} Challenges Created
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
