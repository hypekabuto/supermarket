<template>
  <el-row>
    <el-col>
      <el-card class="time">
        <div>系统时间：{{nowTime}}</div>
      </el-card>
      <div>
        <el-card class="down">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,index) in this.imgList" :key="index">
              <el-image
                  style="width:100%; height:100%"
                  :src="item"
                  fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </div>
      <el-card class="left">
        <div>系统名称：超市订单管理系统</div>
        <div>开发小组：人民当家做组</div>
        <div>小组成员：茅家熠、郏会、周晨锋、宋梓麒</div>
        <div>推荐配置：</div>
        <div style="margin-left: 32px">win10及以上</div>
        <div style="margin-left: 32px">内存不小于8g</div>
      </el-card>
      <el-card class="right">
        <div>系统使用范围：中小型超市订单管理</div>
        <div>系统说明：本系统提供了简单的数据图形化分析，可供管理者依据</div>
        <div>订单情况进行营业策略的更改</div>
        <div>系统使用说明：</div>
        <div style="margin-left: 32px">本系统由管理员以及销售员两种账号</div>
        <div style="margin-left: 32px">管理员拥有所有权限而销售员只拥有订单相关权限</div>
      </el-card>
    </el-col>

  </el-row>

</template>

<script>
export default {
  name: "systemMessage",
  data() {
    return {
      timer: undefined,
      nowTime: new Date(),
      latedata:"2020-1-9",
      imgList:[
        "https://img0.baidu.com/it/u=2340834513,3492227273&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        "https://photo.16pic.com/00/69/44/16pic_6944060_b.jpg",
        "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=1%3A6%E6%95%B0%E7%A0%81%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=7&spn=0&di=7214885350303334401&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3578033472%2C1894856126&os=3300634537%2C4176722655&simid=3348090431%2C194688835&adpicid=0&lpn=0&ln=1712&fr=&fmq=1686556848509_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fphoto.16pic.com%2F00%2F65%2F64%2F16pic_6564603_b.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mrtv_z%26e3Bv54AzdH3FrtvAzdH3Frtv_mcm9man_z%26e3Bip4s&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDYsMiwxLDQsNSw3LDgsOQ%3D%3D",
        "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=1000%3A200%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=288&spn=0&di=7214885350366248961&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=383098346%2C410166869&os=3238546071%2C408563819&simid=383098346%2C410166869&adpicid=0&lpn=0&ln=1767&fr=&fmq=1686556642693_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=15&oriquery=&objurl=https%3A%2F%2F2c.zol-img.com.cn%2Fproduct%2F154%2F860%2Fce9MSnpmACaPI.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F1jpwts_z%26e3Bz5s_z%26e3Bv54_z%26e3BvgAzdH3Frtvp76j_tg1jx_8ccaAzdH3Ftg1jx8c9ldbma_z%26e3Bfip4s&gsm=10e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDYsNCwxLDUsMiw3LDgsOQ%3D%3D"
      ]
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.nowTime= new Date().toLocaleString();
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  methods: {
    FormatTime() {
      var date = new Date();
      var year = this.formatTime(date.getFullYear());
      var month = this.formatTime(date.getMonth() + 1);
      var day = this.formatTime(date.getDate());
      var hour = this.formatTime(date.getHours());
      var minute = this.formatTime(date.getMinutes());
      var second = this.formatTime(date.getSeconds());
      var weekday = date.getDay();
      var weeks = new Array(
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
      );
      var week = weeks[weekday];
      return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`;
    },
    formatTime(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    },
  }
}
</script>

<style scoped>
.time {
  width: 100%;
  text-align: center;
}
.left{
  width: 48%;
  margin-top: 20px;
  float: left;
  margin-right: 28px;
}
.left div{
  margin-top: 8px;
}
.right{
  width:49%;
  margin-top: 20px;
  float: left;
}
.right div{
  margin-top: 8px;
}
.down{
  margin-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
