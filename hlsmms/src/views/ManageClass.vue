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
                        <h3>分类管理</h3>
                    </div>
                    <!-- 内容 -->
                    <div>
                        <template>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column prop="name" label="分类名称">
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                                            <i class="el-icon-edit"></i>编辑</el-button>
                                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                            <i class="el-icon-delete"></i>删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
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
      tableData: [
        {
          name: "食品"
        },
        {
          name: "烟酒"
        },
        {
          name: "烟酒"
        },
        {
          name: "烟酒"
        },
        {
          name: "烟酒"
        },
        {
          name: "!______茅台"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
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
