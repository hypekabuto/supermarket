import Vue from 'vue'
import logIn from "@/views/logIn";
import VueRouter from "vue-router";
import homeView from "@/views/homeView";
import userManage from "@/views/userManage";
import mainIndex from "@/views/mainIndex";
import orderDetail from "@/views/orderDetail"
import systemMessage from "@/views/systemMessage";
import userCenter from "@/views/userCenter"
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        //主路由
        {
            path:'/',
            component:mainIndex,
            redirect:'/homeView',
            //嵌套路由
            children:[
                {path:'homeView',name:'homeView',component:homeView},
                {path:'userManage',name:'userManage',component:userManage},
                {path:'orderDetail',name:'orderDetail',component:orderDetail},
                {path:'systemMessage',name:'systemMessage',component:systemMessage},
                {path:'userCenter',name:'userCenter',component:userCenter}
            ]
        },
        {
            path:'/login',
            component:logIn
        }
    ]
})
