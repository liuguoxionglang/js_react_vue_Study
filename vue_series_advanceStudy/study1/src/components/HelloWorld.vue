<template>
  <div class="hello">
    <div  v-color="'red'">
      HelloWorld!!!
      <input v-model="value"/>
    </div>

    <div>
      <button v-if="type=='success'">成功</button>
      <button v-else-if="type=='error'">报错</button>
      <button v-else>警告</button>
    </div>
    <!-- 为解决上述冗余的代码写法，使用render函数 -->
    <div>
      <Button
        :type="type"
        :text="text"
        @myClick="click"
      />
    </div>
    <Child></Child>
    
  </div>
</template>

<script>
import Button from './render.vue'
// import Child from './child'
export default {
  name: 'HelloWorld',
  components:{
    Button,
    // Child
  },
  props: {
    msg: String
  },
  directives:{
    color:function(el,binding){
      el.style.color = binding.value
    }
  },
  // 这样写形成闭包，此组件可在多个组件中使用，每个引用都单独保存自己的一份
  data(){
    return {
      value :null,
      type:"error",
      text:"报错"
    }
  },
  created(){
    // this.consoleMethod();
  },
  methods:{
    consoleMethod(){
      console.log("..............xxxx");
    },
    click(){
      console.log('按钮点击啦。。。。。')
    }
  },
  watch:{
    value:{
      // 若有参数时的写法
      // handler(newval,oldval){
      //   this.consoleMethod();
      // },
      handler:"consoleMethod",
      // 创建组件的时候立即执行一次
      immediate:true
    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
