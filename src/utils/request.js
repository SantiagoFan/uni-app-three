import axios from './axios'
import { getToken } from '@/utils/auth.js'
export function httpPost (url, param) {
  let params = param || {};
  params.token = getToken();
  return axios.post(url, params).then(res => {
    return res
  }).catch(err => {
    return err
  })
}
export function httpGet (url, param) {
  let params = param || {}
  params.token = getToken();
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}



