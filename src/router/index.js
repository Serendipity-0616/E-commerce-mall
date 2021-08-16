import Vue from 'vue'
import Vuerouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(Vuerouter)

//2.创建router
const routes =[
  {
    path:'/',
    //redirect重定向
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    //元数据(描述数据的数据)
    meta:{
      title:'首页'
    },
  },
  {
    path:'/category',
    component:Category,
    meta:{
      title:'关于'
    },
  },
  {
    path:'/cart',
    component:Cart,
    meta:{
      title:'用户'
    },
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      title:'档案'
    },
  },
  {
    path:'/detail',
    component:Detail,
  },

]

const router = new Vuerouter({
  routes,
  mode:'history'
})

//3.导出
export default router
