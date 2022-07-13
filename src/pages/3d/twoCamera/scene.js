import * as THREE from '@/common/three.weapp.js'
import { OrbitControls } from '@/common/jsm/controls/OrbitControls'
import { JoystickControls } from './joystick';
import { Lead } from "./lead"

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
  let camera = null;
  let scene = null;
  let cameraOrtho = null;
  let sceneOrtho = null;
  let renderer = null;
  let controls = null;
  let joystickControls = null;
  var models = {}
  var clock = null;
	let spriteTL;

  //////////////////////////////
  // 核心启动
  //////////////////////////////
  initScene();
  loadModels();
  initRenderer();
  animate();
  /**
   * 初始化场景
   */
  function initScene() {

    const width = canvas.width;
    const height = canvas.height;
    // 创建透视相机
    const fov = 45;       //fov — 摄像机视锥体垂直视野角度
    const aspect = width / height;  // aspect — 摄像机视锥体长宽比
    const near = 1;     // near — 摄像机视锥体近端面
    const far = 2100;      // far — 摄像机视锥体远端面
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set(3, 6, - 10);
    camera.lookAt(0, 1, 0);

    const left = -width/ 2 ; // 摄像机视锥体左侧面
    const right = width /2 ; // 摄像机视锥体右侧面
    const top = height / 2 ; // 摄像机视锥体上侧面
    const bottom = -height /2; // 摄像机视锥体下侧面
    const o_near = 1; // 摄像机视锥体近端面
    const o_far = 10; // 摄像机视锥体远端面
    cameraOrtho = new THREE.OrthographicCamera( left, right, top, bottom, o_near, o_far );
    cameraOrtho.position.z = 10;

    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x666666);
    // scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );

    //正交场景
    sceneOrtho = new THREE.Scene();

    // 坐标轴
    var axes = new THREE.AxesHelper(20);
    scene.add(axes)

    createGround(THREE,scene)// 地面
    createLight(THREE,scene)// 灯光系统
        
    // 时钟对象
    clock = new THREE.Clock();

    // 创建hub 信息
    createHUB()

    //每当浏览器窗口调整大小时都会调用的回调函数。
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize(){

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height; // 摄像机横纵比
    camera.updateProjectionMatrix();

    cameraOrtho.left = - width / 2;
    cameraOrtho.right = width / 2;
    cameraOrtho.top = height / 2;
    cameraOrtho.bottom = - height / 2;
    cameraOrtho.updateProjectionMatrix();

    renderer.setSize(width,height);
  }
    /**
     * 创建
     */
    function createHUB(){
      const textureLoader = new THREE.TextureLoader();
      function updateHUDSprites() {
        console.info('updateHUDSprites')

				const width = window.innerWidth / 2;
				const height = window.innerHeight / 2;

				spriteTL.position.set( - width, height, 1 ); // top left
			}
      textureLoader.load( 'http://static.card.nmgjoin.com/three/textures/redball.png', (texture)=>{
        const material = new THREE.SpriteMaterial( { map: texture } );

				const width = material.map.image.width;
				const height = material.map.image.height;

				spriteTL = new THREE.Sprite( material );
				spriteTL.center.set( 0.0, 1.0 );
				spriteTL.scale.set( width, height, 1 );
				sceneOrtho.add( spriteTL );

				updateHUDSprites();
      });

      window.addEventListener( 'resize', updateHUDSprites );
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
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false; // ！！容许在二维精灵层 sprited sphere上绘制

      // 创建控制器
    controls = new OrbitControls(camera, renderer.domElement)
    // joystickControls = new JoystickControls(cameraOrtho,sceneOrtho,renderer.domElement);
    
  }
  
  function animate() {
    canvas.requestAnimationFrame( animate );
    render();
  }
  /**
   * 循环渲染
   */
  function render() {
    // 获取自上一帧以来所经过的时间 更新动画帧
    var mixerUpdateDelta = clock.getDelta();
    for (const key in models) {
      if (Object.hasOwnProperty.call(models, key)) {
        const model = models[key];
        model.mixer.update(mixerUpdateDelta);
      }
    }
    renderer.clear();
    renderer.render( scene, camera );
    renderer.clearDepth();
    renderer.render( sceneOrtho, cameraOrtho );
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

  console.info("-- 创建地板:整图")
  const planeGeometry = new THREE.PlaneGeometry(300, 300)
  const texture = new THREE.TextureLoader().load('http://static.card.nmgjoin.com/three/textures/grid.png')
  const groundMesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
  groundMesh.rotateX(-Math.PI / 2)
  groundMesh.receiveShadow = true

  worldScene.add(groundMesh)
}