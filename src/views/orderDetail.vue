<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="商品名称" prop="tradename">
          <el-input placeholder="请输入商品名" v-model="form.tradename"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="typeName">
          <el-input placeholder="请输入商品种类" v-model="form.typeName"></el-input>
        </el-form-item>
        <el-form-item label="是否支付"  prop="paymentstatus">
          <el-select v-model="form.paymentstatus" placeholder="请选择">
            <el-option label="已支付" :value="true"></el-option>
            <el-option label="未支付" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input placeholder="请输入商品价格" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="time">
          <el-date-picker
              v-model="form.time"
              type="datetime"
              value-format="yyyy-MM-DD HH:mm:ss"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form :inline="true" :model="goodsOrderForm">
        <el-form-item>
          <el-input placeholder="请输入商品名" v-model="goodsOrderForm.tradename"></el-input>
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
            prop="orderid"
            label="订单id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tradename"
            label="商品名称"
            width="130">
        </el-table-column>
        <el-table-column
            prop="typeName"
            label="商品种类"
            width="110">
        </el-table-column>
        <el-table-column
            prop="price"
            label="商品价格"
            width="110">
        </el-table-column>
        <el-table-column
            prop="paymentstatus"
            label="是否支付"
            width="150">
        </el-table-column>
        <el-table-column
            prop="time"
            label="订单时间"
            width="220">
        </el-table-column>
        <el-table-column
            prop="do"
            label="操作"
            width="160">
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
import {getGoodsOrder} from '../api/order';
import {addGoodsOrder} from '../api/order';
import {updateGoodsOrder} from '../api/order';
import {deleteGoodsOrder} from '../api/order';
import {selectGoodsOrderByPage} from '../api/order'
import Moment from 'moment'
export default {
  name: "orderDetail",
  data(){
    return {
      dialogVisible:false,
      pagesize:8,
      form:{
        orderid:'',
        tradename:'',
        typeName:'',
        price:'',
        paymentstatus:'',
        time:'',
      },
      rules:{
        tradename:[
          {required:true,message:'请输入商品名'}
        ],
        typeName:[
          {required:true,message:'请输入商品种类'}
        ],
        price:[
          {required:true,message:'请输入价格'}
        ],
        paymentstatus:[
          {required:true,message:'请选择支付情况'}
        ],
        time:[
          {required:true,message:'请选择订单时间'}
        ]
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
      goodsOrderForm:{}
    }
  },
  methods:{
    submit(){
      this.$refs.form.validate((valid) => {
        console.log(this.form)
        if(valid){
          if(this.modalType === 0){
            addGoodsOrder(this.form).then(()=>{
              this.getList()
              this.$refs.form.resetFields();
            })
          }else{
            if(this.form.paymentstatus === true || this.form.paymentstatus === '已支付'){
              this.form.paymentstatus = true
            }else if(this.form.paymentstatus === false || this.form.paymentstatus === '未支付'){
              this.form.paymentstatus = false
            }
            updateGoodsOrder(this.form).then(()=>{
              this.getList()
              this.$refs.form.resetFields();
            })
          }
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsOrder(row.orderid.toString()).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList(){
      selectGoodsOrderByPage({pageSize: this.pageData.pageSize, pageNum: this.pageData.pageNum, param: this.goodsOrderForm}).then((data)=>{
        const goodsOrderData = data.data.records
        goodsOrderData.forEach((item,index,goodsOrderData) =>{
          goodsOrderData[index].time=Moment(goodsOrderData[index].time).format('YYYY-MM-DD HH:mm:ss')
          if(goodsOrderData[index].paymentstatus === true){
            goodsOrderData[index].paymentstatus = '已支付'
          }else{
            goodsOrderData[index].paymentstatus = '未支付'
          }
        })
        this.tableData = goodsOrderData;
        this.goodsOrderForm={};
      })
      getGoodsOrder().then((data)=>{
        const orderData = data.data.data
        this.total = orderData.length || 0
      });
    },
    handlePage(value){
      this.pageData.pageNum = value;
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
