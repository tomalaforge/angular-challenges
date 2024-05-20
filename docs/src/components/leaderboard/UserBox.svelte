<script>
  import { username } from '../github/github-store';

  export let avatar;
 export let login;
 export let index;
</script>

<div class={`user-box ${login === $username ? 'own-box' : ''}`} id={login === $username ? $username: index}>
  <div class="user-info">
    <img src={avatar} alt="" width="40" height="40" class="avatar" />
    <div class="name-box">
      <div class="user-name">{login}</div>
      <div class="count"><slot /></div>
      <slot name="addon" />
    </div>
  </div>
  <div class="position">
    #{index + 1}
  </div>
</div>

<style>
  .position {
    font-size: 20px;
    line-height: 20px;
    height: 100%;
    padding: 0.5rem;
    color: var(--sl-color-gray-6);
    background-color: var(--sl-color-gray-3);
  }

  .user-box {
    display: flex;
    gap: 5px;
    border: 1px solid var(--sl-color-gray-3);
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .own-box {
    border: 1px solid red;
  }

  .user-info {
    display: flex;
    padding: 1rem 0 1rem 1rem;
    gap: 1rem;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px
  }

  .name-box {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 24px;
    color: red;
    line-height: 24px;
  }

  .count {
    font-size: var(--sl-text-xs);
    color: var(--sl-color-gray-3);
  }

</style>
