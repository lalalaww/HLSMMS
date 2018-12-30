import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/useradd',
      //添加用户
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserAdd.vue')
    },
    {
      path:'/userlist',
      //管理用户
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "UserList" */ './views/UserList.vue')
    },
    {
      path:'/userpwdedit',
      //修改密码
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "userPwdEit" */ './views/UserPwdEdit.vue')
    },
    {
      path:'/manageadd',
      //添加管理
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "ManageAdd" */ './views/ManageAdd.vue')
    }
    ,
    {
      path:'/manageclass',
      //分类管理
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "ManageClass" */ './views/ManageClass.vue')
    }
    ,
    {
      path:'/accountadd',
      //分类管理
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "ManageClass" */ './views/AccountAdd.vue')
    }
  ]
})
