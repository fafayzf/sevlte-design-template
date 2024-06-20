<script>
  import { MButton } from '$src/lib/components/melt-ui'
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
<div>button</div>
<div>
  <MButton type="primary">BUTTON</MButton>
  <MButton type="danger">BUTTON</MButton>
  <MButton type="success">BUTTON</MButton>
</div>
<MButton on:click={goForm}>go form</MButton>
<MButton type="info" on:click={handleClick}>clear token</MButton>
