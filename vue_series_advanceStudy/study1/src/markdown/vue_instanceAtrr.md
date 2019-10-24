# vue api强化学习之-------实例的属性
> vue组件在构建的过程中，vue构建器给每个vue实例添加的属性对象。
## 常用vue实例属性
- vm.$refs
> vue在构建过程中，将注册过ref的所有dom元素和组件实例添加到一个对象中，并将此对象添加到当前vue实例的$refs属性下。
> $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs
- vm.$parent
> 当前vue实例若有父实例，则将父实例对象保存到当前实例的$parent属性上。 
- vm.$data
> Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问，所谓代理，简单理解，就是把data中的每一个数据在vue实例对象中逐个保存一份    
- vm.$props
> 当前组件接受到的props参数，vue实例代理了此对象，代理原理同$data 
- vm.$el
> 获取vue实例使用的根dom元素，即当前组件中template模板包含的根dom元素 
- vm.$options
> 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处：
```javascript
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```  
- vm.$slots
> 用来访问被插槽分发的内容，根据具名插槽的名称即可拿到被分发到此插槽的内容，没有被命名的插槽，默认default,所有被分发的内容都被分发到default名下； 
- vm.$children
> 一个当前组件实例的直接子组件实例的数组， 
- vm.$root
> 当前组件树的根 Vue 实例,通常就是我们的总入口组件实例。如果当前实例没有父实例，此实例将会是其自己, 
- vm.$listeners
> 类型：{ [key: string]: Function | Array<Function> }
> 父作用域中(不包括.native修饰符修饰的)v-on事件监听器，是一种组件之间通信的方式， 通常使用v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用;
- vm.$attrs
> 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用 
- vm.$scopedSlots
> 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。vm.$scopedSlots 在使用渲染函数开发一个组件时特别有用 
- vm.$isServer
> 当前 Vue 实例是否运行于服务器 
## 实例属性使用示例
- 父组件 instanceAttr.vue
```javascript
<template>
  <div class="instance">
      <div>vue实例属性api介绍</div>
      <div ref="divref">{{val}}</div>
      <login ref="loginref" :pra="val" @myevent="methods1" :val="val" :age="age" :job="job" >
          <div slot="loginslot">我是被插槽分发的东西</div>
      </login>
      <button @click="clickMethod">获取$refs属性</button>

  
   
  </div>
</template>

<script>
import login from '../components/login.vue'
import index from '../components/index.vue'
export default {
  name: 'InstanceAttr',
  data(){
      return {
         val:666,
         age:25,
         job:"java"
      }
  },
//   customOptions:{val:888}, 此处无用
  components:{
      index,
      login
  },
  methods:{
      clickMethod(){
          // 获取dom元素的html内容
          var htmlcontent = this.$refs.divref.innerHTML;
          //获取vue实例中的方法或数据
          var vueinstanceMethorData = this.$refs.loginref.login()


          console.log(htmlcontent,".........this.$refs,............",vueinstanceMethorData);
          
      },
      methods1(){alert('instanceAttr中的方法methods1被调用了')},
      methods2(){}
    
  },
  mounted(){
      // 获取 vue实例监听的数据对象，由于vue实例代理了此对象，因此，在组件中直接通过this.xx，就可访问到data对象中的属性
      console.log(this.$data.val,"......this.$data.val......");

      // 获取当前组件的根元素
      console.log(this.$el,"...instanceAttr组件中....获取根实例");

      // 如上定义的数据获取不到
      console.log(this.$options,'..获取初始化项....instanceAttr组件中....');

      // 当前实例中没有分发到此处的内容，因此获取不到内容
      console.log(this.$slots,"............instanceAttr组件。。。。。。this.$slots");

     //获取当前组件实例的直接子组件实例对象，此处返回的是login组件实例
      console.log(this.$children[0].name,"......this.$children.....");

      // 获取当前组件树的根vue实例 此应用中就是app.vue对应的组件实例
      console.log(this.$root,"......this.$root......instanceAttr组件中....");

      // 此父作用域中没有注册事件监听器，因此此处没有监听器函数
      console.log(this.$listeners,".this.$listeners.........instanceAttr组件中..");

     // 此父作用域中没有属性绑定传递，因此此处获取不到
      console.log(this.$attrs,"this.$attrs............instanceAttr组件中......");

      // 没有查到内容被分派到此组件，因此获取不到
      console.log(this.$scopedSlots,"this.$scopedSlots............instanceAttr组件中......");

      //判断当前实例是否运行与服务器端， 此处返回false,
      console.log(this.$isServer,".this.$isServer..................instanceAttr组件中.......")
  }  
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .divlistener{
        width: 100px;
        height: 50px;
        background: green;
        border: 1px solid red;

    }

</style>

``` 
- instanceAttr的子组件login.vue
```javascript
<template>
  <div class="login base">
    <div>
    我是login 组件
    </div>
    <slot name="loginslot"></slot>
    <!-- 通过此方式将当前接受到的事件监听器 传递到当前组件的子组件中去 -->
    <index v-on="$listeners" v-bind="$attrs"/>

  </div>
</template>

<script>
import index from './index.vue'
export default {
  name: 'login',
  components:{
    index
  },
  props:{
    // 接受pra，并定义接受规则
    pra:{
      type:Number,
      default:''
    },
    age:''

  },
  data(){
    return {
      name:'lgx',
    }
  },
  methods:{
    login(){
      console.log(this.name,"登录了.................");
      // 子组件中由于没有ref注册过，因此$refs对象为空对象
      console.log(this.$refs,"......子组件中.this.$refs....");
      // 获取父实例对象
      console.log(this.$parent,"....子组件中父实例..此处应该是instanceAttr组件...........");

      // 获取当前组件接受到的props参数
      console.log(this.$props.pra,"....this.$props.........")
    }
  },
  mounted(){
    // 获取当前组件的根元素，并获取根元素的属性 和类名
      console.log(this.$el.attributes,"...login组件中....获取根实例",this.$el.classList);
      
      // 此处能够获取到父组件被分发到此处的虚拟dom节点对象，此处可以获取到分发到的内容，同时还可获取到其上下文
      console.log(this.$slots.loginslot[0].elm,"............login组件。。。。。。this.$slots");
      
      // 获取当前组件树的根vue实例 此应用中就是app.vue对应的组件实例
      console.log(this.$root,"......this.$root......login组件中....");

      // 父作用域注册了myevent事件,因此此处能拿到此事件监听器函数
      console.log(this.$listeners,".this.$listeners.........login组件中..");

      // 当前组件接受了pra,age两个参数，其余的都会被$attrs属性获取到
      console.log(this.$attrs,"this.$attrs............login组件中......");
      //输出 {val: 666,job: "java"} "this.$attrs............login组件中......"

      // this.$scopedSlots对象对应每个插槽返回一个函数，每个函数返回一个相应的虚拟dom节点
      console.log(this.$scopedSlots.loginslot(),"this.$scopedSlots............login组件中.......");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello div {
    background:  green;
    width: 200px;
    height: 100px;
}
</style>

```  
- login的子组件index.vue 
```javascript
<template>
  <div class="hello">
    <div v-color="'red'">
    我是index 组件
    </div>
    <!-- 定义名为index的插槽 -->
    <slot name="index"></slot>

  </div>
</template>

<script>

export default {
  name: 'index',
  directives:{
    color:function(el,binding){
      el.style.color = binding.value
    }
  },

  mounted(){
    //   console.log("index组件。。。。。。。。mounted.......组件被挂载到dom之后");
    //   this.data.push('111');//报错

    console.log(this.$listeners,"..............this.$listeners.......index组件中");

    // 当前组件接受了pra,age两个参数，其余的都会被$attrs属性获取到
    console.log(this.$attrs,"this.$attrs............index组件中......");
      
  },
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello div {
    background:  green;
    width: 200px;
    height: 100px;
}
</style>

```  