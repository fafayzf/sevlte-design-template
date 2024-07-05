<script lang="ts">
  import { melt } from '@melt-ui/svelte'
  import { createForm } from '$lib/components/melt-builders'
  import { MRow } from '$lib/components/melt-ui'

  export let cols = 1
  export let gap = { x: 0, y: 4 }

  export let model = {}
  export let rules = {}
  export let disabled = false
  export let labelWidth = ''

  const {
    elements: { form },
    helpers: {
      validate,
      validateField,
      resetFields,
      clearValidate
    }
  } = createForm({ model, rules, disabled, labelWidth })


  export {
    validate,
    validateField,
    resetFields,
    clearValidate
  }
</script>

<form use:melt={$form} {...$$restProps}>
  <MRow cols={cols} gap={gap}>
    <slot />
  </MRow>
</form>
