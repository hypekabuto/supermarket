<template>
  <div>
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             :router="true"
             text-color="#fff"
             active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? '选项' : '超市订单管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu  v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item-group__title{
  padding-bottom:0px;
}
.el-menu{
  height: 100vh;
  border-right:0px;
  h3{
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>

<script>
import {selectUserById} from '../api/userCenter'
export default {
  data() {
    return {
      role:'',
      menuData:[
        {
          path:'/homeView',
          name:'homeView',
          label:'首页',
          icon:'s-home',
          url:'HomeView/homeView'
        },
        {
          path:'/orderDetail',
          name:'orderDetail',
          label:'订单管理',
          icon:'s-goods',
          url:'OrderDetail/orderDetail'
        },
        {
          path:'/userManage',
          name:'userManage',
          label:'用户管理',
          icon:'s-tools',
          url:'UserManage/userManage'
        },
        {
          label:'其他',
          icon:'location',
          children:[
            {
              path:'/systemMessage',
              name:'systemMessage',
              label:'系统信息',
              url:'Other/systemMessage'
            }
          ]
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //路由跳转事件
    clickMenu(item){
      if(this.$route.path !== item.path && !(this.$route.path === '/homeView' && (item.path === '/'))){
        this.$router.push(item.path)
      }
      this.$store.commit('selectMenu',item)
    }
  },
  computed:{
    noChildren(){
      return this.menuData.filter(item => !item.children)
    },
    hasChildren(){
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
  mounted() {
    selectUserById(localStorage.getItem("userId")).then((res) => {
      this.role = res.data.data.role
      if(this.role=="saleMan"){
        this.menuData.splice(2,1);
      }
    })

  }
}
</script>
