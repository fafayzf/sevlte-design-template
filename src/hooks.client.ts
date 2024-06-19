import { beforeNavigate, goto } from '$app/navigation'
import { getToken } from './utils/auth'

export async function handleError({ error, event }: any) {
  console.log(error, event);
  return {
    message: 'Error Page',
    errorId: '500'
  }
}

export function hasRoutePermission() {
  beforeNavigate(({ to, cancel }) => {
    if (getToken()) {
      if (to?.route.id === '/login') {
        cancel()
        goto('/dashboard')
      } else {
        console.log('has token')
      }
    } else {
      if (to?.route.id === '/login') {
        console.log('white list')
      } else {
        cancel()
        goto('/login')
      }
    }
  })
}

export function checkAuth() {
  return false
}
