<template>
  <div class="child1_child">
      <div>我是child1的child</div>
      <div>
          <span>我是从爷爷组件中获取到的信息：{{fromGrandfarherMsg}}</span>
      </div>
      <button @click="$listeners.grandEvent('爷爷，你收到我发的信息了吧')">我要给爷爷发信息</button>
     

 
   
 
  </div>
</template>
<script>
import eventHub from './eventHub.js'
export default {
  name: 'Child1Child',
  // 为true时，从父组件中传入的,此组件没有通过props接受的参数，都会自动成为子组件根标签上的属性;此时 $attrs中也存在
  // 若为false，则没有被props接受的参数，都回保存到 $attrs中去
  inheritAttrs: false,

 // 接受父组件传递过来的数据，并规定接受数据的类型
  props:{
      grandsonCompmsg:{
          type:String,
          default:""
      }
  },
 
  data(){
     // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {
          fromGrandfarherMsg:this.grandsonCompmsg
      }
  },
mounted(){
    console.log(this.$listeners,"...this.$listeners....")
}






}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child1_child {
    background:  yellow
}


</style>
