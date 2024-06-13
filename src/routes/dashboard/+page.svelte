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
<button use:melt={$button} on:click={handleClick}>clear token</button>
