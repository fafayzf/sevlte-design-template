<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { melt } from '@melt-ui/svelte'
  import { createInput, type CreateInputProps } from '$lib/components/melt-builders'
  import { MIcon } from '$lib/components/melt-ui'
  import { clsx } from 'clsx'
  import { writable } from 'svelte/store'

  import type { MInputProps } from './index.d'
  import { effect } from '@melt-ui/svelte/internal/helpers';

  export let type: MInputProps['type'] = 'text'
  export let value: MInputProps['value'] = writable('')
  export let className: MInputProps['className'] = ''
  export let placeholder: MInputProps['placeholder'] = ''
  export let clearable: MInputProps['clearable'] = false

  const prefix = 'melt-input'
  $: cnames = clsx(prefix, className, 'min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500')
  const dispatch = createEventDispatcher()

  const handleChange: CreateInputProps['onValueChange'] = ({ curr, next }) => {
    dispatch('change', $inputValue)
    return next
  }

  const {
    elements: { root, input, clearTrigger },
    states: { value: inputValue, eventType },
  } = createInput({ placeholder, value, onValueChange: handleChange })

  effect([eventType], ([$eventType]) => {
    if ($eventType === 'clear') {
      dispatch('clear')
    }
  })

  function handleInput() {
    dispatch('input', $inputValue)
  }

  function handleBlur() {
    console.log('123', $inputValue);

    dispatch('blur', $inputValue)
  }

</script>

<div
  use:melt={$root}
  class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-slate-700
  focus-within:ring focus-within:ring-primary"
>
  <input
    use:melt={$input}
    on:input={handleInput}
    on:blur={handleBlur}
    class={cnames}
    type={type}
    {...$$restProps}
  />
  {#if clearable && $inputValue}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex" use:melt={$clearTrigger}>
      <MIcon
        ripple
        className="hover:bg-slate-900 cursor-pointer"
        icon="mdi--close"
      ></MIcon>
    </div>
  {/if}
</div>


