<script lang="ts">
  import { melt } from '@melt-ui/svelte'
  import { createFormItem } from '$lib/components/melt-builders'
  import { MRow, MCol } from '$lib/components/melt-ui'
  import { writable } from 'svelte/store';

  export let label = ''
  export let field = ''
  export let labelWidth = ''

  const {
    elements: { formItem },
    states: {
      validateState,
      validateMessage
    },
    enums: {
      validateEnums
    },
    helpers: {
      resetField: formItemResetField,
      validateField
    }
  } = createFormItem({ field })

  const resetField = formItemResetField

  validateField((errors: any, fields: any) => {
    console.log(errors, fields, 'errors');

  })

</script>


<div use:melt={$formItem}>
  <MCol>
    <MRow cols={1}>
      {#if label}
        <MCol width={labelWidth}>{label}</MCol>
      {/if}
      <MCol><slot /></MCol>
    </MRow>
    {#if $validateState === validateEnums.error}
    <MRow>{$validateState}</MRow>
    {/if}
  </MCol>
</div>
