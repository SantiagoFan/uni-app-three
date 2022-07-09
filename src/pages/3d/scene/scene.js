import { OrbitControls } from '@/common/jsm/controls/OrbitControls'
import getGLTFLoader from '@/common/jsm/loaders/GLTFLoader'
import getSkeletonUtils from '@/common/jsm/utils/SkeletonUtils.js';
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
function loadModels(THREE,worldScene,mixers){
  console.info('-- 加载模型')
  let GLTFLoader = getGLTFLoader(THREE);
  let { SkeletonUtils } = getSkeletonUtils(THREE);
  let window = THREE.global;

  var loader = new GLTFLoader();
  var modelName = "models/gltf/Soldier.glb"; //士兵模型
  var model = { name: "Soldier" }
  
  // 在这里，我们定义了要放置在场景中的模型实例、它们的位置、比例和动画
  var UNITS = [
    {
        modelName: "Soldier", // 使用网络文件 models/gltf/Soldier.glb
        meshName: "vanguard_Mesh", // Name of the main mesh to animate
        position: { x: 0, y: 0, z: 0 }, // 放置位置
        scale: 2, // 单位缩放. 1.0  原始尺寸, 0.1 缩小十倍
        animationName: "Idle" // 动画名称
    },
    {
        modelName: "Soldier",
        meshName: "vanguard_Mesh",
        position: { x: 0, y: 0, z: 1 },
        scale: 2,
        animationName: "Walk"
    },
    {
        modelName: "Soldier",
        meshName: "vanguard_Mesh",
        position: { x: 0, y: 0, z: 2 },
        scale: 2,
        animationName: "Run"
    }
  ];
  // 实例化
  var instantiateUnits = ()=>{
    console.info('-- -- 人物模型 初始化开始')
    for (var i = 0; i < UNITS.length; ++i) {
      var u = UNITS[i];
      console.info(u)
      var clonedScene = SkeletonUtils.clone(model.scene);

      // 克隆正确，添加模型动画
      var clonedMesh = clonedScene.getObjectByName(u.meshName);
      if (clonedMesh) {
          var mixer = startAnimation(THREE, clonedMesh, model.animations, u.animationName);
          // // Save the animation mixer in the list, will need it in the animation loop
          mixers.push(mixer);
      }
      // Different models can have different configurations of armatures and meshes. Therefore,
      // We can't set position, scale or rotation to individual mesh objects. Instead we set
      // it to the whole cloned scene and then add the whole scene to the game world
      // Note: this may have weird effects if you have lights or other items in the GLTF file's scene!
      // 不同型号可以有不同配置的电枢和网格。因此,
      // 我们不能对单个网格对象设置位置、缩放或旋转。相反,我们组
      // 将其添加到整个克隆场景中，然后将整个场景添加到游戏世界中
      // 注意:这可能会有奇怪的效果，如果你有灯光或其他项目在GLTF文件的场景!
      worldScene.add(clonedScene);
      if (u.position) {
          clonedScene.position.set(u.position.x, u.position.y, u.position.z);
      }
      if (u.scale) {
          clonedScene.scale.set(u.scale, u.scale, u.scale);
      }
      if (u.rotation) {
          clonedScene.rotation.x = u.rotation.x;
          clonedScene.rotation.y = u.rotation.y;
          clonedScene.rotation.z = u.rotation.z;
      }

    }
  }



  loader.load("http://static.card.nmgjoin.com/three/" + modelName, (gltf)=> {
    var scene = gltf.scene;
    model.animations = gltf.animations;
    model.scene = scene;

    // 启动阴影
    gltf.scene.traverse( (object)=> {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    console.log("-- -- 模型下载完成：", model.name);
    // 实例化
    instantiateUnits();
  });
}

/**
     * Start animation for a specific mesh object. Find the animation by name in the 3D model's animation array
     * @param skinnedMesh {THREE.SkinnedMesh} The mesh to animate
     * @param animations {Array} Array containing all the animations for this model
     * @param animationName {string} Name of the animation to launch
     * @return {THREE.AnimationMixer} Mixer to be used in the render loop
     */
 function startAnimation(THREE,skinnedMesh, animations, animationName) {

  var mixer = new THREE.AnimationMixer(skinnedMesh);
  var clip = THREE.AnimationClip.findByName(animations, animationName);
  if (clip) {
      var action = mixer.clipAction(clip);
      action.play();
  }
  return mixer;
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
  var mixers = []; // 场景中所有有动画的THREE.AnimationMixer 对象
  var controls = null
  //////////////////////////////


  //////////////////////////////
  // The main setup happens here
  // 核心启动
  //////////////////////////////
  initScene()
  loadModels(THREE,scene,mixers) //// 加载人物
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
    for (var i = 0; i < mixers.length; ++i) {
      mixers[i].update(mixerUpdateDelta);
    }

    renderer.render(scene, camera);
  }
  
  
}