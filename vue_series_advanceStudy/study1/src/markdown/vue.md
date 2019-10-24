# vue api强化学习之-------

## 全局配置
- silent
- optionMergeStrategies
- devtools
- errorHandler
- warnHandler
- ignoredElements
- keyCodes
- performance
- productionTip
## 指令
- vue api指令
  - v-text | v-html
  > 文本渲染 
  - v-if/v-else/v-else-if | v-show
  > 条件渲染
  - v-on/@
  > 事件绑定  参数 和修改器 @keydowm.enter  ,事件对象中e.srcElement获取dom节点
  - v-for
  > 列表循环
  - v-bind/:
  > 绑定标签属性，动态class及style常用此方式 
  - v-model
  > 表单数据双向绑定
  - v-slot/v-pre/v-once/v-cloak  
- 自定义指令
  - 局部指令  组件中使用 directives:{} 
  - 全局指令:跟组件中注入即可，new Vue({directives:{}}); Vue.directive()
## 特殊属性
- is 
> 长用于构建动态组件
- slot
- scope
- ref
- key 
- slot-scope 


## 生命周期函数
- beforeCreate
- created
- beforeMounte
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
## 组件之间通信
- 父组件传递数据到子组件
  - 通过props
  > 父组件中动态绑定属性，子组件中通过props接受即可 
- 子组件传递信息到父组件
  - this.$emit('eventType',prams)
  >  
  - 通过ref属性，
  > 定义子组件时定义ref属性，父组件中通过this.$refs.xx获取子组件的数据和方法，子组件中可以使用this.$parent.xx获取父组件的数据和方法 
- 非父子组件传值
  - 借助一个空的vue实例
  >  建立一个空的vue实例记作vm，vm.$emit('name')方法在一个组件中广播，在另一个组件中使用空vm.$on('name')监听广播即可，通常在mounted声明周期函数中监听广播
- 插槽
> 父组件 的templte html标签入子组件，使用插槽<slot></slot> 默认插槽，具名插槽 需用使用标签的slot属性传递
- 默认插槽
- 具名插槽   
## 实例的属性
- vm.$refs
- vm.$parent
- vm.$data
- vm.$props
- vm.$el
- vm.$options
- vm.$slots
- vm.$children
- vm.$.root
- vm.$listeners
- vm.$attrs
- vm.$scopedSlots
- vm.$isServer
## 实例方法---数据
- vm.$watch
- vm.$set
- vm.$delete
## 实例方法---事件
- vm.$on
- vm.$emit
- vm.$off
- vm.$once
## 实例方法---生命周期
- vm.$mount
- vm.forceUpdate
- vm.nextTick 
- vm.destroy
 
## 内置组件
- <component/> 
- <router-view/> 
- <keep-alive></keep-alive>
- <transition/>
## 全局api
- Vue.use
> 注册使用插件 注册是给内个vue实例插入插件对象 
- Vue.component
- Vue.directive
- Vue.filter
- Vue.set
- Vue.mixin
- Vue.extend
- Vue.nextTick
- Vue.delete
- Vue.compile
- Vue.version
- Vue.observable
## vue选项（除去声明周期函数）
- 数据
  - data
  > 组件中中data数据被vue实例直接代理了 
  - props
  - propsData
  - computed计算属性选项
  - methods
  - watch选项 监听属性变化
- DOM
  - el
  - template
  - render
  - renderError
- 资源
  - directives
  - components
  - filters
- 组合
  - mixins
  - extends
  - parent
  - provid/inject
- 其他   
  - name
  - delimiters
  - functional
  - model
  - inheritAttrs
  - comments
## 过渡
> <transition>标签 v-show v-if 动态组件
> css过渡  enter---leave两个阶段 类名v-enter v-enter-active  v-leave v-leave-active
> js过渡 钩子函数 
```javascript
// 组件中监听事件，并写好监听到的回调函数即可
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
// 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。

// 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
```
## vue ui库
## 列表数据同步更新，数组列表 使用push，pop等方法更新数据时，自动刷新，但filter contact slice, 或者数组列表中的某一项是，列表不会刷新，后面情况，可以使用Vue.set(list,index,content)













# vue-router
## vue路由 默认路由跳转
> 路由路径的配置routes=[],vueRouter实例化，vue对象上挂载路由，组件中添加路由出口<router-view></router-view>;路由的跳转使用<router-link/>
## 动态路由 get 传值
> 动态路由：参数路由{path:'/pathxx/:params'}   js中使用this.$route.params获取 template中直接使用$route.params.x获取
> get传值：<router-link :to="'/pathxx?xx='+param" /> 使用this.$route.query获取
> 具有路由 <router-link :to="{path:'xxx',name:'xx'}" />
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





