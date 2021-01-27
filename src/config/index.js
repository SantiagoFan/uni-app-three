// const basepath = "http://api.medical.lingjikeji.cn";
let basepath = 'https://wx.mzyy.org.cn'

if(process.env.NODE_ENV === 'development'){
  basepath = 'http://mzy.aa'
}

const baseUrl = basepath + '/api'

export { baseUrl, basepath }
