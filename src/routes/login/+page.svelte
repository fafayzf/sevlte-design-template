<script>
  import { MButton } from '$src/lib/components/melt-ui'
  import { useToken } from '$src/store/userStore'
  import { goto } from '$app/navigation';

  function onLogin() {
    const { token } = useToken()
    token.set('token')
    goto('/dashboard')
  }
</script>

<div class="flex justify-center">
  <form action="#" class="w-96 justify-center bg-white mt-28 px-3 py-9 shadow-lg rounded-lg">
    <h1 class="text-center mb-3">SYSTEM</h1>
    <input
      type="text"
      class="input"
    />
    <input
      type="password"
      class="input"
    />
    <MButton on:click={onLogin} className="w-[100%]">LOGIN IN</MButton>
  </form>
</div>

<style>
  .input {
    @apply inline-flex h-9 mb-3 w-full items-center justify-center rounded-sm border border-solid px-3 leading-none text-black;
  }
</style>
