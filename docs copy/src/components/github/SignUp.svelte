<script>
  import GitHubStats from './GitHubStats.svelte';
  import { loadToken, token } from './github-store';
  import { onMount } from 'svelte';


  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get('token');
    if(t) {
      token.set(t);
      window.location.href = `${window.location.origin}${window.location.pathname}`;
    } else {
      loadToken();
    }
  });

</script>

{#if !$token}
  <a href={`/auth/authorize?redirect_uri=${window.location.href}`}>
    <slot name="github"/>
    <span class="github-sign-in">Sign in</span>
  </a>
{:else}
  <GitHubStats>
    <slot name="fullStar" slot="fullStar"/>
    <slot name="star" slot="star"/>
    <slot name="fork" slot="fork"/>
  </GitHubStats>
{/if}


<style>
  a {
    background-color: #238636;
    display: flex;
    gap: 0.25rem;
    text-decoration: none;
    color: white;
    border: none;
    padding: 8px 8px;
    cursor: pointer;
    border-radius: 5px;
    align-items: center;
    height: fit-content;
    font-size:14px;
    line-height: 14px;
    margin-left: var(--sl-nav-gap);
  }

  a:hover {
    background-color: #218838;
  }

  a :global(svg) {
    --sl-icon-color: initial;
  }


  @media (width < 450px) {
    .github-sign-in {
      display: none;
    }
  }
</style>
