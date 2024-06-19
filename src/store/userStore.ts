import { writable } from 'svelte/store'
import { getToken, setToken, removeToken } from '$src/utils/auth'

export function useToken() {
  const token = writable(getToken())

  const unsub = token.subscribe((value) => {
    if (value) {
      setToken(value)
    } else {
      removeToken()
    }
  })

  return {
    token,
    destory: unsub
  }
}

export function useUserInfo() {
  const userInfo = writable(null)

  const unsub = userInfo.subscribe((value) => {
    console.log(value)
  })

  return {
    userInfo,
    destory: unsub
  }
}
