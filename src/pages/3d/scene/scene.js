import * as THREE from '@/common/three.weapp.js'
import { OrbitControls } from '@/common/jsm/controls/OrbitControls'
import { Lead } from "./lead"

import { JoystickControls } from './joystick';

/**
 * 场景渲染函数
 * @param {*} canvas 
 * @param {*} THREE 
 */
export default function (canvas) {
  console.info("---- scene 初始化开始 ------")
  let window = THREE.global;

  //////////////////////////////
  // 全局变量
  //////////////////////////////
  var scene = null;
  var camera = null;
  var clock = null;
  var renderer = null
  var models = {}
  var controls = null
  var joystickControls =  null
  //////////////////////////////


  //////////////////////////////
  // 核心启动
  //////////////////////////////
  initScene()
  loadModels() // 加载模型
  initRenderer()
  render()

  /**
   * 初始化场景
   */
  function initScene(){
    // 创建透视相机
    // const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
    const fov = 45;       //fov — 摄像机视锥体垂直视野角度
    const aspect = canvas.width / canvas.height;  // aspect — 摄像机视锥体长宽比
    const near = 1;     // near — 摄像机视锥体近端面
    const far = 10000;      // far — 摄像机视锥体远端面
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(3, 6, - 10);
    camera.lookAt(0, 1, 0);

    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // scene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

    // 坐标轴
    var axes = new THREE.AxesHelper(20);
    scene.add(axes)

    createLight(THREE,scene)// 灯光系统
    createGround(THREE,scene)// 地面

    // 时钟对象
    clock = new THREE.Clock();

    //每当浏览器窗口调整大小时都会调用的回调函数。
    window.addEventListener('resize', ()=>{
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }

  /**
   * 加载模型
   */
  function loadModels(){
    console.info('-- 加载模型')
    // 主角
    let lead =  new Lead()
    lead.load(THREE,scene,models)
  }

  /**
   * 初始化渲染器
   */
  function initRenderer(){
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // 创建控制器
    controls = new OrbitControls(camera, renderer.domElement)
    joystickControls = new JoystickControls(camera,scene,renderer.domElement);

    console.info(THREEx)
    keyboard = new THREEx.KeyboardState(renderer.domElement);
    
  }
  
  // 渲染函数
  function render(){
    canvas.requestAnimationFrame(render);
    // controls.update();
    
    // 获取自上一帧以来所经过的时间 更新动画帧
    var mixerUpdateDelta = clock.getDelta();
    for (const key in models) {
      if (Object.hasOwnProperty.call(models, key)) {
        const model = models[key];
        model.mixer.update(mixerUpdateDelta);
      }
    }

    joystickControls.update((movement) => {
      if (movement) {
        console.info(movement)
    //   //   /**
    //   //    * The values reported back might be too large for your scene.
    //   //    * In that case you will need to control the sensitivity.
    //   //    */
    //   //   const sensitivity = 0.0001;
  
    //   //   /**
    //   //    * Do something with the values, for example changing the position
    //   //    * of the object
    //   //    */
    //   //   this.target.position.x += movement.moveX * sensitivity;
    //   //   this.target.position.y += movement.moveY * sensitivity;
      }
    });

    renderer.render(scene, camera);
  }
  return {
    scene,
    camera,
    renderer,
    models,
    controls 
  }
  
}
/**
 * 创建光系统 
 * @param {*} THREE 
 */
function createLight(THREE,worldScene){
  console.info("-- 创建灯光")
  // 半球灯
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  worldScene.add(hemiLight);
  // 定线光
  var dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(- 3, 10, - 10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 10;
  dirLight.shadow.camera.bottom = - 10;
  dirLight.shadow.camera.left = - 10;
  dirLight.shadow.camera.right = 10;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  worldScene.add(dirLight);
  // 点光源
  // var light1 = new THREE.PointLight()
  // light1.position.set(2.5, 2.5, 2.5)
  // light1.castShadow = true
  // worldScene.add(light1)
  // var light2 = new THREE.PointLight()
  // light2.position.set(-2.5, 2.5, 2.5)
  // light2.castShadow = true
  // worldScene.add(light2)
}

/**
 * 创建地板
 * @param {*} THREE 
 * @returns 
 */
function createGround(THREE,worldScene){
  // console.info("-- 创建地板：网格")
  // const planeSize = 40;
  // const loader = new THREE.TextureLoader();
  // const texture = loader.load('http://static.card.nmgjoin.com/three/textures/checker.png');
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.magFilter = THREE.NearestFilter;
  // const repeats = planeSize / 2;
  // texture.repeat.set(repeats, repeats);
  // // 地板网格
  // const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  // const planeMat = new THREE.MeshPhongMaterial({
  //   map: texture,
  //   side: THREE.DoubleSide,
  // });
  // const mesh = new THREE.Mesh(planeGeo, planeMat);
  // mesh.rotation.x = Math.PI * -.5;

  // console.info("-- 创建地板:灰色")
  // var groundMesh = new THREE.Mesh(
  //     new THREE.PlaneBufferGeometry(40, 40),
  //     new THREE.MeshPhongMaterial({
  //         color: 0x999999,
  //         depthWrite: false
  //     })
  // );
  // groundMesh.rotation.x = - Math.PI / 2;
  // groundMesh.receiveShadow = true;
  // worldScene.add(groundMesh);

  // console.info("-- 创建地板:整图")
  const planeGeometry = new THREE.PlaneGeometry(25, 25)
  const texture = new THREE.TextureLoader().load('http://static.card.nmgjoin.com/three/textures/grid.png')
  const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
  plane.rotateX(-Math.PI / 2)
  plane.receiveShadow = true
  worldScene.add(plane)

}