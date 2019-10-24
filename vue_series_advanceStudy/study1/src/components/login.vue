<template>
  <div class="login base">
    <div>
    我是login 组件
    </div>
    <slot name="loginslot"></slot>
    <!-- 通过此方式将当前接受到的事件监听器 传递到当前组件的子组件中去 -->
    <index v-on="$listeners" v-bind="$attrs"/>

  </div>
</template>

<script>
import index from './index.vue'
export default {
  name: 'login',
  components:{
    index
  },
  props:{
    // 接受pra，并定义接受规则
    pra:{
      type:Number,
      default:''
    },
    age:''

  },
  data(){
    return {
      name:'lgx',
    }
  },
  methods:{
    login(){
      console.log(this.name,"登录了.................");
      // 子组件中由于没有ref注册过，因此$refs对象为空对象
      console.log(this.$refs,"......子组件中.this.$refs....");
      // 获取父实例对象
      console.log(this.$parent,"....子组件中父实例..此处应该是instanceAttr组件...........");

      // 获取当前组件接受到的props参数
      console.log(this.$props.pra,"....this.$props.........")
    }
  },
  mounted(){
    // 获取当前组件的根元素，并获取根元素的属性 和类名
      console.log(this.$el.attributes,"...login组件中....获取根实例",this.$el.classList);
      
      // 此处能够获取到父组件被分发到此处的虚拟dom节点对象，此处可以获取到分发到的内容，同时还可获取到其上下文
      console.log(this.$slots.loginslot[0].elm,"............login组件。。。。。。this.$slots");
      
      // 获取当前组件树的根vue实例 此应用中就是app.vue对应的组件实例
      console.log(this.$root,"......this.$root......login组件中....");

      // 父作用域注册了myevent事件,因此此处能拿到此事件监听器函数
      console.log(this.$listeners,".this.$listeners.........login组件中..");

      // 当前组件接受了pra,age两个参数，其余的都会被$attrs属性获取到
      console.log(this.$attrs,"this.$attrs............login组件中......");
      //输出 {val: 666,job: "java"} "this.$attrs............login组件中......"

      // this.$scopedSlots对象对应每个插槽返回一个函数，每个函数返回一个相应的虚拟dom节点
      console.log(this.$scopedSlots.loginslot(),"this.$scopedSlots............login组件中.......");
  }

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
