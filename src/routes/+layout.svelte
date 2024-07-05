<script>
  import { onMount } from 'svelte'
  import { hasRoutePermission } from '$src/hooks.client'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { get } from 'svelte/store'
  import { useToken } from '$src/store/userStore'
  import { MContainer } from '$lib/components/melt-ui'

  import ContainerView from '$lib/components/container/ContainerView.svelte'
	import './styles.css'
  import '../app.css'

  const currentPath = $page.url.pathname

  onMount(() => {
    const { token } = useToken()
    const hasToken = get(token)

    if (!hasToken && currentPath !== '/login') {
      goto('/login')
    }
    if (currentPath === '/') {
      goto('/dashboard')
    }
  })

  hasRoutePermission()
</script>

<MContainer>
	<ContainerView>
    <slot />
  </ContainerView>
</MContainer>
