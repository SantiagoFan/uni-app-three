<template>
  <view style="height: 100%; width: 100%;" 
    @touchstart="documentTouchStart" 
    @touchmove="documentTouchMove" 
    @touchend="documentTouchEnd"
  >
    <canvas type="webgl" id="c" 
      @touchstart="touchStart" 
      @touchmove="touchMove"
      @touchend="touchEnd"
      @touchcancel="touchCancel"
      @longtap="longTap" 
      @click="tap"
    ></canvas>
  </view>
</template>
<script>
import * as THREE from '@/common/three.weapp.js'
import gLTF from '@/common/jsm/loaders/GLTFLoader'
let window = THREE.global
let GLTFLoader = gLTF(THREE)
export default {
  data() {
    return {
      canvasId: null
    }
  },
  onLoad(){
    var that = this
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node)
        that.render(canvas, THREE)
      })
  },
  onUnload: function () {
    THREE.global.clearCanvas()
  },
  methods: {
    touchStart(e) {
      console.log('canvas', e)
      THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },
    touchMove(e) {
      console.log('canvas', e)
      THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
      console.log('canvas', e)
      THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
    },
    touchCancel(e) {
      // console.log('canvas', e)
    },
    longTap(e) {
      // console.log('canvas', e)
    },
    tap(e) {
      // console.log('canvas', e)
    },
    documentTouchStart(e) {
      // console.log('document',e)
    },
    documentTouchMove(e) {
      // console.log('document',e)
    },
    documentTouchEnd(e) {
      // console.log('document',e)
    },
    render(canvas) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      // renderer.setSize(canvas.width, canvas.height);
      renderer.gammaOutput = true;

      const fov = 45;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 10, 20);


      const scene = new THREE.Scene();
      scene.background = new THREE.Color('black');


      {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
      }

      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);
        scene.add(light);
        scene.add(light.target);
      }



      {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('https://cdn.liubaiwenhua.com/201812/ctree/resource/model/scene.glb', (gltf) => {
          const root = gltf.scene;
          scene.add(root);
        });
      }



      function render() {

        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
        canvas.requestAnimationFrame(render);
      }

      canvas.requestAnimationFrame(render);
    }
  },
}
</script>

<style lang="scss" scoped>
#c {
  width: 100%; 
  height: 100%;
}
</style>
