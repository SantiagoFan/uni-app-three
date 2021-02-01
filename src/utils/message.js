import { http } from '@/utils/http'
import api from '@/api/api'

export default {
  req_msg(type) {
    uni.showLoading({
      title: "正在订阅消息",
    });
    return new Promise((resolve, reject) => {
      http.post(api.GET_TEMPLATE_ID, { type: type },false).then((res) => {
        if (res.code === 20000) {
          uni.requestSubscribeMessage({
            tmplIds: res.data,
            complete(errMsg){
              console.log('complete',errMsg)
              resolve()
            }
          })
        } else {
          reject()
        }
      }).catch(()=>{
        reject('网络错误')
      }).finally(()=>{
        uni.hideLoading();
      })
    })
  },
}
