<template>
  <div class="hello">
  <!-- 绑定数据到元素的相应位置    -->
   <div>{{text}}</div>
   <span v-text="text"></span>
    <!-- {{}}会把html当做字符串渲染到div内部    -->
   <div>{{html}}</div>
   <!-- 渲染html，需要使用v-html指令 -->
   <div v-html="html"></div>

    <!-- v-if,v-else-if ,v-else搭配使用，只有有一个条件符合，其他条件则不会被渲染 -->
   <div v-if="flag<0.1">我是if</div>
   <div v-else-if="0.1<flag<0.5">我是if-else-if-------1</div>
   <div v-else-if="0.5<flag<0.8">我是if-else-if-------2</div>
   <div v-else>我是v-else</div>
    <!-- v-show指令，根据表达式的值得真假修改css中display属性的值，不符合条件时，样式dispaly:none -->
   <div v-show="flag>0.5">我是v-show</div>

    <!-- 绑定事件 同时可以给事件添加修饰符 -->
    <div class="von_demo" v-on:click="clickMethod">点击我</div>
    <div class="von_demo" @click="clickMethod2(888)">点击我</div>
    <input class="von_demo" v-on:keyup.enter="keyupenter"/>

    <!-- 可以给被遍历的对象指定索引，如（item,index）in arr,(val,key,index) in object -->
    <div >
        <div v-for="(item,idx ) in data" :key="idx">
            {{item.pra}}
        </div>
    </div>
    <button  @click="changeData">修改数据</button>
    <button  @click="changeData1">修改数据1</button>

    <div>
        <!-- 给元素的属性动态的绑定属性值 -->
        <img v-bind:src="imgurl" alt="vv">
        <!-- 以对象或者数组的形式绑定类名 -->
        <div :class="{active:isactive}">active</div>
        <div :class="[activeborder,bcg]">active,bcg</div>
        <!-- 动态绑定内联样式 -->
        <div :style="{color:activecolor,fontSize:'15px'}">内联样式</div>
    </div>


    <div>
        <input type="text" v-model="value" placeholder="请输入数据">
        <span>正在输入的数据：</span><span>{{value}}</span>
        <input type="checkbox" value="lgx" id="1" v-model="checkboxArr">
        <input type="checkbox" value="laoda" id="2" v-model="checkboxArr">
        <input type="checkbox" value="hongqi" id="3" v-model="checkboxArr">
        <span>checkbox选择：</span><span>{{checkboxArr}}</span>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'
import img from '../assets/logo.png'

export default {
  name: 'Directives',

  data(){
    return {
      text:"报错",
      html:' <div><span style="color:red;"> html内容</span></div>',
      flag:Math.random(),
      data:[
          {pra:'liuguoxionglang'},
          {pra:25},
          {pra:"java"},
      ],
      imgurl:img,
      isactive:true,
      activeborder:'activeborder',
      bcg:'bcg',
      activecolor:'red',
      value:'',
      checkboxArr:[]
    }
  },
 /*在此处定义方法*/
  methods:{
      clickMethod(){
          alert(666)
      },
      clickMethod2(a){
          alert(a)
      },
      keyupenter(){
          alert("keyup____enter")
      },
      changeData(){
          this.data.push({pra:'man'});// 列表自动刷新
       
      },
    changeData1() {
        // 列表不会刷新
        //   this.data[3] = {pra:666};
          //列表自动刷新
        Vue.set(this.data,3,{pra:888});
        
      
    }
     

  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .von_demo {
        width: 100px;
        height: 50px;
        border: 1px solid red;
    }
    .active{
        width: 100px;
        height: 50px;
        border: 1px solid green;
        background: pink
        

    }
    .activeborder{
        width: 100px;
        height: 50px;
        border: 1px solid green
    }
    .bcg {
        background: blue
    }


</style>
