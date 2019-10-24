# vue api强化学习之-------directive(指令)

## vue api指令
- v-text/{{}} | v-html
> 文本渲染，绑定数据到模板的相应位置，要把一段html代码渲染到模板的相应位置，则需要使用v-html
```javascript
    /*directives.vue*/
    <template>
        <div class="hello">
        <!-- 绑定数据到元素的相应位置    -->
        <div>{{text}}</div>
        <span v-text="text"></span>
        <!-- {{}}会把html当做字符串渲染到div内部    -->
        <div>{{html}}</div>
        <!-- 渲染html，需要使用v-html指令 -->
        <div v-html="html"></div>
        
        </div>
    </template>

    <script>
        export default {
            name: 'Directives',

            data(){
                return {
                text:"报错",
                html:' <div><span style="color:red;"> html内容</span></div>'
                }
            },
            
        }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>

    </style>

```
- v-if/v-else/v-else-if | v-show
> 条件渲染指令（除v-show）,根据表达式值得真假渲染元素，在切换元素时，与其相关的数据绑定以及组件都会被销毁再重建
> 当v-if 和v-for一起使用时，v-for 的优先级比 v-if 更高
> v-else 不需要表达式，但必须与v-if或者v-else-if搭配使用
> v-show会根据表达式值得真假，切换元素的display Css属性
```javascript
<template>
  <div class="hello">
    <!-- v-if,v-else-if ,v-else搭配使用，只有有一个条件符合，其他条件则不会被渲染 -->
   <div v-if="flag<0.1">我是if</div>
   <div v-else-if="0.1<flag<0.5">我是if-else-if-------1</div>
   <div v-else-if="0.5<flag<0.8">我是if-else-if-------2</div>
   <div v-else>我是v-else</div>
    <!-- v-show指令，根据表达式的值得真假修改css中display属性的值，不符合条件时，样式dispaly:none -->
   <div v-show="flag>0.5">我是v-show</div>
  </div>
</template>

<script>

export default {
  name: 'Directives',

  data(){
    return {
      flag:Math.random()
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

``` 
- v-on/@
> v-on:eventType.xx = "methods"事件绑定 eventType为事件类型，xx为修饰符，可以没有修饰符
 - 事件修饰符：
    > .stop - 调用 event.stopPropagation()。
    > .prevent - 调用 event.preventDefault()。
    > .capture - 添加事件侦听器时使用 capture 模式。
    > .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    > .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
    > .native - 监听组件根元素的原生事件。
    > .once - 只触发一次回调。
    > .left - (2.2.0) 只当点击鼠标左键时触发。
    > .right - (2.2.0) 只当点击鼠标右键时触发。
    > .middle - (2.2.0) 只当点击鼠标中键时触发。
    > .passive - (2.3.0) 以 { passive: true } 模式添加侦听器 
 - 按键修改符
    > v-on:键盘事件.修饰符
    > v-on:keyup.enter="methods" 
```javascript
<template>
  <div class="hello">
    <!-- 绑定事件 同时可以给事件添加修饰符 -->
    <div class="von_demo" v-on:click="clickMethod">点击我</div>
    <div class="von_demo" @click="clickMethod2(888)">点击我</div>
    <input class="von_demo" v-on:keyup.enter="keyupenter"/>
  </div>
</template>

<script>

export default {
  name: 'Directives',

  data(){
    return {
    }
  },
 /*在此处定义方法*/
  methods:{
      clickMethod(){
          alert(666)
      },
      clickMethod2(a){
          alert(a)
      },
      keyupenter(){
          alert("keyup____enter")
      }

  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .von_demo {
        width: 100px;
        height: 50px;
        border: 1px solid red;
    }


</style>

```        
- v-for
> 列表循环,语法：item in items，其中items可以是Array | Object | number | string | Iterable (2.6 新增)
 - 列表渲染
 >  vue对普通js数组的部分方法进行包装修改，并加以监听；包括：push(),pop(),shift(),unshift(),splice(),sort(),reverse(),当使用上述方法更新列表数据时，vue会自动刷新；但是，当你只是用下标修改数据内容某一内容时，列表不会刷新，这是由于js的底层数据结构所导致，鉴于此种情况，vue中可以使用Vue.set(list,index,content) 修改某一数据后，vue会侦听到变化，并自动刷新
 > 像filter() contact() slice()这些方法不会改变原始数据，而是返回新的一份数据,当用这些方法修改数据时，列表不会刷新
