<template>
  <div class="communication">
      <div>我是父组件</div>
          <div>
            <span>从孙子组件传递过来的信息：</span>
            <span>{{fromGrandsonMsg}}</span>
        </div>

       <div class="child">
           <!-- 使用v-on监听子组件中的事件 myevent -->
           <child1 :arr="arr" @myevent="childEmit"
            :grandsonCompmsg="grandmsg" @grandEvent="grandCallMethod"
            v-model="vmodelmsg" :tosync.sync ="someMsg" >

           </child1>
           <div><span>子组件传递给父组件的数据:</span><span>{{childmsg}}</span></div>

       </div>
       <div class="child">
           <child2 ref="child2"></child2>
           <button @click="toChild2">向子组件传数据</button><br/>

           <span>子组件传递过来的数据：{{fromchild2}}</span>

            <button @click="alertvmodel">get----vmodelmsg</button>
        </div> 

    
   
 
  </div>
</template>
<script>
import Child1 from './child1.vue'
import Child2 from './child2.vue'
export default {
  name: 'Communication',
  data(){
      return {
        arr:[
              {national:'蜀国',emperor:'刘备'},
              {national:'吴国',emperor:'孙权'},
              {national:'魏国',emperor:'曹操'},

        ],
        childmsg:"",
        fromchild2:'',
        grandmsg:"孙子，收到我的信息了吗？",
        fromGrandsonMsg:"",
        vmodelmsg:"从父组件传递过来的vmodel_msg信息",
        someMsg:'从 父组件 .sync方式传递过来的信息......'
       
      }

  },
  provide:{
      providePra:[1,2,3]
  },
  components:{
      Child1,
      Child2
  },
   methods:{
       // 子组件调用父组件的中的此方法
       childEmit(pra){
           this.childmsg=pra;
       },
       // 通过$refs获取子组件的方法，通过此方法向子组件传递数据
       toChild2(){
           this.$refs.child2.updatePra("父组件传递过来的值");

           // 通过$children获取子组件的方法，通过此方法向子组件传递数据
           // 此处应该遍历获取到的vue实例数组，找到想要的子组件实例，因为$children获取到的子组件实例没法保证顺序
        
           console.log(this.$children[1],".........this.$children....");
           this.$children[1].updatePra('父组件传递过来的值>>>>>>>>')
       },
       // 子组件获取到父组件的实例后，通过自方法向父组件传递数据
       child2UpdateData(msg){
           this.fromchild2 = msg;
       },
       grandCallMethod(msg){
           this.fromGrandsonMsg = msg;
       },
       alertvmodel(){
           alert(this.vmodelmsg)
       }
   }






}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child {
    float: left;
    width: 800px;
    height: 400px;
    border: 1px solid goldenrod;
    background: gray;
    margin-left: 100px;
}

</style>
