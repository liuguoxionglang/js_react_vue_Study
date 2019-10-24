<template>
  <div class="hello">
      <!-- v-for循环中通常使用key属性，标明每个元素的唯一性，利于虚拟dom算法 -->
      <div >
          <div v-for="item of data" :key="item">{{item}}</div>
      </div>
      <!-- 构建动态组件 -->
      <div :is="currentComp"></div>
      <button v-on:click="changeComponent">改变组件</button>
      <!-- 插槽 -->
      <index >
          <!-- 将插槽名为inex的内容传递到子组件名为index的插槽中 -->
          <div slot="index">在index中的slot中显示</div>
      </index>
   
    
   
  </div>
</template>

<script>
import Vue from 'vue'
import login from '../components/login.vue'
import index from '../components/index.vue'
export default {
  name: 'SpecialAttr',
  components:{
      index,
      login
  },
  data(){
      return {
          data:[1,2,3,4],
          currentComp:index
      }
  },
  methods:{
      changeComponent(){
          if(this.currentComp == login){
              this.currentComp = index
          }else {
              this.currentComp = login
          }

      }
  }

  
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
