import Vue from 'vue'
import Router from 'vue-router'

//import MainLayout come here
import MainLayout from '@/layouts/MainLayout.vue' 
import Home from '@/components/main/home/Home.vue'
import Introduce from '@/components/main/introduce/Introduce.vue'
//import LoginLayout come here
import LoginLayout from '@/layouts/LoginLayout.vue'
import Login from '@/components/login/Login.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '',
      component: MainLayout,
      children: [{
        path: '',
        name: 'Home',
        component: Home,
        meta: { title: 'Trang chủ' }
      },
      {
        path: '/trang-chu',
        name: 'Home',
        component: Home,
        meta: { title: 'Trang chủ' }
      },
      {
        path: '/gioi-thieu',
        name: 'Introduce',
        component: Introduce,
        meta: { title: 'Giới thiệu' }
      },
      ,]
    },
    {
      path: '',
      component: LoginLayout,
      children: [{
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { title: 'Đăng nhập' }
      }]
    },
  ],
  mode: "history",
  base: process.env.BASE_URL,  
})
