<template>
  <image :src="imageSrc" :mode="mode" @error="error" @load="load"></image>
</template>

<script>
import { basepath } from '@/config/index.js'
export default {
  name: 'dhImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    errorSrc: {
      type: String,
      default: 'defaultmin.png',
    },
    mode: {
      type: String,
      default: 'aspectFill',
    },
  },
  watch: {
    src(val) {
      this.imageSrc = this.src
    },
  },
  data() {
    return {
      imageSrc: '',
    }
  },
  methods: {
    error(e) {
      this.imageSrc = basepath + '/static/wx/' + this.errorSrc
      this.$emit('error', e)
    },
    load(e) {
      this.$emit('load', e)
    },
  },
  created() {
    this.imageSrc = this.src
  },
}
</script>

<style lang="scss" scoped>
image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
