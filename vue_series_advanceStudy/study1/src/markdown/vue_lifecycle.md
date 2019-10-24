# vue api强化学习之-------生命周期钩子函数
## 生命周期函数
> 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义。
> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数。
> 先来张图，看一下一个vue实例的整个生命周期：
![](https://cn.vuejs.org/images/lifecycle.png) 
 
- beforeCreate
>  在vue实例被构建之前，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
- created
> vue实例创建完成之后立即调用，此时，实例已经完成数据观测 (data observer)，属性和方法的运算，watch/event 事件回调的配置；但是还未开始挂载，$el 属性目前不可见 
- beforeMount
> 在挂载开始之前调用，此时，相关的 render 函数将被首次调用。
- mounted
> el 被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。mounted执行时，其子组件并不一定全部都挂载完成，如果需要等到所有的组件都挂载渲染完成，在需要使用vm.$nextTick替换掉mounted。服务器端渲染不会调用此函数。
```javascript
mounted:function(){
    this.$nextTick(function(){
        //需要执行的函数体
    })
}
```  
- beforeUpdate
> 数据更新之前调用此钩子函数，即当data被更新之前，调用此函数，服务器端渲染不调用此函数 
- updated
> 组件虚拟dom已全部更新，此时，此函数被调用，此时可以对dom进行操作，但不建议，通常会通过计算属性computed和监听器watch间接操作，此钩子函数调用时，同created函数一样，也不能保证其所有子组件虚拟dom都已更新完毕，因此，若需要在其子组件dom都重新渲染完毕的情况下，执行某些操作，需要使用vm.$nextTick替换掉此钩子函数；
```javascript
updated:function(){
    this.$nextTick(function(){
        // 此处是需要执行的函数体
    })
}
```  
- beforeDestroy
> 实例销毁之前被调用，服务端渲染不会被调用 
- destroyed
> 实例被销毁之后调用，此时，与被销毁的实例相关的所有数据，监听，子组件都会被销毁。服务端渲染不会被调用
- errorCaptured
> 2.5.5新增的，捕获子组件抛出的错误，函数参数及返回类型：(err: Error, vm: Component, info: string) => ?boolean
> 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播
## 示例
- 父组件lifecycle.vue
```javascript
<template>
  <div class="hello">

      <div v-for="item in data" :key="item">{{item}}</div>
      <button @click="clickMethod">更新数据</button>
      <!-- 此处使用v-show指令，子组件切换时，不能触发子组件的生命周期函数 v-show只是css上的隐藏于显示 -->
      <div v-if="currentComp =='index'">
          <index/>
      </div>
      <div v-else>
          <login/>
      </div>
      <button @click="changeComp">切换组件</button>

  
   
  </div>
</template>

<script>
import login from '../components/login.vue'
import index from '../components/index.vue'
export default {
  name: 'LifeCycle',
  data(){
      return {
          currentComp:"index",// 默认显示index组件，
          data:['刘备','曹操','孙权']
      }
  },
  components:{
      index,
      login
  },
  methods:{
      clickMethod(){
          this.data.push("孙策");
      },
      changeComp(){
          if(this.currentComp == "index"){
              this.currentComp = "login";
          }else{
              this.currentComp = "index";
          }
      }
  },

  // 生命周期函数
  beforeCreate(){
      console.log("beforeCreate.......组件实例化之前");
      
  },
  created(){
      console.log("create.....组件实例化之后"); 

  },
  beforeMount(){
      console.log("beforeMount......组件被挂载到dom之前");
      
  },
  mounted(){
      console.log("mounted.......组件被挂载到dom之后");
      
  },
  beforeUpdate(){
      console.log("beforeUpdate......状态更新之前");
      
  },
  updated(){
      console.log("updated.....状态更新之后");
      
  },
  
  errorCaptured(){
      console.log('errorCaptured.....捕获到子组件抛出的错误');
      return false;// 返回false， 防止向上再抛出

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

``` 
- 子组件 index.vue
```javascript
<template>
  <div class="hello">
    <div >
    我是index 组件
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  // 生命周期函数
  beforeCreate(){
      console.log("index组件。。。。。。。。beforeCreate.......组件实例化之前");
      
  },
  created(){
      console.log("index组件。。。。。。。。create.....组件实例化之后"); 

  },
  beforeMount(){
      console.log("index组件。。。。。。。。beforeMount......组件被挂载到dom之前");
      
  },
  mounted(){
      console.log("index组件。。。。。。。。mounted.......组件被挂载到dom之后");
      this.data.push('111');//报错
      
  },
  beforeDestroy(){
      console.log("index组件。。。。。。。。beforeDestroy......实例销毁之前");
      
  },
  destroyed(){
      console.log("index组件。。。。。。。。destroyed......实例销毁之后");
      
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

``` 