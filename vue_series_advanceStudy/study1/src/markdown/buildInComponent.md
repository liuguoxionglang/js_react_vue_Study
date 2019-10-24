# vue api强化学习之-------内置组件
> vue创建的全局组件，我们可以在应用的任何地方使用此组件来组织我们的组件。
## \<component/> 
> 多应用与创建动态组件
> 参数有 is 和inline-template,前者多为字符串或自定义组件，后者为布尔类型，
### 代码示例
```javascript
<template>
  <div class="hello">
      <!-- 构建动态组件 -->
      <div :is="currentComp"></div>
      <!-- 按钮点击切换组件 -->
      <button v-on:click="changeComponent">改变组件</button>
  </div>
</template>

<script>
//两个自定义的组件
import login from '../components/login.vue'
import index from '../components/index.vue'
export default {
  name: 'BuildInComponent',
  components:{
      index,
      login
  },
  // 默认显示index组件
  data(){
      return {
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
```
## \<keep-alive></keep-alive>
> \<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 \<transition> 相似，\<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
> 此组件上的属性有 include,exclude,max,前两者为字符串或这则表达式，缓存/不缓存匹配到的组件，max表示最多可以缓存的组件数目。
> 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。
> 此组件通常与v-show,v-if，v-else-if,v-else,is等包含条件的组件结合使用
### 代码示例
```javascript
<template>
  <div class="hello">
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

  </div>
</template>

<script>
export default {
  name: 'BuildInComponent',
  data(){
      return {
          condition:parseInt(Math.random()*3)
      }
  },


  
 
}
</script>


``` 
## \<transition/>
> 添加被包裹元素的过渡效果，\<transition> 元素作为单个元素/组件的过渡效果。\<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在检测过的组件层级中。
> 通常与v-show v-if is等组合使用；
> 有css过渡和js过渡
> 常用属性：name：字符串，用于自动生成 CSS 过渡类名；css：布尔类型，是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子
> 还可以通过enter-class，leave-class等属性，自定义类名，通常在和第三方的动画库时结合使用；
- css过渡
    > css过渡的类名有transition属性的name属性值（记作v，若没有name属性值，则默认为v-）,组合以下几种构成：
    1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
    2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
    3. v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
    4. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
    5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
    6. v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
### 代码示例
```javascript
<template>
  <div class="hello">
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
export default {
  name: 'BuildInComponent',
  data(){
      return {
          show: true
      }
  },
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
```
- js过渡 
> 也可以在属性中声明 JavaScript 钩子函数，在钩子函数中，使用js进行动画的操作；
> 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成
> 对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。 
```javascript
// 使用js过渡，通常在组件中监听事件，并写好监听到的回调函数即可
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
``` 
[参考链接----官网](https://cn.vuejs.org/v2/guide/transitions.html)
[参考链接----掘金1](https://juejin.im/post/5cf411d8e51d4550a629b222)
[参考链接----掘金2](https://juejin.im/entry/5860808461ff4b006ce5d596)
## \<slot/> 
> vue的内容分发非常适合“固定部分+动态部分”的组件的场景，固定部分可以是结构固定，也可以是逻辑固定，比如下拉loading，下拉loading只是中间内容是动态的，而拉到底部都会触发拉取更多内容的操作，因此我们可以把下拉loading做成一个有slot的插件
### 参考链接
[原来vue的slot可以这么玩转](https://juejin.im/post/5ba453536fb9a05cf67a8729)
[细谈 vue - slot 篇](https://juejin.im/post/5cced0096fb9a032426510ad)
[对于 vue 的 slot 解释，最通俗易懂的版本](https://juejin.im/entry/5948c20efe88c2006a93a8fe)