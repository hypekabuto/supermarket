<template>
  <div class="all" :style="{'background-image': `url(${require('@/assets/images/1.jpeg')})`}">
    <img style="float: left;position: absolute;width: 100px;height: 100px;" id="rY" src="~@/assets/images/shopCar.png">
    <div class="big-big" >
      <div class="big-cont">
        <div class="big-right">
          <p class="big-p">超市账单管理系统</p>
          <p style="height: 34px;"></p>
          <form method="post" action="?act=1" id="form" name="form">
            <p style="height: 25px;"></p>
            <p class="p-text">
              <input type="text" name="siteID" id="siteID" value="" placeholder="请输入账号"/>
            </p>
            <p style="height: 13px;"></p>
            <p class="p-text">
              <input type="text" name="phone" id="phone" value="" placeholder="请输入邮箱"/>
            </p>
            <p style="height: 13px;"></p>
            <div class="form-div">
              <p class="p-text1" >
                <input type="text" name="password" id="password" value="" placeholder="请输入验证码"/>
              </p>
              <p><input class="button1" id="btn" type="button" value="获取验证码" onclick="sendcode(this)"/></p>
            </div>
            <p style="height: 30px;"></p>
            <input type="hidden" name="vercode" id="vercode"  value=""/>
            <button  class="button2" onclick="checkout()">
              <a href="./大作业.html" style="text-decoration:none;">登录</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data(){
    return{

    }
  }
}
</script>

<style scoped>
@keyframes turnY{
  0%{transform:rotateY(0deg);}
  100%{transform:rotateY(360deg);}
}
#rY{
  animation-name:turnY;
  animation-duration:3s;
  animation-iteration-count:infinite;}

/*放置背景图*/
.all{
  background-repeat:no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
}
.big-big{
  width: 100%;
  height:100%;
  text-align: center;
}
.big-cont{
  width: 100%;
  max-width: 1100px;
  text-align: center;
  height:440px;
  position: relative;
  padding: 10% 0;
}

.big-right{
  width: 100%;
  height: 440px;
  float: right;
}
.big-p{
  color: #D3D3D3;
  font-size: 34px;
  letter-spacing: 15px;
  font-family:PingFang-SC-Bold;
  line-height: 50px;
}
form{
  width:524px;
  height: 317px;
  background-color: #F0FFFF;
  background-repeat:no-repeat ;
  background-size: 100% 100%;
}
form p{
  width: 420px;
}
input{
  padding-left:20px;
  height: 50px;
  line-height:49px;
  border: none;
  outline: none;
  font-size: 16px;
}
form p span{
  padding-left: 20px;
}
.p-text{
  width: 420px;
  height: 50px;
  background-color: white;
  text-align: left;
  border-radius: 8px;
}
.p-text1{
  width:260px;
  height:50px;
  background-color: white;
  float: left;
  text-align: left;
  border-radius: 8px;
  margin-right: 20px;
}
.form-div{
  width: 420px;
}
button{
  border: none;
  outline: none;
}
.button1{
  font-family: Adobe Heiti Std;font-weight: normal;color: #6B6969;width:135px;height:50px;background: #E4E1E1;padding: 0;}
.button1:hover{
  background: greenyellow;
  cursor:pointer/*出现小手*/
}
.button2{
  width:415px;
  height: 57px;
  background: #359DFF;
  font-size: 18px;
  font-family: SourceHanSansSC;
  font-weight: 400;
  color: #FFFFFF;
  border-radius: 8px;
}
.button2:hover{
  background: greenyellow;
  cursor:pointer/*出现小手*/
}
</style>
