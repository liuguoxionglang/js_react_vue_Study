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
