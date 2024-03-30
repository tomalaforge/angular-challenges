<script>
  import { data, error, isLoaded, isLoading, token, totalCount } from './github-store';

  export let challengeNumber;

  let page = 1;

  token.subscribe(token => {
    if (token) {
      fetchTotalCount();
    }
  })

  async function fetchTotalCount() {
    isLoading.set(true);
    try {
      while (true) {
        const response = await fetch(`https://api.github.com/search/issues?q=repo:tomalaforge/angular-challenges+is:pr+label:"${challengeNumber}"+label:"answer"&per_page=100&page=${page}`, {
          headers: {
            Authorization: `Bearer ${$token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const { items: new_items, total_count } = await response.json();
        if (!new_items || new_items.length === 0) break;
        data.update(items => [...items, ...new_items]);
        totalCount.set(total_count);

        if(total_count < page * 100) break;

        page++;
      }
    } catch (e) {
      error.set(true);
    } finally {
      isLoading.set(false);
    }
  }

</script>

{#if $isLoaded}
  <div class="solution-container" id="answers">
    <div>Answered by</div>
    {#each $data as { user, html_url }}
      <a href={html_url} target="_blank">
      <img
        loading="lazy"
        src={user.avatar_url}
        width="30"
        height="30"
        alt=""
        title={user.login}
        class="avatar"
      />
      </a>
    {/each}
  </div>
{/if}

<style>
  .solution-container {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

  }
    .avatar {
      border-radius: 50%;
    }
</style>
