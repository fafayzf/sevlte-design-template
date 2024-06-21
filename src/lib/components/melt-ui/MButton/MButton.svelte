<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { melt } from '@melt-ui/svelte'
  import { createButton } from '$lib/components/melt-builders'
  import { MIcon } from '$lib/components/melt-ui'
  import { ripple, debounce } from '$src/lib/actions'
  import { type ButtonTypes } from '$lib/components/melt-builders'

  import { clsx } from 'clsx'

  export let type: ButtonTypes = 'primary'
  export let className = ''
  export let delay = 300
  export let icon = ''
  export let loading = false
  export let disabled = false

  const prefix = 'melt-button'
  $: cnames = clsx(prefix, className, `${prefix}-${type}`)

  const {
    elements: { button }
  } = createButton({ type, disabled })

  const dispatch = createEventDispatcher()

  function handleClick(event: Event) {
    dispatch('click', event)
  }
</script>

<button
  use:melt={$button}
  use:ripple
  use:debounce={{
    handler: handleClick,
    delay
  }}
  class={cnames}
  disabled={disabled}
  {...$$restProps}
>
  <slot />
  {#if loading}
    <MIcon icon='mdi-light--loading' className="ml-1 spinner"></MIcon>
  {:else if icon}
    <MIcon icon={icon} className="ml-1"></MIcon>
  {/if}
</button>

<style lang="postcss">
.melt-button {
  @apply inline-flex h-9 items-center justify-center rounded-md px-4 py-2 mt-4 font-medium leading-none text-white shadow-lg hover:opacity-75 border-none;
}
.melt-button-primary {
  @apply bg-primary;
}
.melt-button-success {
  @apply bg-success;
}
.melt-button-danger {
  @apply bg-danger;
}
.melt-button-info {
  @apply bg-info;
}

.melt-button[data-disabled] {
  cursor: no-drop;
  opacity: 0.65;
}

</style>
