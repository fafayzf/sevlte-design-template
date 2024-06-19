<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { melt } from '@melt-ui/svelte'
  import { createButton } from '$lib/components/melt-builders/button'
  import { ripple } from '$src/lib/actions'
  import { writable } from 'svelte/store'
  import { type ButtonTypes } from '../melt-builders'

  export let type = writable<ButtonTypes>('primary')
  const {
    elements: { button }
  } = createButton({ type })

  const dispatch = createEventDispatcher()

  function handleClick(e: Event) {
    dispatch('click', e)
  }

</script>

<button
  use:melt={$button}
  use:ripple
  on:click={handleClick}
  class="inline-flex w-full h-9 items-center justify-center rounded-md bg-black px-4 py-2 mt-4
  font-medium leading-none text-magnum-300 shadow-lg hover:opacity-75"
>
  <slot />
</button>
