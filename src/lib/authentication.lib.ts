import { AUTH_COOKIES_KEY, AUTH_TOKEN_KEY } from '@/constants/global.constant'
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage.constant'
import { ROUTE_PATHS } from '@/constants/routes.constant'
import jsCookie from 'js-cookie'

export const clearUserStorage = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach((item) => {
    localStorage.removeItem(item)
  })
  localStorage.removeItem(AUTH_COOKIES_KEY)
  jsCookie.remove(AUTH_TOKEN_KEY)
}

export const exitUser = (withRedirect = true) => {
  clearUserStorage()
  if (withRedirect) {
    window.location.href = ROUTE_PATHS.login
  }
}
