export default {
    path: '/login',
    name:'login',
    // webpackchunkName:index打包成块 ，当访问时，加载此块 
    component: ()=>import('../components/login.vue'),  
    children:[]

}