<script lang="ts">
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'
  import clsx from 'clsx'
  import type { MColProps } from './index.d'

  export let tag: MColProps['tag'] = 'div'
  export let className: MColProps['className'] = ''
  export let span: MColProps['span'] = ''
  export let start: MColProps['start'] = ''
  export let end: MColProps['end'] = ''
  export let width = ''

  const prefix = getPrefixClass('col')

  function generateColCls(type: string, n: string | number) {
    if (!n) return
    if (type === 'span' && (n === 'auto')) {
      return {
        'col-auto': true
      }
    }

    return {
      [`col-${type}-${n}`]: true
    }
  }

  $: cnames = clsx(prefix, className, {
    ...generateColCls('span', span),
    ...generateColCls('start', start),
    ...generateColCls('end', end),
  })

  $: contentWidth = typeof width === 'boolean' ? `${width}px` : width
</script>

<svelte:element
  this={tag}
  class={cnames}
  style:width={contentWidth}
>
  <slot />
</svelte:element>
