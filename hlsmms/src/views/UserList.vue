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
                        <h3>账号管理</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="用户ID">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.userid }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="用户名称">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="用户组">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.usergroup }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="添加时间">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.addDate | foramtData }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="管理">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.row.userid) ">
                                        <i class="el-icon-edit"></i>编辑</el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                                        <i class="el-icon-delete"></i>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-main>

            <!-- 右边footer -->
            <RightBottom></RightBottom>
        </el-container>
        <el-dialog title="修改用户信息" :visible.sync="centerDialogVisible" width="30%" center>

            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="right">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userpwd">
                    <el-input type="text" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="usergroup">
                    <el-select v-model="ruleForm2.usergroup">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import moment from "moment";
// 引入导航组件
import LeftMenu from "../components/LeftMenu";
// 引入头部组件
import RightTop from "../components/RightTop";
// 引入页脚组件
import RightBottom from "../components/RightBottom";
export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      ruleForm2: {
        username: "",
        userpwd: "",
        usergroup: "",
        userid: 0
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
          //   this.$router.push("/");
          // console.log(this)
          // console.log(this.ruleForm2)
          this.axios
            .post(
              "http://127.0.0.1:9090/users/usersave",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              console.log("服务器成功返回的结果", result);
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                    this.centerDialogVisible = false;
                this.axios
                  .get("http://127.0.0.1:9090/users/userlists")
                  .then(result => {
                    this.tableData = result.data;
                  })
                  .catch(err => {
                    console.error(err.message);
                  });
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("错了哦" + err.message);
            });
        } else {
          //   console.log("登陆失败，请重新登陆!!");
          return false;
        }
      });
    },
    handleEdit(userid) {
      //   console.log(index, row);
      this.axios
        .get("http://127.0.0.1:9090/users/userupdate?userid=" + userid)
        .then(result => {
          // console.log("服务器返回的结果",result)
          this.ruleForm2 = result.data[0];
          this.centerDialogVisible = true;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    handleDelete(row) {
      this.axios
        .get("http://127.0.0.1:9090/users/userdel?userid=" + row.userid)
        .then(result => {
          //   console.log("服务器返回的结果",result)
          result = result.data;
          if (result.isOk) {
            this.$message({
              message: result.msg,
              type: "success"
            });
            this.axios
              .get("http://127.0.0.1:9090/users/userlists")
              .then(result => {
                this.tableData = result.data;
              })
              .catch(err => {
                console.error(err.message);
              });
          } else {
            this.$message.error("出错了", result.message);
          }
        })
        .catch(err => {
          this.$message.error("出错了:" + err.message);
        });
    }
  },
  // 注册组件
  components: {
    LeftMenu,
    RightTop,
    RightBottom
  },
  created() {
    this.axios
      .get("http://127.0.0.1:9090/users/userlists")
      .then(result => {
        this.tableData = result.data;
      })
      .catch(err => {
        console.error(err.message);
      });
  },
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY年MM月DD日");
    }
  }
};
</script>
<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */

#box {
  height: 100%;
}
</style>
