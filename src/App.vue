<script>

export default {
  onLaunch: function(options) {
    console.log("App Launch");
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
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

}
@import "uview-ui/index.scss";
@import "@/assets/style/index.scss";
</style>
