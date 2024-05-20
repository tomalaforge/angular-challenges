<script>
  import { token, username } from './github-store';

  let error = false;
  let loading = true;
  let loadingStar = true;
  let stargazersCount = 0;
  let forksCount = 0;
  let isStarByUser = false;

  token.subscribe(token => {
    if (token) {
      fetchStats();
      isStar();
      getUser();
    }
  });

  async function starRepo() {
    try {
      const response = await fetch(`https://api.github.com/user/starred/tomalaforge/angular-challenges`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${$token}`
        }
      });
      if (response.ok) {
        isStarByUser = !isStarByUser;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function isStar() {
    try {
      const response = await fetch(`https://api.github.com/user/starred/tomalaforge/angular-challenges`, {
        method: 'GET',
        headers: {
          Authorization: `token ${$token}`
        }
      });
      if (response.ok && response.status === 204) {
        isStarByUser = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingStar = false;
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
          Authorization: `token ${$token}`
        }
      });
      if (response.ok) {
        const { login } = await response.json();
        username.set(login);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingStar = false;
    }
  }


  async function fetchStats() {
    try {
      const response = await fetch(`https://api.github.com/repos/tomalaforge/angular-challenges`, {
        headers: {
          Authorization: `token ${$token}`
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          const refresh = await fetch('/auth/refresh');
          if (refresh.ok) {
            const data = await refresh.json();
            token.set(data.token);
            return;
          } else {
            token.set('delete');
            throw new Error('Failed to refresh token');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      }
      const { stargazers_count, forks } = await response.json();
      stargazersCount = stargazers_count;
      forksCount = forks;

    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  }
</script>

{#if !error && !loading && !loadingStar}
  <div class="github">
    {#if isStarByUser}
      <div class="category starred">
        <slot name="fullStar" />
        <span>{stargazersCount}</span>
      </div>
    {:else}
      <button class="button-star link" on:click={starRepo}>
        <slot name="star" />
        <span>{stargazersCount}</span>
      </button>
    {/if}

    <a class="category link" href="https://github.com/tomalaforge/angular-challenges/fork" target="_blank">
      <slot name="fork" />
      <div>{forksCount}</div>
    </a>
  </div>
{/if}

<style>

  .github {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: var(--sl-nav-gap);
  }

  .button-star {
    display: flex !important;
    justify-content: center;
    gap: 0.5em;
    align-items: center;
    border-radius: 999rem;
    color: var(--sl-color-white) !important;
    background-color: transparent;
    line-height: 1.1875;
    text-decoration: none;
    font-size: var(--sl-text-xs);
    border: 1px solid;
    padding: 0.2rem 0.4rem;
    margin-left: -6px
  }

  .category {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 0.25rem;
    color: var(--sl-color-text);
    text-decoration: none;
  }

  .link:hover {
    color: var(--sl-color-accent-high);
  }

  .starred {
    color: #e3b341;
  }

</style>
