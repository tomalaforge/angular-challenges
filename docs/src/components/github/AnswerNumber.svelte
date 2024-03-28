<script>
  import { isLoaded, totalCount } from './github-store';
</script>

{#if isLoaded}
  <div class="answer-text">Answered by {$totalCount} people</div>
{/if}

<style>
  .answer-text {
    font-size: var(--sl-text-xs);
    color: var(--sl-color-gray-3);
    width: max-content;
  }
</style>
