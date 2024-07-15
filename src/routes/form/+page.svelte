<script lang="ts">
  import { MForm, MFormItem, MInput, MButton } from '$src/lib/components/melt-ui'

  // @ts-ignore
  let formInstance: MForm = undefined

  let form = {
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

<MForm bind:model={form} rules={rules} bind:this={formInstance}>
  <MFormItem label="UserName" field="username">
    <MInput bind:value={form.username} clearable placeholder="Enter..."></MInput>
  </MFormItem>
  <MFormItem label="Password" field="password">
    <MInput type="password" bind:value={form.password} clearable placeholder="Enter..."></MInput>
  </MFormItem>
  <MFormItem>
    <MButton type="primary" className="w-full" on:click={handleReset}>SUBMIT</MButton>
    <MButton type="info" className="w-full" on:click={handleReset}>RESET</MButton>
  </MFormItem>
</MForm>



