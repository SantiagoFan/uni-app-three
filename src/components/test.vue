<template>
  <view>
    <view @click="handleChild">点击test</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        val: '',
        msg: '我是test子组件的数据'
      }
    },
    methods: {
      emitEvent(e) {
        console.log('e==', e)
        this.val = e
      },
      handleChild() {
        this.$bus.$emit('foo', this.msg)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>