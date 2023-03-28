import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
//引入VueRouter
import VueRouter from "vue-router";
Vue.config.productionTip = false

//使用VueRouter插件
Vue.use(VueRouter)
new Vue({
  el:'#app',
  render: h => h(App),
  router
})
