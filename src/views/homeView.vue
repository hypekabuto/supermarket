<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img :src="userImage">
          <div class="userInfo">
            <p class="name">{{userName}}</p>
            <p class="access">{{ role }}</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登陆时间：<span>{{time}}</span></p>
          <p>上次登陆地点：<span>温州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 413px">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              v-for="(val,key) in tableLable"
              :key="val"
              :prop="key"
              :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="price">￥{{item.completeNum}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 210px;">
        <div ref="echartsOne"   style="height: 210px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 210px">
          <div  ref="echartsTwo" style="height: 210px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getDataTable} from '../api/index';
import {getTodayNum} from "../api/index";
import {getMouthNum} from"../api/index";
import {getNoMouthNum} from "../api/index";
import {getNoTodayNum} from "../api/index";
import * as echarts from 'echarts';
import {getBarEcharts} from "../api/index"
import {getEchartsTwo} from "../api/index";
import {selectUserById} from '../api/userCenter'
import Moment from "moment";

export default {
  name: "homeView",
  data(){
    return {
      completeNum:0,
      tableData:[],
      tableLable:{
        tradeName:'商品',
        todayPrice:'今日销售额',
        mouthPrice:'本月销售额'
      },
      countData:[{},{},{},{}],
      role:'',
      userName:'',
      userImage:"",
      time:''
    }
  },
  mounted() {
    selectUserById(localStorage.getItem("userId")).then((data)=>{
      console.log(data.data.data)
      this.userImage = require('@/userImage/' + data.data.data.imageUrl)
      if(data.data.data.role==="boss"){
        this.role = "管理员"
      }else if(data.data.data.role==="saleMan"){
        this.role = "销售"
      }
      this.userName = data.data.data.name
      this.$store.dispatch("updateUserImage",this.userImage)
      this.time = Moment(data.data.data.time).format('YYYY-MM-DD')

    })
    getDataTable().then((data)=>{
      this.tableData = data.data.data
    })
    getTodayNum().then((data)=>{
      let obj1 = {
        name:'今日支付订单',
        icon:'success',
        completeNum:data.data.data,
        color:"#2ec7c9"
      }
      this.$set(this.countData,0,obj1)
    })
    getMouthNum().then((data)=>{
      let obj1 = {
        completeNum:data.data.data,
        name:'今月支付订单',
        icon:'error',
        color:"#2ec7c9"
      }
      this.$set(this.countData,2,obj1)
    })
    getNoMouthNum().then((data)=>{
      let obj1 = {
        completeNum:data.data.data,
        name:'今月未支付订单',
        icon:'error',
        color:"#ffb980"
      }
      this.$set(this.countData,3,obj1)
    })
    getNoTodayNum().then((data)=>{
      let obj1 = {
        completeNum:data.data.data,
        name:'今日未支付订单',
        icon:'error',
        color:"#ffb980"
      }
      this.$set(this.countData,1,obj1)
    })
    getBarEcharts().then((data)=>{
      const barEchartsMsg = data.data.data
      const barEchartsX = new Array();
      const barEchartsSeries = new Array();
      for(var i=0;i<barEchartsMsg.length;i++){
        barEchartsX[i] = barEchartsMsg[i].typeName
        barEchartsSeries[i] = barEchartsMsg[i].total
      }
      const barEcharts = echarts.init(this.$refs.echartsOne)
      barEcharts.setOption({
        title:{
          text:'本日各品类商品订单'
        },
        yAxis:{},
        xAxis:{
          data:barEchartsX
        },
        series:[
          {
            type:'bar',
            data:barEchartsSeries
          }
        ]
      })
    })
    getEchartsTwo().then((data)=>{
      const echartsTwoMsg = data.data.data;
      var date = new Date();
      const barEchartsTwoSeries = [];
      const barEchartsTwoSeriess = [];
      const barEchartsTwoSeriesss = [];
      let month = date.getMonth() + 1;
      var x = 0;
      var numTotal = 0;
      var num = 0;
      for(x;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month && echartsTwoMsg[x].typeName==='数码'){
          barEchartsTwoSeries.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeries.push(0)
      }
      num = 0;
      numTotal = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month && echartsTwoMsg[x].typeName==='日用品'){
          barEchartsTwoSeries.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeries.push(0)
      }
      numTotal = 0;
      num = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month && echartsTwoMsg[x].typeName==='食品'){
          barEchartsTwoSeries.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeries.push(0)
      }
      numTotal = 0;
      num = 0;
      //////////
      for(x;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-1 && echartsTwoMsg[x].typeName==='数码'){
          barEchartsTwoSeriess.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriess.push(0)
      }
      num = 0;
      numTotal = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-1 && echartsTwoMsg[x].typeName==='日用品'){
          barEchartsTwoSeriess.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriess.push(0)
      }
      numTotal = 0;
      num = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-1 && echartsTwoMsg[x].typeName==='食品'){
          barEchartsTwoSeriess.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriess.push(0)
      }
      numTotal = 0;
      num = 0;
      //////
      for(x;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-2 && echartsTwoMsg[x].typeName==='数码'){
          barEchartsTwoSeriesss.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriesss.push(0)
      }
      num = 0;
      numTotal = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-2 && echartsTwoMsg[x].typeName==='日用品'){
          barEchartsTwoSeriesss.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriesss.push(0)
      }
      numTotal = 0;
      num = 0;
      for(x=0;x<echartsTwoMsg.length;x++){
        if(parseInt(echartsTwoMsg[x].month)==month-2 && echartsTwoMsg[x].typeName==='食品'){
          barEchartsTwoSeriesss.push(echartsTwoMsg[x].total);
          num = num + 1;
          break;
        }else if(parseInt(echartsTwoMsg[x].month)==month){
          numTotal = numTotal + 1
        }
      }
      if(numTotal != 0 && num === 0){
        barEchartsTwoSeriesss.push(0)
      }
      numTotal = 0;
      num = 0;
      const barEchartsTwo = echarts.init(this.$refs.echartsTwo)
      barEchartsTwo.setOption({
        title:{
          text:'近三个月各类商品销售额'
        },
        legend:{
          textStyle:{
            color:'#333'
          }
        },
        xAxis:{
          data:['数码','日用品','食品']
        },
        yAxis:{},
        series:[
          {
            type:'bar',
            name:month + '月',
            data:barEchartsTwoSeries
          },
          {
            type:'bar',
            name:month-1 + '月',
            data:barEchartsTwoSeriess
          },
          {
            type:'bar',
            name:month-2 + '月',
            data:barEchartsTwoSeriesss
          }
        ]
      })
    })
  }
}
</script>

<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    width: 72px;
    height: 72px;
    margin-right: 40px;
    border-radius: 50%;
  }
  .userInfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 40px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      color:#999;
      font-size: 14px;
      text-align: center;
    }
  }
  .el-card{
    width: 47%;
    margin-bottom: 20px;
    //margin-left: 20px;
  }
}
.loginInfo{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}
.graph{
  margin-top: 20px;
  .el-card{
    width: 100%;
    height: 220px;
  }
}

</style>
