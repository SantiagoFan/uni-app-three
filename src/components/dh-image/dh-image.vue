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
    inHis: {
      type: Boolean,
      default: false,
    },
    allowEmpty:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    src(val) {
      if (this.inHis) {
        this.imageSrc = basepath + '/his' + this.src
      } else {
        this.imageSrc = this.src
      }
    },
  },
  data() {
    return {
      imageSrc: '',
    }
  },
  methods: {
    error(e) {
      console.log('errorimage_event',e);
      this.imageSrc = basepath + '/static/wx/' + this.errorSrc
      console.log('errorImage', this.imageSrc)
      this.$emit('error', e)
    },
    load(e) {
      this.$emit('load', e)
    },
  },
  created() {
    let src = this.src
    if (this.inHis && src) {
      src = basepath + '/his' + this.src
    }
    this.imageSrc = src || (this.allowEmpty?'':'error')
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
