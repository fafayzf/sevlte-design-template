<script lang="ts">
  import { MButton, MInput, MContainer, MRow, MCol } from '$src/lib/components/melt-ui'
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

<MButton on:click={goForm}>go form</MButton>
<MButton type="info" on:click={handleClick}>clear token</MButton>

<MContainer>
  <MRow cols={1} className="mt-4">button</MRow>
  <MRow cols={1}>
    <MButton type="primary" loading on:click={handleClickButton}>BUTTON</MButton>
    <MButton type="danger" disabled>BUTTON</MButton>
    <MButton type="success" icon="mdi-light--home">BUTTON</MButton>
  </MRow>
</MContainer>

<MContainer>
  <MRow cols={1} className="mt-4">input</MRow>
  <MRow cols={1}>
    <MInput
      value={defaultValue}
      on:input={handleInput}
      on:blur={handleBlur}
      disabled
      clearable
      placeholder="Enter..."
    ></MInput>
  </MRow>
</MContainer>

<MContainer>
  <MRow cols={1} className="mt-4">row, col</MRow>
  <MRow gap={2}>
    <MCol span={3} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={9} className="bg-slate-400 rounded h-9"></MCol>
  </MRow>
  <MRow gap={2} className="my-4">
    <MCol span={4} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={4} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={2} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={2} className="bg-slate-400 rounded h-9"></MCol>
  </MRow>
  <MRow gap={2} className="my-4">
    <MCol span={2} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={8} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={2} className="bg-slate-400 rounded h-9"></MCol>
  </MRow>
  <MRow gap={4} className="my-4">
    <MCol start={2} span={10} className="bg-slate-400 rounded h-9"></MCol>
    <MCol start={1} end={4} className="bg-slate-400 rounded h-9"></MCol>
    <MCol span={6} end={13} className="bg-slate-400 rounded h-9"></MCol>
    <MCol start={1} end={13} className="bg-slate-400 rounded h-9"></MCol>
  </MRow>
</MContainer>
