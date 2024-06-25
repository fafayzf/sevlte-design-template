<script lang="ts">
  import { MButton, MInput, MContainer } from '$src/lib/components/melt-ui'
  import { useToken } from '$src/store/userStore'
  import { goto } from '$app/navigation'
  import { writable, get } from 'svelte/store'

  function handleClick() {
    const { token } = useToken()
    token.update(() => '')
    goto('/login')
  }

  function goForm() {
    goto('/form')
  }


  function handleInput(e: any) {
    console.log(e)
  }

  let defaultValue = writable('')

  function handleBlur(e: any) {
    console.log(e)

  }

  function handleClickButton(e: any) {
    console.log(e)
  }

</script>

<div>dashboard</div>
<h1>button</h1>
<div>
  <MButton className="mr-6" type="primary" loading on:click={handleClickButton}>BUTTON</MButton>
  <MButton type="danger" disabled>BUTTON</MButton>
  <MButton type="success" icon="mdi-light--home">BUTTON</MButton>
</div>
<MButton on:click={goForm}>go form</MButton>
<MButton type="info" on:click={handleClick}>clear token</MButton>

<h1>input</h1>
<MContainer fluid>
  <MInput
    value={defaultValue}
    on:input={handleInput}
    on:blur={handleBlur}
    disabled
    clearable
    placeholder="Enter..."
  ></MInput>
</MContainer>
