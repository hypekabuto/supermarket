export default {
    state:{
        userImage:''
    },
    mutations: {
        UpdateUserImage(state,value){
            state.userImage = value
        }
    },
    actions:{
        updateUserImage(context,value){
            context.commit("UpdateUserImage",value)
        }
    }
}
