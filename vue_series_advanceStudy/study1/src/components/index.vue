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
