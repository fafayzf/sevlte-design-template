<script>
  import { melt } from '@melt-ui/svelte'
  import { createButton } from '$lib/components/builders/button'
  import { useToken } from 'src/store/userStore'
  import { goto } from '$app/navigation'

  const {
    elements: { button }
  } = createButton()

  function handleClick() {
    const { token } = useToken()
    token.update(() => '')
    goto('/login')
  }
</script>

<div>dashboard</div>
<button
  use:melt={$button}
  on:click={handleClick}
  class="inline-flex w-full h-9 items-center justify-center rounded-md bg-black px-4 py-2 mt-4
        font-medium leading-none text-magnum-300 shadow-lg hover:opacity-75"
>clear token</button>
