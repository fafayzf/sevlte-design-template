<script lang="ts">
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'
  import clsx from 'clsx'
  import type { MRowProps } from './index.d'

  export let className: MRowProps['className'] = ''
  export let gap: MRowProps['gap'] = 0
  export let cols: MRowProps['cols'] = 12
  export let tag: MRowProps['tag'] = 'div'

  const prefix = getPrefixClass('row')
  let layoutClass = 'grid'

  $: cnames = clsx(prefix, className, layoutClass, {
    [`gap-x-${typeof gap === 'number' ? gap : gap.x || 0}`]: true,
    [`gap-y-${typeof gap === 'number' ? gap : gap.y || 0}`]: true,
    [`grid-cols-${cols}`]: true
  })
</script>

<svelte:element
  this={tag}
  class={cnames}
  {...$$restProps}
>
  <slot />
</svelte:element>
