export const AUTH_TOKEN = 'auth-token'

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN)
}

/**
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(AUTH_TOKEN, token)
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN)
}
