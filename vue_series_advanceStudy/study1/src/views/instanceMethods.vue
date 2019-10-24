<template>
  <div class="instance">
    <div>{{a}}</div>
    <button @click="method1">改变val</button>
    <div>{{obj.name}}</div>
    <button @click="method2">vm.set</button>
    <button @click="method3">vm.delete</button>


    
      <button @click="method5">触发自定义的事件</button>
      <button @click="method4">移除自定义事件监听器</button>


      <button @click="method6">vm.$forceUpdate</button>
      <div>{{message}}</div>
      <button @click="updateMessage">vm.$nextTick</button>

   
   
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'InstanceMethods',
  data(){
      return {
       a:{b:{c:66}},
       obj:{name:"张飞"},
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
    },
    // 移除自定义事件监听器
    method4(){
      // 此处没有写，回调函数名，则移除test事件所有的监听器
      this.$off("test")
    },
    // 触发某一事件
    method5(){
      this.$emit("test","hello")
    },
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
  mounted(){
    // 此处若监听a,参数deep设置为false，用上面方法改变值，则监听不到变化
    // 当监听a.b.c此路径时，即使deep设置为false，也可以监听到变化
    // 当监听a时，deep设置为true时，也可坚挺到变化
    this.$watch("a",function(newval,oldval){
      console.log(newval,oldval,".........监听到val属性的变化了...")
    },{deep:true,immediate:true});

    // 监听test事件
    this.$on("test",function(msg){
      console.log("自定义的事件触发了............",msg)
    })
    // 监听test事件  执行一次后，移除此监听器
    this.$once("test",function(msg){
        console.log("自定义的事件触发了.监听到消息....执行一次后移除子监听器.......",msg)
    });



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.methodevent {
  width: 100px;
  height: 50px;
  border: 1px solid red;
  background: yellow

}
 
</style>
