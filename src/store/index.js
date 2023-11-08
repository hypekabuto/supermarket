import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import userImage from "@/store/userImage";
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        userImage
    }
})
