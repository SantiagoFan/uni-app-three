/**
 * 登录授权
 */
import Cookie from 'js-cookie'

export const getToken = () => {
  return Cookie.get('token') || ''
}

export const setToken = (token) => {
  return Cookie.set('token', token)
}

export const setlocalStorage = (key, value) => {
  return localStorage.setItem(key, value)
}

export const getlocalStorage = (key) => {
  return localStorage.getItem(key)
}