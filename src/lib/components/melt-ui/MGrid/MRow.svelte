<script lang="ts">
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'
  import clsx from 'clsx'
  import type { MRowProps } from './index.d'

  export let className: MRowProps['className'] = ''
  export let gutter: MRowProps['gutter'] = 0
  export let jusitfy: MRowProps['justify'] = 'start'
  export let align: MRowProps['align'] = undefined
  export let tag: MRowProps['tag'] = 'div'

  const prefix = getPrefixClass('row')
  $: cnames = clsx(prefix, className, {
    [`space-x-${gutter}`]: true,
    [`justify-${jusitfy}`]: true,
    [`align-${align}`]: true
  })
</script>

<svelte:element
  this={tag}
  class={cnames}
  {...$$restProps}
>
  <slot />
</svelte:element>
