import getGLTFLoader from '@/common/jsm/loaders/GLTFLoader'
import getSkeletonUtils from '@/common/jsm/utils/SkeletonUtils.js';
/**
 * 主角模型相关
 */

class Lead {
  constructor() {
    this.name= "Soldier";//士兵模型
    this.fileName='models/gltf/Soldier.glb';
    this.animationName='Idle';// 默认动作
    this.meshName= "vanguard_Mesh"; // Name of the main mesh to animate
    this.position= { x: 0, y: 0, z: 0 }; // 放置位置
    this.scale= 2; // 单位缩放. 1.0  原始尺寸; 0.1 缩小十倍
    this.animations=null;
    this.scene=null;
    this.mixer=null;
    this.actions=null;      // 所有可执行的动作
    this.activeAction=null; // 当前激活的动作
  }
  /**
   * 加载模型
   */
  load(THREE,worldScene,models){
    let GLTFLoader = getGLTFLoader(THREE);
    
    var loader = new GLTFLoader();

    loader.load("http://static.card.nmgjoin.com/three/" + this.fileName, (gltf)=> {
      this.animations = gltf.animations;
      this.scene = gltf.scene;
      // 启动阴影
      gltf.scene.traverse( (object)=> {
        if (object.isMesh) {
          object.castShadow = true;
        }
      });
      console.log("-- -- 模型下载完成：", this.name);
      // 实例化
      this.initModel(THREE,worldScene);
      models[this.name] = this
    });
  }
  /**
   * 初始化模型
   */
  initModel(THREE,worldScene){
    let { SkeletonUtils } = getSkeletonUtils(THREE);

    console.info(`-- -- 模型:${this.name} 初始化开始`)
    var clonedScene = SkeletonUtils.clone(this.scene);
    // 克隆正确，添加模型动画
    var clonedMesh = clonedScene.getObjectByName(this.meshName);
    if (clonedMesh) {
      this.createAnimation(THREE, clonedMesh);
    }
    worldScene.add(clonedScene);


    if (this.position) {
      clonedScene.position.set(this.position.x, this.position.y, this.position.z);
    }
    if (this.scale) {
      clonedScene.scale.set(this.scale, this.scale, this.scale);
    }
    if (this.rotation) {
      clonedScene.rotation.x = this.rotation.x;
      clonedScene.rotation.y = this.rotation.y;
      clonedScene.rotation.z = this.rotation.z;
    }
    this.fadeToAction("Idle",0)
  }
  /**
   * 初始化对象的动画
   */
  createAnimation(THREE,skinnedMesh) {
    var mixer = new THREE.AnimationMixer(skinnedMesh);
    var actions = {}
    // 这个模型的所有动画集合
    for (let i = 0; i < this.animations.length; i++) {
      const clip = this.animations[i];
      const action = mixer.clipAction(clip);
      actions[ clip.name ] = action
    }

    this.actions = actions
    this.mixer = mixer
  }
  /**
   * 切换动作
   * @param {*} name 
   * @param {*} duration 
   */
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

export { Lead }