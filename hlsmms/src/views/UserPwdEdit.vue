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
              <h3>修改账号密码</h3>
            </div>
            <!-- 内容 -->
                <div>
                      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm"  label-position="top">    
                        <el-form-item label="原密码" prop="password">
                            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpassword">
                            <el-input type="password" v-model="ruleForm2.newpassword" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpasswords">
                            <el-input type="password" v-model="ruleForm2.newpasswords" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
    var validatePass= (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm2.newpassword) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
    };
    return {
      ruleForm2: {
        password: "",
        newpassword: "",
        newpasswords:""
      },
      rules2: {
        password: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        newpassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "新密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        newpasswords: [
          { required: true, validator: validatePass, trigger: "blur" }
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

/* 修改表单元素的默认宽度100% */
.el-input{
    width: 30%;
}
</style>
