<script>
  import { loadToken, test } from './github-store';
  import { onMount } from 'svelte';

  // Function to redirect the user to GitHub's signup page
  async function redirectToGitHubSignup() {
    // token.set('test-token');
    // window.location.href = `/auth/authorize?redirect_uri=${window.location.href}&test=dklsfj`;
    await fetch(`/auth/authorize?redirect_uri=${window.location.href}&state=jsqhd&client_id=Iv1.711903007f608691`)
  }

  onMount(() => {
    loadToken();
  });

</script>

{$test}
<button on:click={redirectToGitHubSignup}>
  Sign Up for GitHub
</button>


<style>
  button {
    background-color: #2ea44f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }

  button:hover {
    background-color: #218838;
  }
</style>
