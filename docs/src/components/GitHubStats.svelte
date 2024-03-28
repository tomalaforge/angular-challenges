<script>
  import { onMount } from 'svelte';

  let error = false;
  let loading = true;
  let stargazersCount = 0;
  let forksCount = 0;


  async function fetchStats() {
    try {
        const response = await fetch(`https://api.github.com/repos/tomalaforge/angular-challenges`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  onMount(() => {
    fetchStats();
  });
</script>

{#if !error && !loading}
  <div class="github">
    <a class="category" href="https://github.com/tomalaforge/angular-challenges" target="_blank">
      <slot name="star"/>
      <div>{stargazersCount}</div>
    </a>

    <a class="category" href="https://github.com/tomalaforge/angular-challenges/fork" target="_blank">
      <slot name="fork"/>
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

  .category {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 0.25rem;
    color: var(--sl-color-text);
    text-decoration: none;
  }

  .category:hover {
    color: var(--sl-color-accent-high);
  }

</style>
