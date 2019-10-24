<template>
  <div class="child1">
      <div>我是child1</div>
      <div>
          <span>我是从父组件中接受到的数据</span>
          <p v-for="item in paraentArr" :key="item.national">
              <span>{{item.national}}:</span>
              <span>{{item.emperor}}</span>
          </p>
      </div>
      <button @click="toParent">向父组件传递数据</button>


      <div> 
   
          <button @click="child1ToChild2">child1向child2发送信息</button>
      </div>

      <div>
          <!-- 此处通过 v-bind='$attrs'和v-on='$listeners'向孙子组件传递数据和方法 -->
          <child1-child v-bind="$attrs" v-on="$listeners"></child1-child>
      </div>

      <div>
          通过v-model方式，从父组件传递过来的数据：
          {{fromparent_vmodel}}
          <br/>
           通过sync方式，从父组件传递过来的数据：
          {{fromsync}}
          <br/>
          <!-- 子改变父好像不起作用？？ -->
         <button @click="changfather">vmodel事件改变父组件的值</button>
          <button @click="changfathersync">sync改变父组件的值</button>
      </div>

      <div>
          <h1>父组件中provide传递的：{{fromParentProvide}}</h1>
      </div>
 
   
 
  </div>
</template>
<script>
import eventHub from './eventHub.js'
import Child1Child from './child1_child.vue'
export default {
  name: 'Child1',
  // 为true时，从父组件中传入的,此组件没有通过props接受的参数，都会自动成为子组件根标签上的属性;此时 $attrs中也存在
  // 若为false，则没有被props接受的参数，都回保存到 $attrs中去
  inheritAttrs: false,
  components:{
      Child1Child
  },
  model:{
      prop:"vmodel_msg",
      event:"vmodelevent"

  },
//   inject:['providePra'],
  inject:{
      'fromParentProvide':'providePra'
  },

  // 接受父组件传递过来的数据，并规定接受数据的类型
  props:{
      arr:{
          type:Array,
          default:[]
      },
      vmodel_msg:String,
      tosync:String
  },
 
  data(){
      // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {
          paraentArr:this.arr,
          fromparent_vmodel:this.vmodel_msg,
          fromsync:this.tosync
        
      }
  },
  methods:{
      toParent(){
          // 在此处触发父组件中监听的事件myevent，并向父组件传递数据
          this.$emit("myevent","父组件接受到了吗？")
      },
      child1ToChild2(){
          // 通过一个外部vue实例，此实例相当于一个事件处理中心，触发一个事件
          eventHub.$emit("tochild2event",'从child1传递过来的消息');

          console.log(this.$attrs,"..this.$attrs......")
      },
      changfather(){
          this.$emit('vmodelevent','子改变了父中传过来的属性')
      },
      changfathersync(){
          this.$emit('update:tosync',"sync......update..666")
      }
  },
  mounted(){
      console.log(this,"....this...........");
  }






}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child1 {
    margin: 10px;
    background: green
}

</style>
