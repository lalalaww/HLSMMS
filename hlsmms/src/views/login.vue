<template>
    <div id="box">
        <el-card class="box-card">
            <div slot="header" class="clearfix loginText">
                <span>用户登陆</span>
                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <div>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userpwd">
                        <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        userpwd: ""
      },
      rules2: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "用户名长度在 6到 18位", trigger: "blur" }
        ],
        userpwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
             this.axios.defaults.withCredentials=true;
          this.axios
            .post(
              "http://127.0.0.1:9090/users/checklogin",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              // console.log(result)
              if (result.data.isOk) {
                this.$message({
                  message: "恭喜你，" + result.data.msg,
                  type: "success"
                });
                this.$router.push("/");
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              this.message.error("错了哦" + err.message);
            });
        } else {
          console.log("登陆失败，请重新登陆!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 300px;
}
.el-card {
  background: rgba(25, 8, 8, 0.5) !important;
  color: white !important;
  border: 0 !important;
}
.el-form-item__label {
  color: white !important;
}
#box {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login_banner2.jpg");
  color: white;
}
.loginText {
  text-align: center;
  font-size: 20px;
}
</style>