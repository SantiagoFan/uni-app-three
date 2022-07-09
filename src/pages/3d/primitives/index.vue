<template>
  <view style="height: 100%; width: 100%;">
    <canvas type="webgl" id="c"></canvas>
</view>
</template>
<script>
import * as THREE from '@/common/three.weapp.js'
import renderPrimitives from './primitives'
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
        console.info(canvas)
        console.info(THREE)
        renderPrimitives(canvas, THREE)
      })
  },
  onUnload: function () {
    THREE.global.clearCanvas()
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
#c {
  width: 100%; 
  height: 100%;
}
</style>
