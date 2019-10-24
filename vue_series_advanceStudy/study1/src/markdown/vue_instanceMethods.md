# vue api强化学习之-------实例方法
## 实例方法----数据
- vm.$watch
> vm.$watch( expOrFn, callback, [options] )
> expOrFn为要监听的属性，callback监听到变化时的回调函数，options配置一些参数，如是否深度监听(deep参数)，是否将立即以表达式的当前值触发回调（immediate参数）
> 返回一个取消观察函数，用来停止触发回调
> 观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代  
- vm.$set
> vm.$set( target, propertyName/index, value ) 全局Vue.set()的别名 为目标对象添加数据
> target为一数组或者对象； propertyName/index 对象的key或者数组的下表；需要设置的值
> 返回设置的值 
- vm.$delete
> vm.$delete( target, propertyName/index )  全局 Vue.delete 的别名，删除目标对象中的数据
> 参数类型同vm.$set方法的
### 以上三个方法示例 
```javascript
<template>
  <div class="instance">
    <div>{{a}}</div>
    <button @click="method1">改变val</button>
    <div>{{obj.name}}</div>
    <button @click="method2">vm.set</button>
    <button @click="method3">vm.delete</button>
   
  </div>
</template>

<script>

export default {
  name: 'InstanceMethods',
  data(){
      return {
       a:{b:{c:66}},
       obj:{name:"张飞"}
      
      }
  },
  methods:{
    method1(){
      this.a.b.c = Math.random()*100
    },
    method2(){
      // 此处通过vm.$set方法修改数据，vue实例会自动刷新
      this.$set(this.obj,"name",Math.random()+"_张飞")
    },
    method3(){
      // 删除目标对象下的name属性
      this.$delete(this.obj,"name")
    }
  },
  mounted(){
    // 此处若监听a,参数deep设置为false，用上面方法改变值，则监听不到变化
    // 当监听a.b.c此路径时，即使deep设置为false，也可以监听到变化
    // 当监听a时，deep设置为true时，也可坚挺到变化
    this.$watch("a",function(newval,oldval){
      console.log(newval,oldval,".........监听到val属性的变化了...")
    },{deep:true,immediate:true})
  }
}
</script>
``` 
## 实例方法---事件
- vm.$on
> vm.$on( event, callback )
> 监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数 ,和vm.$emit结合通常构建一个空vue实例，在组件之间进行通信
- vm.$emit
> vm.$emit( eventName, […args] )
> 触发当前实例上的事件。附加参数都会传给监听器回调。
- vm.$off
> vm.$off( [event, callback] )
> 移除自定义事件监听器。如果没有提供参数，则移除所有的事件监听器；如果只提供了事件，则移除该事件所有的监听器；如果同时提供了事件与回调，则只移除这个回调的监听器。 
- vm.$once
> vm.$once( event, callback ) 监听一个自定义事件，只执行一次，执行过后移除监听器
### 事件方法示例
```javascript
<template>
  <div class="instance">
      <button @click="method5">触发自定义的事件</button>
      <button @click="method4">移除自定义事件监听器</button>
   
   
  </div>
</template>

<script>

export default {
  name: 'InstanceMethods',
  data(){
      return {
      }
  },
  methods:{
    // 移除自定义事件监听器
    method4(){
      // 此处没有写，回调函数名，则移除test事件所有的监听器
      this.$off("test")
    },
    // 触发某一事件
    method5(){
      this.$emit("test","hello")
    },

  },
  mounted(){

    // 监听test事件
    this.$on("test",function(msg){
      console.log("自定义的事件触发了............",msg)
    })
    // 监听test事件  执行一次后，移除此监听器
    this.$once("test",function(msg){
        console.log("自定义的事件触发了.监听到消息....执行一次后移除子监听器.......",msg)
    })
  }
}
</script>
``` 
## 实例方法---生命周期
- vm.$mount
> vm.$mount( [elementOrSelector] )
> 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例;
> 如果没有参数，则会被渲染到文档之外，此时必须使用原生 DOM API 把它插入文档中 
> 返回vue实例自身
```javascript
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
``` 
- vm.$forceUpdate
> vm.$forceUpdate() 
> 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件 
- vm.$nextTick 
> vm.$nextTick( [callback] )
> 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上；在vue的生命周期函数中，为了确保当前组件及子组件全部挂载或者全部重新渲染之后执行某部分代码，通常会将mounted和updated函数利用$nextTick函数的特性推后执行
- vm.$destroy
> 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。触发 beforeDestroy 和 destroyed 的钩子,通常不用；
### 实例生命周期方法示例
```javascript
<template>
  <div class="instance">
      <button @click="method6">vm.$forceUpdate</button>
      <div>{{message}}</div>
      <button @click="updateMessage">vm.$nextTick</button>
  </div>
</template>

<script>
export default {
  name: 'InstanceMethods',
  data(){
      return {
       message:'未更新'
      
      }
  },
  beforeUpdate(){
    console.log("重新渲染之前。。。。。。。")
  },
  updated(){
    console.log("重新渲染之后。。。。。。。")
  },
  methods:{
 
    // 强制vue实例重新渲染
    method6(){
     this.$forceUpdate();
    },
    updateMessage: function () {
      this.message = '已更新'
      // dom还未更新，
      console.log(this.$el.textContent,"........updateMessage...............") // => '未更新'
      // dom更新之后执行此回调
      this.$nextTick(function () {
        console.log(this.$el.textContent,"....this.$nextTick..updateMessage....") // => '已更新'
      })
    }

  },

}
</script>
``` 