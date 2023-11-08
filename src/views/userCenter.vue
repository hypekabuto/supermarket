<template>
  <div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
      <el-form :rules="rules" ref="form" :model="passwordForm" label-width="100px" :inline="true">
        <el-form-item label="填写新密码" prop="newPassword">
          <el-input placeholder="请输入新密码" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword2">
          <el-input placeholder="确认密码" v-model="passwordForm.newPassword2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="left">
      <div class="imageArea">
        <img :src="form.headPicture" class="userPhoto">
        <el-upload
            class="upload-demo"
            action="http://localhost:8081/user/updataUserImage"
            :on-preview="handlePreview"
            :limit="1"
            :data={userId}
            :on-change="afterUpload"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            accept="image/*"
            :file-list="fileList">
          <el-button class="uploadButton" size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
    </div>
    <div class="right">
      <div>员工ID：{{this.form.id}}</div>
      <div>姓名：{{this.form.name}}</div>
      <div>性别：{{this.form.sex}}</div>
      <div>年龄：{{this.form.age}}</div>
      <div>电话：{{this.form.phone}}</div>
      <div>生日：{{this.form.birthday}}</div>
      <div>入职时间：{{this.form.time}}</div>
      <div>职位：{{this.form.role}}</div>
      <el-button style="margin-top: 20px" type="primary"  @click="passwordChange">修改密码</el-button>
    </div>

  </div>
</template>

<script>
import {selectUserById,updateUser} from '../api/userCenter'
import Moment from "moment";
export default {
  name: "userCenter",
  data(){
    return {
      form: {
        id:0,
        name:'',
        sex:'',
        age:'',
        phone:'',
        birthday:'',
        time:'',
        role:'',
        imageUrl:'',
        headPicture:"",
      },
      rules:{
        newPassword:[
          {required:true,message:'请输入新密码'}
        ],
        newPassword2:[
          {required:true,message:'请确认新密码'}
        ]
      },
      dialogVisible:false,
      passwordForm:{
        id:'',
        newPassword:'',
        newPassword2:'',
      },
      fileList: [],
      userId:0
    }
  },
  methods:{
    handleClose(){
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    submit(){
      this.passwordForm.id = localStorage.getItem('userId')
      if(this.passwordForm.newPassword===this.passwordForm.newPassword2){
        updateUser({id:this.passwordForm.id,password:this.passwordForm.newPassword}).then((res)=>{
          console.log(res)
        })
        this.dialogVisible = false
      }
    },
    cancel(){
      this.dialogVisible = false
      this.passwordForm.newPassword = ''
      this.passwordForm.newPassword2 = ''
    },
    passwordChange(){
      this.dialogVisible = true;
    },
    afterUpload(){
      selectUserById(this.form.id.toString()).then((res)=>{
        console.log(res.data.data)
        var formList = res.data.data
        this.form.id = formList.id
        this.form.name = formList.name
        if(formList.sex==="1"){
          this.form.sex = "男"
        }else{
          this.form.sex = "女"
        }
        this.form.age = formList.age
        if(formList.role==="saleMan"){
          this.form.role = "销售员"
        }else{
          this.form.role = "管理员"
        }
        formList.time=Moment(formList.time).format('YYYY-MM-DD')
        formList.birthday=Moment(formList.birthday).format('YYYY-MM-DD HH:mm:ss')
        this.form.birthday = formList.birthday
        this.form.time = formList.time
        this.form.phone = formList.phone
        this.form.headPicture = require('@/userImage/' + formList.imageUrl)
      })
      localStorage.setItem("userImage",this.form.headPicture)
      setTimeout(()=>{
        this.$store.dispatch("updateUserImage",this.form.headPicture)
      },500)
    },
    beforeUpload(file){
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["jpg", "png","ico","webp","jpeg"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.message({message: "上传文件只能是 jpg,png格式", type: 'warning'});
        return false;
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
    this.form.id = localStorage.getItem("userId")
    selectUserById(this.form.id.toString()).then((res)=>{
      console.log(res.data.data)
      var formList = res.data.data
      this.form.id = formList.id
      this.form.name = formList.name
      if(formList.sex==="1"){
        this.form.sex = "男"
      }else{
        this.form.sex = "女"
      }
      this.form.age = formList.age
      if(formList.role==="saleMan"){
        this.form.role = "销售员"
      }else{
        this.form.role = "管理员"
      }
      formList.time=Moment(formList.time).format('YYYY-MM-DD')
      formList.birthday=Moment(formList.birthday).format('YYYY-MM-DD HH:mm:ss')
      this.form.birthday = formList.birthday
      this.form.time = formList.time
      this.form.phone = formList.phone
      this.form.headPicture = require('@/userImage/' + formList.imageUrl)
    })
  }
}
</script>

<style scoped>
.imageArea{
  margin-left: 40px;
}
.userPhoto{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 10px;

}
.left{
  height: 490px;
  width: 250px;
  float: left;
}
.right{
  margin-left: 400px;
}
.right div{
  font-size: 20px;
  margin-top: 25px;
}
.upload-demo{
  margin-left: 22%;
  margin-top: 10px;
}
.uploadButton{
  margin-bottom: 10px;
  display:inline-block;
  margin-left:22%;
}
</style>