```javascript
<template>
  <div class="hello">
    <!-- 可以给被遍历的对象指定索引，如（item,index）in arr,(val,key,index) in object -->
    <div >
        <div v-for="(item,idx ) in data" :key="idx">
            {{item.pra}}
        </div>
    </div>
    <button  @click="changeData">修改数据</button>
     <button  @click="changeData1">修改数据1</button>


  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Directives',

  data(){
    return {
      data:[
          {pra:'liuguoxionglang'},
          {pra:25},
          {pra:"java"},
      ]
    }
  },
 /*在此处定义方法*/
  methods:{

    changeData(){
          this.data.push({pra:'man'});// 列表自动刷新
       
      },
    changeData1() {
        // 列表不会刷新
        //   this.data[3] = {pra:666};
          //列表自动刷新
        Vue.set(this.data,3,{pra:888});
        
      
    }
     

  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

``` 
- v-bind/:
> 动态地绑定一个或多个特性，或一个组件 prop 到表达式。
> 在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。
> 在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。
```javascript
<template>
  <div class="hello">
    <div>
        <!-- 给元素的属性动态的绑定属性值 -->
        <img v-bind:src="imgurl" alt="vv">
        <!-- 以对象或者数组的形式绑定类名 -->
        <div :class="{active:isactive}">active</div>
        <div :class="[activeborder,bcg]">active,bcg</div>
        <!-- 动态绑定内联样式 -->
        <div :style="{color:activecolor,fontSize:'15px'}">内联样式</div>
    </div>
  </div>
</template>

<script>
import img from '../assets/logo.png'

export default {
  name: 'Directives',

  data(){
    return {
      imgurl:img,
      isactive:true,
      activeborder:'activeborder',
      bcg:'bcg',
      activecolor:'red',
    }
  },
 /*在此处定义方法*/
  methods:{
    
     

  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .active{
        width: 100px;
        height: 50px;
        border: 1px solid green;
        background: pink
        

    }
    .activeborder{
        width: 100px;
        height: 50px;
        border: 1px solid green
    }
    .bcg {
        background: blue
    }


</style>

``` 
- v-model
> 在表单控件或者组件上创建数据双向绑定，通常应用在input,select,textarea这几种表单控件和自定义组件上；
> 修饰符 .lazy - 取代 input 监听 change 事件
> .number - 输入字符串转为有效的数字
> .trim - 输入首尾空格过滤
```javascript
<template>
  <div class="hello">
    <div>
        <input type="text" v-model="value" placeholder="请输入数据">
        <span>正在输入的数据：</span><span>{{value}}</span>
        <input type="checkbox" value="lgx" id="1" v-model="checkboxArr">
        <input type="checkbox" value="laoda" id="2" v-model="checkboxArr">
        <input type="checkbox" value="hongqi" id="3" v-model="checkboxArr">
        <span>checkbox选择：</span><span>{{checkboxArr}}</span>
    </div>


  </div>
</template>

<script>

export default {
  name: 'Directives',

  data(){
    return {
      value:'',
      checkboxArr:[]
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

``` 
- v-slot/v-pre/v-once/v-cloak 
 > v-slot:缩写为# 在 2.6.0 中，我们为具名插槽和作用域插槽引入的新的统一的语法 取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的特性,参数为插槽名，默认为default,仅限用于template和组件上;
 > v-pre:跳过这个元素和它的子元素的编译过程,跳过大量没有指令的节点会加快编译
 > v-once 被此指令操作的元素和组件只会被渲染一次，渲染后被当做静态文件，不在变化

 ```javascript
 <!-- 具名插槽 -->
<base-layout>
  <template v-slot:header>
    Header content
  </template>

  Default slot content

  <template v-slot:footer>
    Footer content
  </template>
</base-layout>
// 此元素及子元素将不会被编译
 <div v-pre><span>fdfdfd</span>ddddd</div>
 ``` 
## 自定义指令
- 钩子函数
    > 一个指令对象可以提供一下几个钩子函数，可选
    - bind:指令绑定元素时只调用一次
    - inserted:被绑定的元素插入父节点时调用
    - update:所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    - componentUpdate:指令所在组件的 VNode 及其子 VNode 全部更新后调用
    - unbind:只调用一次，指令与元素解绑时调用
- 钩子函数的参数
    - el :指令所绑定的元素，可用来直接操作dom
    - binding:是一个对象，可包含以下几个属性
        - value:指令的绑定值
        - name:指令名，不包含v-
        - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    - vnode:vue编译成的虚拟节点
    - oldVnode：上一个虚拟节点，在update和componentUpdate钩子函数中使用
### 局部指令   
> 组件中使用 directives:{}
```javascript
<template>
  <div class="hello">
    <!-- 使用局部指令 -->
    <div  v-color="'red'">
      HelloWorld!!!
    </div>
    <input type="text" name="" id="" v-focus>

   
  </div>
</template>

<script>
export default {
  name: 'DefinedDirective',
  // 通过directives参数选项注册局部指令
  directives:{
    color:function(el,binding){
      el.style.color = binding.value
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```

### 全局指令:跟组件中注入即可，new Vue({directives:{}}); Vue.directive()
> 注册全局指令可以通过Vue的静态方法，Vue.directive()在创建vue根实例之前注册；
> 或者在创建vue根实例时，在vue构造函数中以参数的形式添加directives ,好像不行啦
```javascript
//创建vue根实例之前 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
});
// 创建根实例时，以参数形式创建，不过好像不行
// new Vue({
//   router,
//   directives:{
//     focus:{
//       // 指令的定义
//       inserted: function (el) {
//         el.focus()
//       }
//     }

//   },
//   render: h => h(App),
// }).$mount('#app')
``` 

