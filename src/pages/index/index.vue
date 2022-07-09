<template>
  <view>
    <view>uni-app 测试</view>
    <button type="primary" size="default" plain="true"  @click="tap" data-id="scene">
        场景
    </button>
    <button type="primary" size="default" plain="true"  @click="tap" data-id="primitives">
        基本
    </button>
    <button type="primary" size="default" plain="true"  @click="tap" data-id="cube">
        OrbitControl 立方
    </button>
    <button type="primary" size="default" plain="true"  @click="tap" data-id="trackcontrol">
        TrackballControls 跟踪控制
    </button>
    
    <button type="primary" size="default" plain="true" @click="tap" data-id="gltf">
        gLTF 文件
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="animation2">
        动画2 
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="ngltf">
        New gLTF 文件
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="glb">
        glb 文件
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="obj">
        OBJ 文件
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="animation">
        动画
    </button>
    <button type="primary" size="default" plain="true" @click="tap" data-id="raycaster">
        raycaster  光线
    </button>  
  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    tap(e) {
      let path = e.target.dataset.id
      wx.navigateTo({
        url: `/pages/3d/${path}/index`
      })
    }
  },
}
</script>

<style lang="scss" scoped>
button {
  margin: 10px;
  display: inline-block;
  width: 300rpx;
}
</style>
