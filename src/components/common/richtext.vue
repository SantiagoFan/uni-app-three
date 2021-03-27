<template>
  <view>
    <!-- #ifdef MP-ALIPAY -->
    <rich-text :class="className" :nodes="changeText(content)"></rich-text>
    <!-- #endif -->
    <!-- #ifndef MP-ALIPAY -->
    <view :class="className" v-html="content"> </view>
    <!-- #endif -->
  </view>
</template>
<script>
// #ifdef MP-ALIPAY
import HTMLParser from "@/utils/html-parser.js";
// #endif
export default {
  props: {
    className: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  methods: {
    // #ifdef MP-ALIPAY
    changeText(html) {
      /**
       * 处理富文本里的图片宽度自适应
       * 1.去掉img标签里的style、width、height属性
       * 2.img标签添加style属性：max-width:100%;height:auto
       * 3.修改所有style里的width属性为max-width:100%
       * 4.去掉<br/>标签
       * @param html
       * @returns {void|string|*}
       */
      if (html != "" && html != undefined && html != null) {
        let newContent = html.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            match = match
              .replace(/style="[^"]+"/gi, "")
              .replace(/style='[^']+'/gi, "");
            match = match
              .replace(/width="[^"]+"/gi, "")
              .replace(/width='[^']+'/gi, "");
            match = match
              .replace(/height="[^"]+"/gi, "")
              .replace(/height='[^']+'/gi, "");
            return match;
          }
        );
        newContent = newContent.replace(
          /style="[^"]+"/gi,
          function (match, capture) {
            match = match
              .replace(/width:[^;]+;/gi, "max-width:100%;")
              .replace(/width:[^;]+;/gi, "max-width:100%;");
            return match;
          }
        );
        newContent = newContent.replace(/<br[^>]*\/>/gi, "");
        newContent = newContent.replace(
          /\<img/gi,
          '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'
        );
        //将 HTML String转化为 nodes 数组
        const content = new HTMLParser(newContent.replace()?.trim());
        return content;
      } else {
        return html;
      }
    },
    // #endif
  },
};
</script>