<script>
  import { clsx } from 'clsx'

  export let icon = ''
  export let className = ''

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
