<script lang="ts">
  import { melt } from '@melt-ui/svelte'
  import { createFormItem } from '$lib/components/melt-builders'
  import { MRow, MCol } from '$lib/components/melt-ui'

  export let label = ''
  export let field = ''
  export let labelWidth = ''

  const {
    elements: { formItem }
  } = createFormItem({ field })
</script>


<div use:melt={$formItem}>
  <MCol>
    <MRow cols={1}>
      {#if label}
        <MCol width={labelWidth}>{label}</MCol>
      {/if}
      <MCol><slot /></MCol>
    </MRow>
  </MCol>
</div>
