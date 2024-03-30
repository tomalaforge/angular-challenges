
<div class="spinner-container">
<div class="spinner"></div>
</div>

<style>
  .spinner-container {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    border: 4px solid var(--sl-color-gray-3); /* Light grey border */
    border-top: 4px solid var(--sl-color-bg);
    border-right: 4px solid var(--sl-color-bg);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
