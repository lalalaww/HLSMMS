  <template>
    <el-aside width="230px">
        <!-- 左侧顶部的标题 -->
        <div id="leftTitle">
            <h1>华联超市管理系统</h1>
            <div class="mt50b30">
                <p>
                    <span class="cl888">您好,</span>
                    <span>admin</span>
                </p>
                <p>
                    <router-link to="/">管理首页</router-link>
                    |
                    <a href="#" @click="loginOut()">退出系统</a>
                </p>
            </div>
        </div>

        <el-row class="tac">
            <el-col>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>分类管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/manageclass">
                                <router-link to="/manageclass">分类管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="/manageadd">
                                <router-link to="/manageadd">添加分类</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/goodslist">
                                <router-link to='/goodslist'>商品管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="/goodsadd">
                                <router-link to='/goodsadd'>添加商品</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <span>进货管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">进货管理</el-menu-item>
                            <el-menu-item index="3-2">库存管理</el-menu-item>
                            <el-menu-item index="3-3">添加库存</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                            <span>出货管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">销售列表</el-menu-item>
                            <el-menu-item index="4-2">商品出库</el-menu-item>
                            <el-menu-item index="4-3">商品退货</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                            <span>统计管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/salesStatistics">
                                <router-link to='/salesStatistics'>销售统计</router-link>
                            </el-menu-item>
                            <el-menu-item index="/incoStatistics">
                                <router-link to="/incoStatistics">进货统计</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <span>账号管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/userlist">
                                <router-link to='/userlist'>账号管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="/useradd">
                                <router-link to='/useradd'>添加账号</router-link>
                            </el-menu-item>
                            <el-menu-item index="/userpwdedit">
                                <router-link to='/userpwdedit'>密码修改</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="7">
                        <template slot="title">
                            <span>会员管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="7-1">账号管理</el-menu-item>
                            <el-menu-item index="/accountadd">
                                <router-link to="/accountadd">添加账号</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="8">
                        <template slot="title">
                            <span>系统管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="8-1">系统信息</el-menu-item>
                            <el-menu-item index="8-2">系统配置</el-menu-item>
                            <el-menu-item index="8-3">权限管理</el-menu-item>
                            <el-menu-item index="8-4">添加管理组</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>
  
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut() {
      this.axios
        .get("http://127.0.0.1:9090/users/loginOut")
        .then(result => {
          if (result.data.isOk) {
            this.$message({
              message: "退出成功！欢迎下次登陆！",
              type: "success"
            });
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
