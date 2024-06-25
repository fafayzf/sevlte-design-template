<script lang="ts">
  import clsx from 'clsx'
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'
  import { type MContianerProps } from './index.d'

  export let tag: MContianerProps['tag'] = 'div'
  export let fluid: MContianerProps['fluid'] = false
  export let className: MContianerProps['className'] = ''

  const prefix = getPrefixClass('container')

  $: cnames = clsx(prefix, className, {
    'w-full': fluid
  })
</script>


<svelte:element this={tag} class={cnames}>
  <slot />
</svelte:element>
