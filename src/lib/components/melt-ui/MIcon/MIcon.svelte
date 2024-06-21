<script lang="ts">
  import { clsx } from 'clsx'
  import { type MIconProps } from './index.d'

  export let icon: MIconProps['icon'] = ''
  export let className: MIconProps['className'] = ''

  const prefix = 'melt-icon'

  $: cnames = clsx(prefix, 'iconify text-2xl', icon, className)
</script>

<span class={cnames} {...$$restProps}></span>

<style>
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
