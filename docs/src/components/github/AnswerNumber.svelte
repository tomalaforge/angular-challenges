<script>
  import { isLoaded, totalCount } from './github-store';
</script>

{#if $isLoaded}
  <a href="#answers" class="answer-text">Answered by {$totalCount} people</a>
{/if}

<style>
  .answer-text {
    font-size: var(--sl-text-xs);
    color: var(--sl-color-gray-3);
    width: max-content;
    text-decoration: none;
  }

  .answer-text:hover {
    color: var(--sl-color-accent-high);
  }
</style>
