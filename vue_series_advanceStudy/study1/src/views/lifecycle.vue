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
