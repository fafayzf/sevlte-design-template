<script>
  import MButton from '$src/lib/components/melt-ui/MButton.svelte'
  import { useToken } from '$src/store/userStore'
  import { goto } from '$app/navigation'

  function handleClick() {
    const { token } = useToken()
    token.update(() => '')
    goto('/login')
  }

  function goForm() {
    goto('/form')
  }
</script>

<div>dashboard</div>
<MButton on:click={goForm}>go form</MButton>
<MButton on:click={handleClick}>clear token</MButton>
