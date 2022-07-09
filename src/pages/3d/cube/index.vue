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
import { OrbitControls } from '@/common/jsm/controls/OrbitControls'

export default {
  data() {
    return {
      canvasId: null
    }
  },
  onLoad(){
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
         let canvasId = res[0].node._canvasId
        const canvas = new THREE.global.registerCanvas(res[0].node)
        console.info(canvas)
        console.info(THREE)
        this.canvasId = canvasId

        const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
        camera.position.z = 500;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
      
        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.25;
        // controls.enableZoom = false;
        camera.position.set(200, 200, 500);
        controls.update();
        const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
      
        const texture = new THREE.TextureLoader().load('http://www.nmgjoin.com/lj-god/images/2019-03-30/Original2019033014420678142.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
      
        // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      
        // renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
        // renderer.setSize(canvas.width, canvas.height);
      
        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.width, canvas.height);
        }
        function render() {
          canvas.requestAnimationFrame(render);
          // mesh.rotation.x += 0.005;
          // mesh.rotation.y += 0.01;
          controls.update();
          renderer.render(scene, camera);
        }

        render()
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
  },
}
</script>

<style lang="scss" scoped>
#c {
  width: 100%; 
  height: 100%;
}
</style>
