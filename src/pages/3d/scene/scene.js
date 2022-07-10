import { OrbitControls } from '@/common/jsm/controls/OrbitControls'
import getGLTFLoader from '@/common/jsm/loaders/GLTFLoader'
import getSkeletonUtils from '@/common/jsm/utils/SkeletonUtils.js';

/**
 * 创建地板
 * @param {*} THREE 
 * @returns 
 */
function createGround(THREE,worldScene){
  console.info("-- 创建地板")
  // 纹理
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
  console.info("-- 创建地板")
    var groundMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(40, 40),
        new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false
        })
    );

    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    worldScene.add(groundMesh);
}

/**
 * 加载模型
 */
function loadModels(THREE,worldScene,models){
  console.info('-- 加载模型')
  let GLTFLoader = getGLTFLoader(THREE);
  let { SkeletonUtils } = getSkeletonUtils(THREE);
  
  let window = THREE.global;

  var loader = new GLTFLoader();
  
  var model = { 
    name: "Soldier",//士兵模型
    fileName:'models/gltf/Soldier.glb',
    animationName:'Idle',// 默认动作
    meshName: "vanguard_Mesh", // Name of the main mesh to animate
    position: { x: 0, y: 0, z: 0 }, // 放置位置
    scale: 2, // 单位缩放. 1.0  原始尺寸, 0.1 缩小十倍
    animations:null,
    scene:null,
    mixer:null,
    actions:null,
    activeAction:null,
    fadeToAction(name,duration){
      console.info('----- fadeToAction : '+name)
      let preAction = this.activeAction
      this.activeAction =  this.actions[name];

      if(preAction == null ){
        this.activeAction.play()
      } else{
        if(preAction !== this.activeAction){
          preAction.fadeOut(duration)
          this.activeAction
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(duration)
          .play()
        }
      }
      
    }
 }

  loader.load("http://static.card.nmgjoin.com/three/" + model.fileName, (gltf)=> {
    model.animations = gltf.animations;
    model.scene = gltf.scene;
    // 启动阴影
    gltf.scene.traverse( (object)=> {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    console.log("-- -- 模型下载完成：", model.name);
    // 实例化
    // instantiateUnits();
    initModel(THREE,worldScene,SkeletonUtils,model);
    models[model.name] = model
  });
}
/**
 * 初始化模型
 * @param {object} model 
 */
function initModel(THREE,worldScene,SkeletonUtils,model){
  console.info(model)
  console.info(`-- -- 模型:${model.name} 初始化开始`)
  var clonedScene = SkeletonUtils.clone(model.scene);
  // 克隆正确，添加模型动画
  var clonedMesh = clonedScene.getObjectByName(model.meshName);
  if (clonedMesh) {
      var [mixer,actions] = startAnimation(THREE, clonedMesh, model.animations);
      model.actions = actions
      model.mixer = mixer
  }
  worldScene.add(clonedScene);
  if (model.position) {
    clonedScene.position.set(model.position.x, model.position.y, model.position.z);
  }
  if (model.scale) {
    clonedScene.scale.set(model.scale, model.scale, model.scale);
  }
  if (model.rotation) {
    clonedScene.rotation.x = model.rotation.x;
    clonedScene.rotation.y = model.rotation.y;
    clonedScene.rotation.z = model.rotation.z;
  }
  model.fadeToAction("Idle",0)
}
/**
 * 启动特定的对象的动画，在三围模型数组中按照名称查找动画
 * @param skinnedMesh {THREE.SkinnedMesh} 要设置动画的 mesh 对象
 * @param animations {Array} 这个模型的所有动画集合
 * @param animationName {string} 要启动的动画名称
 * @return {THREE.AnimationMixer}  要在循化渲染中使用的混合器
 */
 function startAnimation(THREE,skinnedMesh, animations) {

  var mixer = new THREE.AnimationMixer(skinnedMesh);
  var actions = {}
  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[ clip.name ] = action
  }
  return [mixer,actions];
}


/**
 * 场景渲染函数
 * @param {*} canvas 
 * @param {*} THREE 
 */
export default function (canvas, THREE) {
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
  //////////////////////////////


  //////////////////////////////
  // The main setup happens here
  // 核心启动
  //////////////////////////////
  initScene()
  loadModels(THREE,scene,models) //// 加载人物
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
      scene.background = new THREE.Color(0xa0a0a0);
      scene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

      // 坐标轴
      var axes = new THREE.AxisHelper(20);
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
      
    }
  
  

  // 渲染函数
  function render(){
    canvas.requestAnimationFrame(render);
    controls.update();
    
    // 获取自上一帧以来所经过的时间 更新动画帧
    var mixerUpdateDelta = clock.getDelta();
    for (const key in models) {
      if (Object.hasOwnProperty.call(models, key)) {
        const model = models[key];
        model.mixer.update(mixerUpdateDelta);
      }
    }

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
}