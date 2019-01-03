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
                        <h3>商品显示</h3>
                    </div>
                    <!-- 搜索框 -->
                    <div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item>
                                <el-select v-model="formInline.classname" placeholder="----选择分类----">
                                    <el-option label="零食" value="零食"></el-option>
                                    <el-option label="服装" value="服装"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关键字:">
                                <el-input v-model="formInline.keywords" placeholder="商品名称，条形码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="border:1px solid #ccc;height:1px;"></div>
                    <!-- 表单 -->
                    <div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="商品条码">
                                <template slot-scope="scope">
                                    {{ scope.row.barcode }}
                                </template>
                            </el-table-column>

                            <el-table-column label="商品名称">
                                <template slot-scope="scope">
                                    {{ scope.row.goodsname }}
                                </template>
                            </el-table-column>

                            <el-table-column label="所属分类">
                                <template slot-scope="scope">
                                    {{ scope.row.classname }}
                                </template>
                            </el-table-column>

                            <el-table-column label="售价">
                                <template slot-scope="scope">
                                    {{ scope.row.saleprice }}
                                </template>
                            </el-table-column>

                            <el-table-column label="市场价">
                                <template slot-scope="scope">
                                    {{ scope.row.marketprice }}
                                </template>
                            </el-table-column>

                            <el-table-column label="成本价">
                                <template slot-scope="scope">
                                    {{ scope.row.costprice }}
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" width="180">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 分页 -->
                    <div style="margin-top:30px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
                        </el-pagination>
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
      currentPage: 1, //当前在那页，默认值
      pageSize: 5, //每页大小，默认值
      total: 0, //总记录数量

      formInline: {
        keywords: "",
        classname: ""
      },
      tableData: []
    };
  },
  methods: {
    getGoods() {
      this.axios
        .get(
          `http://127.0.0.1:9090/users/getgoods?classname=${
            this.formInline.classname
          }&keywords=${this.formInline.keywords}&pagesize=${
            this.pageSize
          }&currentpage=${this.currentPage}`
        )
        .then(result => {
          this.tableData = result.data.result;
          this.total = result.data.total;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      this.getGoods();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getGoods();
    }
  },
    mounted(){
    console.log("vue的视图挂载完毕!");
  },
  created() {
    this.getGoods();
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

.el-button--primary {
  color: #fff;
  background-color: #6dcb2f;
  border-color: #6dcb2f;
}
</style>
