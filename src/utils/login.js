import store from "@/store";

export default{
   checkLogin(){
     return new Promise((resolve,reject)=>{
        if (!store.state.userInfo) {
          store.dispatch("login").then(() => {
            // store.dispatch("checkAuth")
            resolve()
          }).catch(()=>{
          });
        } else {
          // store.dispatch("checkAuth")
          resolve()
        }
     })
   }
}