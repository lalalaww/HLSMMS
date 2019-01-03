<template>
    <el-container id="box">
        <!--  左侧边栏 -->
        <LeftMenu></LeftMenu>
        <el-container id="mainContent">
            <!-- 右边hedaer -->
            <RightTop></RightTop>
            <!-- 右边中间内容 -->
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h3>添加商品</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
                            <el-form-item>
                                <el-select v-model="ruleForm2.classname" placeholder="----选择分类----">
                                    <el-option label="零食" value="零食"></el-option>
                                    <el-option label="服装" value="服装"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品条形码" prop="barcode">
                                <el-input v-model="ruleForm2.barcode"></el-input>
                                <el-button type="success" @click="createBarcode()">生成条码</el-button>
                            </el-form-item>
                            <el-form-item label="商品名称:" prop="goodsname">
                                <el-input type="text" v-model="ruleForm2.goodsname"></el-input>
                            </el-form-item>
                            <el-form-item label="商品进价：" prop="costprice">
                                <el-input type="text" v-model="ruleForm2.costprice" @blur="updatePrice()"></el-input>
                            </el-form-item>
                            <el-form-item label="商品售价:" prop="saleprice">
                                <el-input type="text" v-model="ruleForm2.saleprice"></el-input>
                            </el-form-item>
                            <el-form-item label="市场价:" prop="marketprice">
                                <el-input type="text" v-model="ruleForm2.marketprice"></el-input>
                                <p style="color:#ccc;">默认市场价为售价的1.2倍</p>
                            </el-form-item>
                            <el-form-item label="入库数量：" prop="stocknum">
                                <el-input type="text" v-model="ruleForm2.stocknum"></el-input>
                                <p style="color:#ccc;">计重商品单位k千克</p>
                            </el-form-item>
                            <el-form-item label="商品重量" prop="weight">
                                <el-input type="text" v-model="ruleForm2.weight"></el-input>
                            </el-form-item>
                            <el-form-item label="商品单位：" prop="unit">
                                <el-input type="text" v-model="ruleForm2.unit"></el-input>
                            </el-form-item>
                            <el-form-item label="会员优惠：" prop="isdiscount">
                                <el-radio-group v-model="ruleForm2.isdiscount">
                                    <el-radio label="1" value="1">享受</el-radio>
                                    <el-radio label="0" value="0">不享受</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否促销" prop="ispromotion">
                                <el-radio-group v-model="ruleForm2.ispromotion">
                                    <el-radio label="1" value="1">启用</el-radio>
                                    <el-radio label="0" value="0">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="商品简介" prop="details">
                                <el-input type="textarea" rows="5" v-model="ruleForm2.details"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-main>
            <!-- 右边footer -->
            <RightBottom></RightBottom>
        </el-container>
    </el-container>
</template>

<script>
// 引入导航组件
import LeftMenu from "../components/LeftMenu";
// 引入头部组件
import RightTop from "../components/RightTop";
// 引入页脚组件
import RightBottom from "../components/RightBottom";
export default {
  // 注册组件
  components: {
    LeftMenu,
    RightTop,
    RightBottom
  },
  data() {
    return {
      ruleForm2: {
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: 0,
        marketprice: 0,
        costprice: 0,
        stocknum: 0,
        weight: "",
        unit: "",
        isdiscount: "1",
        ispromotion: "0",
        details: ""
      },
      rules2: {
        classname: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        barcode: [{ required: true, message: "请输入条码", trigger: "blur" }],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        costprice: [
          { required: true, message: "商品进货价必须输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:9090/goods/add",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              console.log("后端返回的结果", result);
              if (result.data.isOk) {
                this.$message({
                  message: "恭喜你，" + result.data.msg,
                  type: "success"
                });
                this.$confirm(result.data.msg + ", 是否继续添加?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.ruleForm2 = {
                      classname: "",
                      barcode: "",
                      goodsname: "",
                      saleprice: 0,
                      marketprice: 0,
                      costprice: 0,
                      stocknum: 0,
                      weight: "",
                      unit: "",
                      isdiscount: "1",
                      ispromotion: "0",
                      details: ""
                    };
                  })
                  .catch(() => {
                    //取消执行的操作
                    this.$router.push("/goodslist");
                  });
              } else {
                this.$message.error("错了哦，" + result.data.msg);
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createBarcode() {
      this.ruleForm2.barcode = new Date().getTime(); //根据客户的需求生成
    },
    updatePrice() {
      this.ruleForm2.marketprice = this.ruleForm2.costprice * 5;
      this.ruleForm2.saleprice = this.ruleForm2.marketprice * 0.9;
    }
  }
};
</script>
<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */

#box {
  height: 100%;
}
/* 修改表单元素的默认宽度100% */
.el-input {
  width: 25%;
}
.el-radio {
  line-height: 3;
}
</style>
