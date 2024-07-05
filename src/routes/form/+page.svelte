<script lang="ts">
  import { MForm, MFormItem, MInput, MButton } from '$src/lib/components/melt-ui'

  // @ts-ignore
  let formInstance: MForm = undefined

  const form = {
    username: '',
    password: ''
  }

  const rules = {
    username: [
      { required: true, message: 'username is required' },
    ]
  }

  function handleReset() {
    formInstance.resetFields()
  }
</script>

<MForm model={form} rules={rules} bind:this={formInstance}>
  <MFormItem label="UserName" field="username">
    <MInput bind:value={form.username} clearable></MInput>
  </MFormItem>
  <MFormItem label="Password" field="password">
    <MInput type="password" bind:value={form.password} clearable></MInput>
  </MFormItem>
  <MFormItem>
    <MButton type="primary" className="w-full" on:click={handleReset}>SUBMIT</MButton>
    <MButton type="info" className="w-full" on:click={handleReset}>RESET</MButton>
  </MFormItem>
</MForm>



