// import modules from "./modules";  暂时不用配置，读取的pages.json

import Vue from "vue";
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from "uni-simple-router";
import login from "@/utils/login";

Vue.use(Router);
//初始化
const router = new Router({
  routes: ROUTES, //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log("from", from);
  console.log("to", to);
  
  login.checkLogin().then(res=>{
    next()
  })
});

// 全局路由后置守卫
router.afterEach((to, from) => {});

export default router;
