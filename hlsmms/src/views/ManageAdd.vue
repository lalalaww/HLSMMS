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
                        <h3>添加管理</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
                            <el-form-item label="所属分类" prop="group">
                                <el-select v-model="ruleForm2.group">
                                    <el-option label="----顶级分类----" value="顶级分类"></el-option>
                                    <el-option label="----中级分类----" value="中级分类"></el-option>
                                    <el-option label="----低级分类----" value="低级分类"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分类名称" prop="groupname">
                                <el-input type="text" v-model="ruleForm2.groupname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="状态" prop="state" class="state">
                                <el-radio v-model="radio" label="1">启用</el-radio>
                                <el-radio v-model="radio" label="2">禁用</el-radio>
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
  data() {
    return {
      radio: "1",
      ruleForm2: {
        group: "",
        groupname: ""
      },
      rules2: {
        groupname: [
          { required: true, message: "分类名不能为空", trigger: "blur" },
          { min: 4, max: 12, message: "分类名长度在 4到 12位", trigger: "blur" }
        ],
        group: [{ required: true, trigger: "change", message: "请选择用户组" }]
      }
    };
  },
  // 注册组件
  components: {
    LeftMenu,
    RightTop,
    RightBottom
  }
};
</script>
<style scoped>
/* scoped 作用域限定样式只在当前组件生效 */

#box {
  height: 100%;
}
.state {
  margin-top: 20px;
}
.el-button--primary {
  background-color: #5ab62d;
}
/* 修改表单元素的默认宽度100% */
.el-input {
  width: 30%;
}
</style>
