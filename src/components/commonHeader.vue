<template>
  <div class="headerContainer">
    <div class="leftContent">
      <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="rightContent">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="userPhoto" :src="imageUrl"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookie from "js-cookie";
export default {
  data(){
    return {
    }
  },
  mounted(){
    this.imageUrl = localStorage.getItem("userImage")
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
      if(command === 'logout'){
        Cookie.remove('token')
        localStorage.removeItem("role")
        localStorage.clear()
        this.$router.push('/login')
      }else if(command === 'userCenter'){
        this.$router.push('/userCenter')
      }
    },
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    }),
    ...mapState({
      imageUrl: state => state.userImage.userImage
    })
  }
}
</script>

<style lang="less" scoped>
  .headerContainer{
    padding: 0 20px;
    background-color: #333;
    height:60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text{
    color:#fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .userPhoto{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .leftContent{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color: #666;
        }
        &.is-link:hover{
          color: white;
        }
      }
    }
  }
</style>
