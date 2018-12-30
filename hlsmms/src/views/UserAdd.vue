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
                        <h3>添加管理员账号</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
                            <el-form-item label="用户名" prop="username">
                                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="passcheck">
                                <el-input type="password" v-model="ruleForm2.passcheck" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户组" prop="usergroup">
                                <el-select v-model="ruleForm2.usergroup">
                                    <el-option label="超级管理员" value="超级管理员"></el-option>
                                    <el-option label="普通管理员" value="普通管理员"></el-option>
                                </el-select>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        username: "",
        pass: "",
        passcheck: "",
        usergroup: ""
      },
      rules2: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "用户名长度在 6到 18位", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        passcheck: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/");
        } else {
          console.log("登陆失败，请重新登陆!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */

#box {
  height: 100%;
}

.el-button--primary {
  background-color: #5ab62d;
  border: 1px solid #5ab62d;
}
/* 修改表单元素的默认宽度100% */
.el-input{
    width: 30%;
}
</style>
