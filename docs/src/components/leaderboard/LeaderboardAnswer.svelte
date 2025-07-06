<script>
  import UserBox from './UserBox.svelte';
  import Spinner from './Spinner.svelte';
  import { isConnected, token, username } from '../github/github-store';

  let users = [];
  let loading = true;
  let error = null;
  let isUsernamePresent = false;
      let globalCount = 0;

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

        globalCount = globalCount + items.length;

        items.forEach(pr => {
          const userLogin = pr.user.login;
          // Extract challenge number from labels
          const challengeNumbers = pr.labels.filter(l => !isNaN(Number(l.name))).map(l => Number(l.name));
          const challengeNumber = challengeNumbers?.[0];
          if (!challengeNumber) return; // skip if no challenge number
          if (prCounts[userLogin]) {
            // Only add if not already present
            if (!prCounts[userLogin].challengeNumber.includes(challengeNumber)) {
              prCounts[userLogin].challengeNumber.push(challengeNumber);
            }
          } else {
            prCounts[userLogin] = {
              avatar: pr.user.avatar_url,
              challengeNumber: [challengeNumber]
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
        count: pr.challengeNumber.length, // count unique challenges only
        challengeNumber: pr.challengeNumber.sort((a, b) => a - b),
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
🔥Total Answers: <span class="global-count">{ globalCount }</span>
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
      {#each users as { avatar, count, login, challengeNumber }, index}
        <UserBox {avatar} {login} {index}>
          {count} Answers
          <div slot="addon" class="challenge-number">{challengeNumber.join(', ')}</div>
        </UserBox>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .not-connected {
    margin-top: 1rem;
  }

  .global-count {
    color: red;
    font-size: 20px;
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
    gap: 1.5rem;
    margin-top: 0.5rem;
  }

  .challenge-number {
    font-size: 0.7rem;
    color: var(--sl-color-gray-3);
  }
</style>
