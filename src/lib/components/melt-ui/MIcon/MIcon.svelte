<script lang="ts">
  import { clsx } from 'clsx'
  import { ripple as useRipple } from '$src/lib/actions'
  import { getPrefixClass } from '$lib/components/melt-builders/helpers'

  import { type MIconProps } from './index.d'

  export let icon: MIconProps['icon'] = ''
  export let className: MIconProps['className'] = ''
  export let ripple: MIconProps['ripple'] = false

  const prefix = getPrefixClass('icon')

  $: cnames = clsx(prefix, 'iconify text-2xl', icon, className)
</script>

<span use:useRipple={ripple} class={cnames} {...$$restProps}></span>

<style>
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
