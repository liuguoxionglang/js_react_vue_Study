<template>
  <div class="overall">
      <!-- 使用全局注册的插件 -->
      <first-demo></first-demo><br/>
      
      <!-- 使用全局指令 -->
      <input type="text" v-focus><br/>


      <!-- 使用全局过滤器，格式化字符串 -->
      <div>{{str | capitalize}}</div><br/>
     
      <!-- 使用全局混入功能 -->
      <button @click="submit"> 提交</button><br/>

       <!-- 使用Vue.extend 构造器构造的全局插件-->
      <button @click="confirm"> 提交</button><br/>

 
  </div>
</template>
<script>
export default {
  name: 'OverallApi',
 
  data(){
      // 根级响应式属性，全部在此处声明
      return {
         str:'capitalize'
      }
  },

  methods:{
      submit(){
          //提交数据。。。省略
          this.alertInfo("报错了");
      },
      confirm(){
          // 调用全局定义的插件
          this.$msgBox.showMsgBox({
                title: '提示',
                content: '确定要删除吗',
            }).then(async (val) => {
                // ...        
                console.log('确认')
            }).catch(() => {
                // ...
                console.log('取消')
            });

      }

  },
  mounted(){
      console.log(this,".......this.$data........")
  }




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
