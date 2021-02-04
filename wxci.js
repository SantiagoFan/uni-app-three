const ci = require('miniprogram-ci')
const inquirer = require('inquirer')
let shell = require('shelljs');
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
    qrcodeFormat: 'terminal',
    qrcodeOutputDest: './destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.info(previewResult)
}
/**
 * 上传
 */
async function upload({version = '0.0.0', desc ='test'}){
  await ci.upload({
    project,
    version,
    desc,
    setting: {
        es7: true,
        minify: true,
        autoPrefixWXSS: true
    },
    onProgressUpdate: console.log,
  })
} 
async function git_sync({version = '0.0.0', desc ='test'}){
  shell.exec('git add .')
  shell.exec(`git commit -m "${desc}"`)
  shell.exec(`git pull`)
  shell.exec('git push')
}

function inquirerResult(){
  return inquirer.prompt([
    {
      type: 'list',
      message: '请选择命令类型:',
      name: 'type',
      choices: [
        {name:"上传新版本 upload",value:"upload"},
        {name:"预览新版本 preview",value:"preview"},
        {name:"代码同步 code_sync",value:"code_sync"},
      ],
    },
    // 设置版本号
    {
      type: 'input',
      name: 'version',
      message: `设置上传的版本号:`,
      when:(answers)=>{ return answers.type =='upload'||answers.type =='code_sync' }
  },

  // 设置上传描述
  {
      type: 'input',
      name: 'desc',
      message: `写一个简单的介绍来描述这个版本的改动过:`,
      when:(answers)=>{ return answers.type =='upload'||answers.type =='code_sync' }
  },
]);
}
async function init() {
  let result = await inquirerResult();  
  console.log(result);      // 输出
  switch(result.type){
    case 'upload':{ await upload(result) }break;
    case 'preview':{ await preview(result) }break;
    case 'code_sync':{ await git_sync(result)}break;
  }
}

init()