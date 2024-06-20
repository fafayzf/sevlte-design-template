<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { melt } from '@melt-ui/svelte'
  import { createButton } from '$lib/components/melt-builders/button'
  import { ripple } from '$src/lib/actions'
  import { type ButtonTypes } from '../../melt-builders'
  import { clsx } from 'clsx'

  export let type: ButtonTypes = 'primary'
  export let className = ''

  const {
    elements: { button }
  } = createButton({ type })

  const dispatch = createEventDispatcher()

  function handleClick(e: Event) {
    dispatch('click', e)
  }

  $: cnames = clsx(className, `btn-${type}`, 'button')

</script>

<button
  use:melt={$button}
  use:ripple
  on:click={handleClick}
  class={cnames}
>
  <slot />
</button>

<style lang="postcss">
  @import './index.css';
</style>
