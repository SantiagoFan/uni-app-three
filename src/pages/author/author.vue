<template>
  <view>
    授权页面
  </view>
</template>
<script>
export default {
  onReady() {
    console.log("进入author页面");

    uni.login({
      provider: "weixin",
      success: function(loginRes) {
        if (loginRes.errMsg == "login:ok") {
          let code = loginRes.code;
          console.log(code);
        }
      },
      fail: function(es) {
        console.log("login,fail");
      },
    });
  },
};
</script>
