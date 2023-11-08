<template>
  <div id="backGround">
    <div id="logo">十足订单信息管理系统</div>
    <div id="login">
      <el-card class="box-card">
        <el-form id="form" :rules="rules">
          <el-form-item style="margin-top: 20px" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"  placeholder="请输入密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-button style="margin-top: 10px" type="primary" class="button" @click="submit">登陆</el-button>
        </el-form>
      </el-card>
    </div>
    <div id="clock">
      <div id="time">{{timee}}</div>
      <div id="date">{{form.time}}</div>
    </div>
    <div id="copyright">Copyright © 人民当家作组.All Rights Reserved.</div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {login} from"../api/login";
export default {
  name: "logIn",
  data(){
    return{
      form:{
        phone:'',
        password:'',
        time:''
      },
      rules:{
        phone:[{
          required:true,trigger:'blur',message:'请输入手机号'
        }],
        password:[{
          required:true,trigger:'blur',message:'请输入密码'
        }],
      },
      timee:''
    }
  },
  methods:{
    updateclock(){
      var date = new Date();
      var year = date.getFullYear();
      if(year < 10){year='0'+year}
      var mon = date.getMonth();
      if(mon < 10){mon='0'+mon}
      var day = date.getDate();
      if(day < 10){day='0'+day}
      var hour = date.getHours();
      if(hour < 10){hour='0'+hour}
      var minute = date.getMinutes()
      if(minute < 10){minute='0'+minute}
      this.timee = hour + ':' + minute;
      this.form.time = year + '-' + mon + '-' + day
    },
    submit(){
      login(this.form).then((res)=>{
        if(res.data==='手机号或密码错误'){
          this.$message.error(res.data)
        }else{
          var token = res.data.split(",");
          localStorage.setItem("userId",token[3])
          Cookie.set('token',token[0]);
          this.$router.push('/homeView')
        }
      })
    }
  },
  mounted() {
    this.$nextTick(()=>{
      setInterval(this.updateclock,100)
    })
  }
}
</script>

<style scoped>
  #backGround{
    position: fixed;
    height: 100%;
    width: 100%;
    top:0;
    left:0;
    background-image: linear-gradient(90deg,cyan,purple);
    background-size:400%;
    animation: myanimation 10s infinite;
  }
  #logo{
    color: white;
    font-size: 25px;
    font-weight: 800;
    text-transform: uppercase;
    position: absolute;
    top: 15%;
    left:15%
  }
  #login{
    position: absolute;
    top:26%;
    left:38%;
  }
  .el-card{
    width: 373px;
    height: 250px;
    background-color: rgba(255,255,255,0.4);
    border-radius: 15px;
  }
  #form{
    line-height: 60px;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }
  #clock{
    text-align: left;
    color: white;
    position: absolute;
    top:60%;
    left:15%;
  }
  #time{
    font-size: 100px;
  }
  #date{
    font-size: 35px;
    margin-left: 15px;
  }
  #copyright{
    color: white;
    position: absolute;
    top:95%;
    left: 38%;
  }
  @keyframes myanimation {
    0%{
      background-position: 0% 50%;
    }
    50%{
      background-position: 100% 50%;
    }
    100%{
      background-position: 0% 50%;
    }
  }
</style>
