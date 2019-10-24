# vue-router api强化学习之
## vue路由 默认路由跳转
> 路由路径的配置routes=[],vueRouter实例化，vue对象上挂载路由，组件中添加路由出口<router-view></router-view>;路由的跳转使用<router-link/>
## 动态路由 get 传值
> 动态路由：参数路由{path:'/pathxx/:params'}   js中使用this.$route.params获取 template中直接使用$route.params.x获取
> get传值：<router-link :to="'/pathxx?xx='+param" /> 使用this.$route.query获取
> 具名路由 <router-link :to="{path:'xxx',name:'xx'}" />
## vue路由编程式导航 通过js方法跳转路由 使用this.$router.push(),可用路径或者路由名字跳转 ;router.beforeach()
## 命名视图 <router-view name="a">
## 路由的重定向 routes = [{path:'/',redirect:'xx'},{path:'xx',component:'compaxx'}]
## 路由的history和hash模式
## 嵌套路由
## 过渡  路由 
```javascript
    <transtition> 
        // 缓存
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
    </transtition>
```

## vue ui库  移动端mintui库，pc端的elementui库

## 单文件组件
> .vue文件 template script style
> webpack 的loader加载器加载解析

