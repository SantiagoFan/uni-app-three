const ci = require('miniprogram-ci')
// 项目参数
const project = new ci.Project({
  appid: 'wxb122ef40a4df26c9',
  type: 'miniProgram',
  projectPath: './dist/build/mp-weixin/',
  privateKeyPath: './ci-private.key',
  ignores: ['node_modules/**/*'],
})
/**
 * 预览
 */
async function preview(){
  const previewResult = await ci.preview({
    project,
    desc: 'hello', // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: './destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.info(previewResult)
}
/**
 * 
 */