<template>
  <div class="options">
      <!-- 着重演示计算属性 附带data,methods-->
      <div>
          <span>a:</span><span>{{a}}</span><br/>
          <span>计算属性，假如此处通过a进行了复杂的运算</span><span>{{double}}</span>
         
          <div>
              <p><span>b为:{{b}}</span></p>
              <button @click="method1">重置b</button>
              <p><span>重置后的b:{{compute_b}}</span></p>
          </div>
      </div>

        <!-- 着重演示watch -->
        <!-- <div>我被注释了</div> -->
      <div>
          <input type="text" name="" id="" v-model="str">

      </div>
   
  </div>
</template>
<script>

export default {
  name: 'VueOptions',
  comments:true,
  data(){
      // 根级响应式属性，全部在此处声明
      return {
          a:20,
          b:"caocao",
          str:"",
      }
  },
  filters: {
    // 首字母大写
    capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  // 此处定义的计算属性 混入了vue实例中，vue实例进行了代理
  computed:{
      // 此处只能读取
      double:function(newval,oldval){
          return this.a*2;
      },
      compute_b:{
          // 读取
          get:function(){
            return this.b + "______is a hero"
          },
          // 设置
          set:function(pra){
              this.b =pra
          }
      }



  },
 // 此处声明的方法，也混入了vue实例中，vue实例也进行了代理
  methods:{
      // 通过计算属性重置
    method1(){
        this.compute_b = "liubei"
    },
   
  },


  watch:{
      /* 函数形式监听*/
    //   str:function(newval,oldval){
    //       console.log(newval,oldval,".....................监听器监听。。。")
    //   }

    /* 对象形式监听，还可配置监听参数*/
    str:{
        handler:function(newval,oldval){
            console.log(newval,oldval,".....................监听器监听。。。")
        },
        deep:true,// 深度监听  若监听对象时嵌套对象时，其任何 属性改变时，都会被调用
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
