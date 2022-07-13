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
    >
    </canvas>
    <!-- 控制器 -->
    <view class="control">
      <button @click="run">跑</button>
      <button @click="walk">走</button>
    </view>
  </view>
</template>
<script>
import * as THREE from '@/common/three.weapp.js'
import scene from './scene'
let worldScene = null
export default {
  data() {
    return {
    }
  },
  onLoad(){
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node)
        worldScene = scene(canvas)
      })

  },
  onUnload: function () {
    THREE.global.clearCanvas()
  },
  methods: {
    
    touchStart(e) {
      // console.log('canvas', e)
      THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },
    touchMove(e) {
      // console.log('canvas', e)
      THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
      // console.log('canvas', e)
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
    run(){
      let key = 'Run'
      worldScene.models['Soldier'].fadeToAction(key,1)
    },
    walk(){
      let key ='Walk'
      worldScene.models['Soldier'].fadeToAction(key,1)
    }
  },
}
</script>

<style lang="scss" scoped>
#c {
  width: 100%; 
  height: 100%;
}
.control{
  position: absolute;
  bottom: 30upx;
  width: 100%;
  height: 100upx;
}
#joystick{
   position: absolute;
  top:170rpx;
  background: #000;
  color:#fff;
}
</style>
