import { writable } from 'svelte/store'
import { getToken, setToken, removeToken } from 'src/utils/auth'

export function useToken() {
  const token = writable(getToken())

  token.subscribe((value) => {
    if (value) {
      setToken(value)
    } else {
      removeToken()
    }
  })

  return {
    token
  }
}

export function useUserInfo() {
  const userInfo = writable(null)

  userInfo.subscribe((value) => {
    console.log(value)
  })

  return {
    userInfo
  }
}
