<template>
  <div class="hello">
      <!-- 构建动态组件 -->
      <div :is="currentComp"></div>
      <button v-on:click="changeComponent">改变组件</button>

      <!-- 使用keep-alive组件包裹其它条件渲染组件，不符合条件的则会被缓存，等下次条件成立时，则会立即渲染，提高渲染效率 -->
      <keep-alive>
          <div v-if="condition == 1">
              <span>我是111111111111</span>
          </div>
          <div v-else-if="condition == 2">
              <span>我是222222222222222</span>
          </div>
          <div v-else>
              <span>我是333333333333</span>
          </div>
      </keep-alive>

      <!-- css过渡示例，transition组件 名称为slide-fade， -->
      <div id="example-1">
        <button @click="show = !show">
            Toggle render
        </button>
        <transition name="slide-fade">
            <p v-if="show">hello</p>
        </transition>
      </div>
        <!-- css动画示例 -->
      <div id="example-2">
        <button @click="show = !show">Toggle show</button>
        <transition name="bounce">
            <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
        </transition>
      </div>

  </div>
</template>

<script>
import Vue from 'vue'
import login from '../components/login.vue'
import index from '../components/index.vue'
export default {
  name: 'BuildInComponent',
  components:{
      index,
      login
  },
  data(){
      return {
          data:[1,2,3,4],
          currentComp:index,
          condition:parseInt(Math.random()*3),
          show: true
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
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/* 也可以使用css动画 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

