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
