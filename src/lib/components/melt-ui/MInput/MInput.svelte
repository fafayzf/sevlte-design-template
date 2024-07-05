<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { melt } from '@melt-ui/svelte'
  import { createInput, type CreateInputProps } from '$lib/components/melt-builders'
  import { MIcon } from '$lib/components/melt-ui'
  import { clsx } from 'clsx'
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'

  import type { MInputProps } from './index.d'
  import { writable } from 'svelte/store';

  export let value: MInputProps['value'] = ''
  export let className: MInputProps['className'] = ''
  export let placeholder: MInputProps['placeholder'] = ''
  export let clearable: MInputProps['clearable'] = false
  export let disabled: MInputProps['disabled'] = false

  const prefix = getPrefixClass('input')
  $: cnames = clsx(
    prefix,
    className,
    'min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500'
  )

  const dispatch = createEventDispatcher()

  const handleChange: CreateInputProps['onValueChange'] = ({ next, event }) => {
    value = next
    dispatch(event as string, next)
    return next
  }

  const {
    elements: { root, input, clearTrigger },
    states: { value: inputValue },
  } = createInput({
    disabled,
    placeholder,
    value: writable(value),
    onValueChange: handleChange
  })

</script>

<div
  use:melt={$root}
  class="melt-input-wrapper flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-slate-700
  focus-within:ring focus-within:ring-primary"
>
  <input
    use:melt={$input}
    class={cnames}
    bind:value
    disabled={disabled}
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


<style lang="postcss">
.melt-input-wrapper[data-disabled],
.melt-input[data-disabled] {
  cursor: no-drop;
  opacity: 0.65;
}
</style>
