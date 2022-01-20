let basepath = 'https://wx.mzyy.org.cn'

if (process.env.NODE_ENV === 'development') {
  basepath = 'https://wx.mzyy.org.cn'
}

const baseUrl = basepath + '/api'

const app_config = {
  name: '呼和浩特市蒙医中医医院',
  version: require('../../package.json').version
}

const getConfig = (key) => {
  return app_config[key]
}

export { baseUrl, basepath, getConfig }
