<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <commonAside></commonAside>
      </el-aside>
      <el-container>
        <el-header>
          <commonHeader></commonHeader>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commonAside from "@/components/commonAside";
import commonHeader from "@/components/commonHeader";
import commonTag from "@/components/commonTag";
export default {
  name: "mainIndex",
  data(){
    return {}
  },
  components:{
    commonAside,
    commonHeader,
    commonTag
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>
