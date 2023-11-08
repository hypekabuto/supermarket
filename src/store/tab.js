export default {
    state:{
        isCollapse:false,
        tabsList:[
            {
                path:'/homeView',
                name:'homeView',
                label:'首页',
                icon:'s-home',
                url:'HomeView/homeView'
            }
        ],
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, value) {
            if (value.name !== 'homeView') {
                const index = state.tabsList.findIndex(item => item.name === value.name)
                if (index === -1) {
                    state.tabsList.push(value)
                }
            }
        },
        closeTag(state,item) {
            const index = state.tabsList.findIndex(value => value.name === item.name)
            state.tabsList.splice(index, 1)
        }
    }
}
