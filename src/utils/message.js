import { http } from '@/utils/http'
import api from '@/api/api'

export default {
  req_msg(type) {
    return new Promise((resolve, reject) => {
      http.post(api.GET_TEMPLATE_ID, { type: type }).then((res) => {
        if (res.code === 20000) {
          uni.requestSubscribeMessage({
            tmplIds: [res.data],
            success(res) {
              resolve(res)
            },
          })
        } else {
          reject()
        }
      })
    })
  },
}
