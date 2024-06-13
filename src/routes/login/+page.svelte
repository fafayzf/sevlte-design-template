<script>
  import { melt } from '@melt-ui/svelte'
  import { createButton } from '$lib/components/builders/button'
  import { useToken } from 'src/store/userStore'
  import { goto } from '$app/navigation';
  const {
    elements: { button }
  } = createButton()

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
    <button
      use:melt={$button}
      on:click={onLogin}
      class="inline-flex w-full h-9 items-center justify-center rounded-md bg-black px-4 py-2 mt-4
      font-medium leading-none text-magnum-300 shadow-lg hover:opacity-75"
    >LOGIN</button>
  </form>
</div>
<style>
  .input {
    @apply inline-flex h-9 mb-3 w-full items-center justify-center rounded-sm border border-solid px-3 leading-none text-black
  }
</style>
