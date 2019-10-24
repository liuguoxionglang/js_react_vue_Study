# vue api强化学习之-------特殊属性
## vue api 特殊属性
- is 
> 长用于构建动态组件且基于 DOM 内模板的限制
- slot
> 插槽，推荐使用2.6.0新出的v-slot
> 用于标记往哪个具名插槽中插入子组件内容。 
- scope
>  被 2.5.0 新增的 slot-scope 取代。推荐 2.6.0 新增的 v-slot
> 用于表示一个作为带作用域的插槽的 \<template> 元素，它在 2.5.0+ 中被 slot-scope 替代
> 用于将元素或组件表示为作用域插槽
- ref
> ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例  
- key 
> key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes 
- slot-scope 
>  推荐使用2.6.0新出的v-slot
> 用于将元素或组件表示为作用域插槽
### 父组件specialAttr.vue  
```javascript
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

``` 
### index.vue
```javascript
<template>
  <div class="hello">
    <div v-color="'red'">
    我是index 组件
    </div>
    <!-- 定义名为index的插槽 -->
    <slot name="index"></slot>

  </div>
</template>

<script>

export default {
  name: 'index',
  directives:{
    color:function(el,binding){
      el.style.color = binding.value
    }
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

```

