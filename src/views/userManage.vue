<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别"  prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
              v-model="form.birth"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入职时间" prop="time">
          <el-date-picker
              v-model="form.time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input placeholder="联系方式" v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名字" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-button @click="select" type="primary">查询</el-button>
        <el-button @click="refresh" type="primary">还原</el-button>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe
          height="88%"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="80">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="生日"
            width="160">
        </el-table-column>
        <el-table-column
            prop="time"
            label="入职时间"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="联系方式"
            width="160">
        </el-table-column>
        <el-table-column
            prop="do"
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paper">
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :pageSize=this.pagesize
            @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getUser} from '../api/user';
import {addUser} from '../api/user';
import {updateUser} from '../api/user';
import {deleteUser} from '../api/user';
import {selectUserByPage} from '../api/user'
import Moment from 'moment'
export default {
  name: "userManage",
  data(){
    return {
      dialogVisible:false,
      form:{
        id:'',
        name:'',
        age:'',
        sex:'',
        birth:'',
        time:'',
        phone:'',
        role:''
      },
      pagesize:8,
      rules:{
        name:[
          {required:true,message:'请输入姓名'}
        ],
        age:[
          {required:true,message:'请输入年龄'}
        ],
        sex:[
          {required:true,message:'请选择姓别'}
        ],
        birth:[
          {required:true,message:'请选择生日'}
        ],
        time:[
          {required:true,message:'请选择入职时间'}
        ],
        phone:[
          {required:true,message:'请填写联系方式'}
        ],
      },
      tableData:[],
      totalData:[],
      //编辑和新增弹窗的分别
      modalType:0,
      total:0,
      pageData:{
        pageSize:8,
        pageNum:1
      },
      userForm:{}
    }
  },
  methods:{
    submit(){
      this.$refs.form.validate((valid) => {
        this.form.role = "saleMan"
        if(valid){
          if(this.modalType === 0){
            addUser(this.form).then(()=>{
              this.getList()
            })
          }else{
            if(this.form.sex === 1 || this.form.sex === '男'){
              this.form.sex = 1
            }else if(this.form.sex === 0 || this.form.sex === '女'){
              this.form.sex = 0
            }
            updateUser(this.form).then(()=>{
              this.getList()
            })
          }
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      })
    },
    handleClose(){
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel(){
      this.handleClose()
    },
    handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
    },
    handleUpdate(row){
      this.modalType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.form.role=="saleMan"){
          deleteUser(row.id.toString()).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          })
        }else{
          alert("无法删除自己")
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList(){
      selectUserByPage({pageSize: this.pageData.pageSize, pageNum: this.pageData.pageNum, param: this.userForm}).then((data)=>{
        const userData = data.data.records
        userData.forEach((item,index,userData) =>{
          userData[index].birth=Moment(userData[index].birth).format('YYYY-MM-DD')
          userData[index].time=Moment(userData[index].time).format('YYYY-MM-DD')
          if(userData[index].sex === "1"){
            userData[index].sex = '男'
          }else{
            userData[index].sex = '女'
          }
        })
        this.tableData = userData;
        this.userForm={};
      })
      getUser().then((data)=>{
        const userData = data.data.data
        this.total = userData.length || 0
        console.log(userData)
      });
    },
    handlePage(value){
      this.pageData.pageNum = value;
      console.log(this.pageData.pageNum)
      this.getList();
    },
    select(){
      this.getList();
    },
    refresh(){
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped lang="less">
  .manage{
    height: 90%;
    .manage-header{
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
    .common-table{
      position: relative;
      height: calc(100% - 0%);
      .paper{
        position: absolute;
        bottom:0;
        right: 20px;
      }
    }
  }
</style>
