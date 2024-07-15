<script lang="ts">
  import { melt } from '@melt-ui/svelte'
  import { createForm } from '$lib/components/melt-builders'
  import { MRow } from '$lib/components/melt-ui'
  import { writable } from 'svelte/store';

  export let cols = 1
  export let gap = { x: 0, y: 4 }

  export let model = {}
  export let rules = {}
  export let disabled = false
  export let labelWidth = 'max-content'

  let modelStore = writable(model)
  let rulesStore = writable(rules)
  let disabledStore = writable(disabled)
  let labelWidthStore = writable(labelWidth)
  $: modelStore.set(model)
  $: rulesStore.set(rules)
  $: disabledStore.set(disabled)
  $: labelWidthStore.set(labelWidth)

  const {
    elements: { form },
    helpers: {
      validate,
      validateField,
      resetFields,
      clearValidate
    }
  } = createForm({
    rules: rulesStore,
    disabled: disabledStore,
    labelWidth: labelWidthStore,
    model: modelStore
  })

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
