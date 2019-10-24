<template>
  <div class="child2">
   <div>我是child2</div>
   <div>
       <span>我是从父组件传递过来的:</span>
       <span>{{fromParent}}</span><br/>

       <button @click="toparent">toparent</button>

       <div>
           显示从child1中获取到的信息：{{fromchild1}}
       </div>
   </div>
 
  </div>
</template>
<script>
import eventHub from './eventHub.js'
export default {
  name: 'Child2',
 
  data(){
      // 根级响应式属性，全部在此处声明
      return {
          fromParent:"",
          fromchild1:'',
        
      }
  },
  mounted(){
      const that = this;
      // 组件挂载之后开始监听tochild2event事件，并进行回调函数的处理
      eventHub.$on("tochild2event",function(msg){
          that.fromchild1 = msg;
      })
  },
  methods:{
      // 父组件通过此方法向子组件传参
      updatePra(msg){
          this.fromParent = msg
      },
      // 通过$parent获取父组件实例对象，并向父组件传递数据
      toparent(){
          this.$parent.child2UpdateData("child2传递过来的数据，父组件收到了吗？")
      }
  }






}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child2{
    background: green;
    width: calc(100% - 40px);
    height: 50%;
    margin: 20px;
}

</style>
