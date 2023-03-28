import VueRouter from "vue-router";
import LogIn from "../components/LogIn"

export default new VueRouter({
    routes:[
        {
            path:'/login',
            component:LogIn
        }
    ]
})
