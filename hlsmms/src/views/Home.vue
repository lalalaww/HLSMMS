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
                <el-alert
                  title="商品总数：5。已经销售的总金额:890.00。库存商品总价:1235.82"
                  type="info"
                  show-icon>
                </el-alert>

                 <el-alert
                  title="导入数据"
                  type="info"
                  show-icon>
                </el-alert>

                <el-row :gutter="40">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                          <el-card class="box-card">
                              <div slot="header" class="clearfix tables">
                                <h4>销售排行</h4>
                              </div>
                              <div>
                                <el-table
                                    :data="tableData"
                                    stripe
                                    style="width: 100%">
                                    <el-table-column
                                      prop="pricename"
                                      label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                      prop="pricenum"
                                      label="销量">
                                    </el-table-column>
                                  </el-table>
                              </div>
                          </el-card>
                      </div>
                    </el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">
                              <el-card class="box-card">
                              <div slot="header" class="clearfix tables">
                                <h4>缺货的商品</h4>
                              </div>
                              <div>
                                <el-table
                                    :data="tablepric"
                                    stripe
                                    style="width: 100%">
                                    <el-table-column
                                      prop="pricename"
                                      label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                      prop="pricenum"
                                      label="库存">
                                    </el-table-column>
                                    <el-table-column
                                      prop="op"
                                      label="操作">
                                    </el-table-column>
                                  </el-table>
                              </div>
                          </el-card>
                      
                      </div></el-col>
               </el-row>
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
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 },
        { pricename: "商品1", pricenum: 50 }
      ],
      tablepric: [
        { pricename: "商品1", pricenum: 50, op: "入库" },
        { pricename: "商品1", pricenum: 50, op: "入库" }
      ]
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
</style>
