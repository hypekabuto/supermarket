import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from "@/router";
import store from  "./store"
import Cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

router.beforeEach((to,from,next)=>{
  const token = Cookie.get('token')
  if(!token && to.path !== '/login'){
    next({path:'/login'})
  }else if(token && to.path === '/login'){
    next({path:'/homeView'})
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  el:'#app',
  render: h => h(App)
})
