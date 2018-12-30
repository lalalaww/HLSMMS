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
              <h3>系统信息</h3>
            </div>
            <!-- 内容 -->
                <div>
                    
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
</style>
