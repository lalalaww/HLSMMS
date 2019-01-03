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
                        <h3>添加编辑账号</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="真实姓名:" prop="username">
                                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="会员卡卡号" prop="card">
                                <el-input type="text" v-model="ruleForm2.card" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户组" prop="vip">
                                <el-select v-model="ruleForm2.vip">
                                    <el-option label="普通会员-99%" value="普通会员"></el-option>
                                    <el-option label="中级会员-50%" value="中级会员"></el-option>
                                    <el-option label="高级会员-10%" value="高级会员"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="vipId">
                                <el-input type="text" v-model="ruleForm2.vipId" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户状态" prop="resource">
                                <el-radio-group v-model="ruleForm2.resource">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="phone">
                                <el-input type="text" v-model="ruleForm2.phone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="座机号码" prop="tel">
                                <el-input type="text" v-model="ruleForm2.tel" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱地址" prop="email">
                                <el-input type="text" v-model="ruleForm2.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                    
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <!-- 二级联动 -->
                            <el-form-item label="详细地址" prop="deAddress">
                                <el-input type="text" v-model="ruleForm2.deAddress" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="区镇编码" prop="diCode">
                                <el-input type="text" v-model="ruleForm2.diCode" autocomplete="off"></el-input>
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
    var email = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      ruleForm2: {
        username: "",
        card: "",
        vip: "",
        vipId: "",
        resource: "",
        phone: "",
        tel: "",
        email: "",
        deAddress: "",
        diCode: ""
      },
      rules2: {
        username: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
          { min: 2, max: 6, message: "真实姓名长度在2到6", trigger: "blur" }
        ],
        card: [
          { required: true, message: "会员卡号不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "会员卡号长度在 6到 12位",
            trigger: "blur"
          }
        ],
        vip: [{ required: true, trigger: "blur" }],
        vipId: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "会员卡号长度在18位",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号长度在11位",
            trigger: "blur"
          }
        ],
        tel: [
          { required: true, message: "座机号不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "座机号长度在6到12位",
            trigger: "blur"
          }
        ],
        email: [{ validator: email, trigger: "blur", required: true }],
        deAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
        resource: [
           { required: true, trigger: "change", message: "请选择用户组" }
        ],
        diCode: [
          { required: true, message: "区镇编码", trigger: "blur" },
        ],
      }
    };
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
