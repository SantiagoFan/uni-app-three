<template>
  <view>
    {{val}}
    <view @click="handleChild">点击test1</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        val: '',
        msg: '我是子组件的数据'
      }
    },
    mounted () {
      this.$bus.$on('foo', (msg) => {
        this.val = msg
        console.log('test数据', msg)
      })
    },
    methods: {
      emitEvent(e) {
        console.log('e==', e)
        this.val = e
      },
      handleChild() {
        this.$emit('event', this.msg)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>