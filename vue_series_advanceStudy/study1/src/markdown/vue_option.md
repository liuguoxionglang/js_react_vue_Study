# vue api强化学习之-------vue选项（除去声明周期函数）
## vue选项---数据
- data
> Vue 实例的数据对象,我理解相当于react组件背部的state对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化；
> 建议在创建实例之前，就声明全部根级响应式属性,实例创建之后，vue实例也代理了data对象上所有的属性，vm.$data.xx 与vm.xx相同
> 以_和$开头的自定义属性，vue为了防止跟自身的属性冲突，不会被代理，只能通过vm.$data.xx
- props
> 用于接收来自父组件的数据,可以是对象或数组，对象时，可以配置高级选项，如类型检测、自定义验证和设置默认值；
> 基于对象，可以使用的选项有个type:此字段表明接受的类型;default:此字段给定默认值;require:此字段定义prop是否为必须的;validator：此字段定义校验prop的校验函数。 
- propsData
> 只用于 new 创建的实例中,创建实例时传递 props。主要作用是方便测试。 
- computed
> 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。 
> 若为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，不过可以把vue实例当做参数传递到此箭头函数中；
> 计算属性的结果会被缓存，其依赖的响应式属性变化时，才会重新计算；默认计算属性只读，也可以通过get/set方法设置读写性；
- methods
> 在此定义的方法被混入到vue实例中，可以通过vm实例访问这些方法，方法中的this自动绑定为vue实例，因此，不能使用箭头函数定义此类方法，因为箭头函数绑定了父级作用域的上下文，this不会指向vue实例； 
- watch
> 一个对象，key为需要监听的表达式，val为一个回调函数，Vue实例在实例化后遍历watch中的每一属性，调用vm.$watch监听每一个属性。在此监听器中，可进行异步操作 
### 示例代码
```javascript
<template>
  <div class="options">
      <!-- 着重演示计算属性 附带data,methods-->
      <div>
          <span>a:</span><span>{{a}}</span><br/>
          <span>计算属性，假如此处通过a进行了复杂的运算</span><span>{{double}}</span>
         
          <div>
              <p><span>b为:{{b}}</span></p>
              <button @click="method1">重置b</button>
              <p><span>重置后的b:{{compute_b}}</span></p>
          </div>
      </div>

        <!-- 着重演示watch -->
      <div>
          <input type="text" name="" id="" v-model="str">

      </div>
   
  </div>
</template>
<script>

export default {
  name: 'VueOptions',
  data(){
      // 根级响应式属性，全部在此处声明
      return {
          a:20,
          b:"caocao",
          str:"",
      }
  },
  // 此处定义的计算属性 混入了vue实例中，vue实例进行了代理
  computed:{
      // 此处只能读取
      double:function(newval,oldval){
          return this.a*2;
      },
      compute_b:{
          // 读取
          get:function(){
            return this.b + "______is a hero"
          },
          // 设置
          set:function(pra){
              this.b =pra
          }
      }



  },
 // 此处声明的方法，也混入了vue实例中，vue实例也进行了代理
  methods:{
      // 通过计算属性重置
    method1(){
        this.compute_b = "liubei"
    },
   
  },


  watch:{
      /* 函数形式监听*/
    //   str:function(newval,oldval){
    //       console.log(newval,oldval,".....................监听器监听。。。")
    //   }

    /* 对象形式监听，还可配置监听参数*/
    str:{
        handler:function(newval,oldval){
            console.log(newval,oldval,".....................监听器监听。。。")
        },
        deep:true,// 深度监听  若监听对象时嵌套对象时，其任何 属性改变时，都会被调用
    },
  }

}
</script>
``` 
## vue选项---DOM
- el
> 只在由new创建的vue实例中才使用。提供一个页面上已经存在的dom元素，用来挂载挂载创建的vue实例；
> 如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译 
- template
> 内容通常为字符串模板 ，作为一个vue实例的标识；
> 模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽；
> 如果 Vue 选项中包含渲染函数，该模板将被忽略
- render
> 类型：(createElement: () => VNode) => VNode 
> 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode
> 如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息
- renderError
> 类型：(createElement: () => VNode, error: Error) => VNode
> 只在开发者环境下工作。当 render 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 renderError。这个功能配合 hot-reload 非常实用 
## vue选项---资源
- directives
> 组件内，可通过此选项定义指令;如下示例
> 也可通过Vue.directives定义全局指令，详见vue全局api中的directives
```javascript
/*组件内部可通过directives选项定义组件内部可使用的指令，下面定义了v-color指令*/
 directives:{
    color:function(el,binding){
      el.style.color = binding.value
    }
  },
``` 
- components
> 在组件内部的选项中，注册外部引入的组件，注册之后，外部组件才能在此组件中使用；
> 定义全局组件，详细看vue全局api中的component 
```javascript
<template>
  <div class="login base">
    /*注册过后的组件，才能在此处正常使用*/
    <index />
  </div>
</template>
import index from './index.vue'
export default {
  name: 'login',
  // 此处注册引入的外部组件
  components:{
    index
  },
}
``` 
- filters
> 过滤器，常用于对某些数据的格式化，比如数字用逗号分开，翻译管理部门等等，在vue中通常用在两个地方：双花括号插值和 v-bind 表达式
> 双花括号中这样使用： {{ message | capitalize }} ，capitalize为定义的过滤器名；
> v-bind表达式中这样使用：<div v-bind:id="rawId | formatId"></div>，formatId 为定义的过滤器名
> 过滤器可以在组件内定义，也可以全局定义,全局过滤器详细看vue全局api中的filters
```javascript
/*在组件内部，通过filters选项，定义局部的过滤器，下面为一个格式化字符串的过滤器（字符串转首字母大写）*/
filters: {
    // 首字母大写
    capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }, 
 
``` 
## vue选项---组合
- mixins
> mixins 选项接受一个混入对象的数组；
> 这些混入实例对象可以像正常的实例对象一样包含选项，他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。> 假如你混入包含一个钩子而创建组件本身也有一个，两个函数将被调用。
> Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用 
> 通常会把vue实例一些可复用的功能方法，放置到mixins中；
> 也可以创建全局混入，详见vue全局api中的mixin
```javascript
//自定义混入对象，包含了一个钩子函数
var mixin = {
  created: function () { console.log(1) }
}
// 创建的vue实例本身就有此钩子函数，当再混入同样的钩子函数时，两个函数都将被执行，并且被混入的函数先被执行
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
``` 
- extends
> 类型为函数或者对象 
> 组件内部，扩展一个组件，若要全局扩展一个组件，则需要使用vue全局api中的extend方法 
> extends用法和mixins很相似,只不过接收的参数是简单的选项对象或构造函数,所以extends只能单次扩展一个组件 
- parent
> 此选项指定已创建实例的父实例，子实例可通过this.$parent访问父实例，父实例的this.$children也包含了此子实例， 
- provid/inject
> provide：Object | () => Object
> inject：Array<string> | { [key: string]: string | Symbol | O 
> provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。
> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
## vue选项---其他   
- name
> 组件名称 
- delimiters
> 类型：Array<string>
> 默认值：["{{", "}}"]
> 限制：这个选项只在完整构建版本中的浏览器内编译时可用。
> 改变纯文本插入分隔符 
- functional
> 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染 
- model
> 允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。 
- inheritAttrs
> 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。
> 注意：这个选项不影响 class 和 style 绑定
- comments
> 类型：boolean
> 默认值：false
> 限制：这个选项只在完整构建版本中的浏览器内编译时可用。
> 当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们 