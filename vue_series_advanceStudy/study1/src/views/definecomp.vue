<template>
  <div class="definedcomp">
     <div>{{msg}}</div>
     
 
  </div>
</template>
<script>
export default {
  name: 'fist-demo',
  data(){
      // 根级响应式属性，全部在此处声明
      return {
        msg:'我是全局注册的组件'
      }
  },




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
