<script lang="ts">
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

  function handleClickButton(e: any) {
    console.log(e);
  }
</script>

<div>dashboard</div>
<div>button</div>
<div>
  <MButton className="mr-6" type="primary" loading on:click={handleClickButton}>BUTTON</MButton>
  <MButton type="danger" disabled>BUTTON</MButton>
  <MButton type="success" icon="mdi-light--home">BUTTON</MButton>
</div>
<MButton on:click={goForm}>go form</MButton>
<MButton type="info" on:click={handleClick}>clear token</MButton>
