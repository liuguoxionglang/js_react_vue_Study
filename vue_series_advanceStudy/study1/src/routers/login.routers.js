
export default {
    path: '/index',
    name:'index',
    // webpackchunkName:index打包成块 ，当访问时，加载此块 
    component: ()=>import('../components/index.vue'),  
    children:[]

}