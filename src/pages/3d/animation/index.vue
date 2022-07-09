<template>
  <view style="height: 100%; width: 100%;">
    <canvas type="webgl" id="c" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @touchcancel="touchCancel" @longtap="longTap" @click="tap"></canvas>
  </view>
</template>
<script>
import * as THREE from '@/common/three.weapp.js'
import animate from './animate'
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
        animate(canvas, THREE)
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
