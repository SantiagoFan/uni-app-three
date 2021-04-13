<script>

export default {
  onLaunch: function(options) {
    console.log("App Launch");

    // #ifdef MP-ALIPAY
    this.$monitor.init({
      pid: "euqmeczbk1v9ii+a3ewm8g==",
      options: options,
      sample: 1,
      autoReportApi: true,
      autoReportPage: true,
      // Http请求返回数据中状态码字段名称
      code: ["xxx"],
      // Http返回数据中的error message字段名称
      msg: ["xxx"]
    });

    this.$monitor.setCommonInfo({tag: '呼和浩特市蒙医中医医院'});
    // #endif
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
page {
  font-family: Monospaced Number, Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif !important;
}
@import "uview-ui/index.scss";
@import "@/assets/scss/index.scss";
</style>
