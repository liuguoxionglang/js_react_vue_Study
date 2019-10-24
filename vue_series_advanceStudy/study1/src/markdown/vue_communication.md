# vue api强化学习之-------组件之间通信
> 除去vuex之外的方式，即vue内部组件之间的通信方式
## props 和 $emit
> props 是单向数据流方式，数据只能通过 props 由父组件流向子组件，而子组件并不能通过修改 props 传过来的数据修改父组件的相应状态
> 使用v-on在父组件引入子组件后的模板上监听子组件中的事件,$emit 可以触发使用v-on在父组件中监听的事件；
### 代码示例
- 父组件communication.vue 
```javascript
<template>
  <div class="communication">
      <div>我是父组件</div>

       <div class="child">
           <!-- 使用v-on监听子组件中的事件 myevent -->
           <child1 :arr="arr" @myevent="childEmit" ></child1>
           <div><span>子组件传递给父组件的数据:</span><span>{{childmsg}}</span></div>
       </div>
  
   
 
  </div>
</template>
<script>
import Child1 from './child1.vue'
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
      }

  },
  components:{
      Child1,
  },
   methods:{
       // 子组件调用父组件的中的此方法
       childEmit(pra){
           this.childmsg=pra;
       }, 
   }






}
</script>
  
``` 
- 子组件 child1.vue
```javascript
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

  </div>
</template>
<script>
export default {
  name: 'Child1',
  // 接受父组件传递过来的数据，并规定接受数据的类型
  props:{
      arr:{
          type:Array,
          default:[]
      }

  },
 
  data(){
      // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {
          paraentArr:this.arr
        
      }
  },
  methods:{
      toParent(){
          // 在此处触发父组件中监听的事件myevent，并向父组件传递数据
          this.$emit("myevent","父组件接受到了吗？")
      },
  }

}
</script>
``` 
## $parent 和 $children/$ref
> 通过this.$parent可以直接获得子组件的直系父组件
> 通过this.$chiildren可以获得当前组件的直系子组件，不过获取到的是一个实例数组，操作不太方便，利用子组件标签的ref属性，我们可以在父组件中直接使用this.$refs.xx获取到子组件的数据和方法，
### 代码示例
- 父组件communication.vue 
```javascript
<template>
  <div class="communication">
      <div>我是父组件</div>

       <div class="child">
           // 子组件绑定ref
           <child2 ref="child2"></child2>
           <button @click="toChild2">向子组件传数据</button><br/>

           <span>子组件传递过来的数据：{{fromchild2}}</span>

        </div> 
   
 
  </div>
</template>
<script>
import Child2 from './child2.vue'
export default {
  name: 'Communication',
  data(){
      return {
            fromchild2:''
      }

  },
  components:{
      Child2
  },
   methods:{
    
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
       }
   }

}
</script>
  
``` 
- 子组件 child2.vue
```javascript
<template>
  <div class="child2">
   <div>我是child2</div>
   <div>
       <span>我是从父组件传递过来的:</span>
       <span>{{fromParent}}</span><br/>

       <button @click="toparent">toparent</button>

   </div>
 
  </div>
</template>
<script>
export default {
  name: 'Child2',
 
  data(){
      // 根级响应式属性，全部在此处声明
      return {
          fromParent:"",  
      }
  },
  methods:{
      // 父组件通过此方法向子组件传参
      updatePra(msg){
          this.fromParent = msg
      },
      // 通过$parent获取父组件实例对象，并向父组件传递数据
      toparent(){
          this.$parent.child2UpdateData("child2传递过来的数据，父组件收到了吗？")
      }
  }
}
</script>
```  
## $on 和 $emit
> $on 监听当前实例上的自定义事件
> $emit 触发当前实例上的自定义事件
> $emit和$on只能作用在一一对应的同一个组件实例上，因此要使用这两个方法进行组件之间的通信，则需要引入一个空的vue实例
### 代码示例
> 此示例是从child1组件向child2组件传递消息，若想要从child2向child1组件传递消息，按下面流程将触发器跟监听器再返回来写一套即可；
- 事件处理中心（一个空的vue实例） eventHub.js
```javascript
import Vue from 'vue';

// 创建一个vue实例，用于组件之间的信息传递
const eventHub = new Vue();

export  default eventHub;
```  
- 子组件child1.vue (child1与child2为兄弟组件)
```javascript
<template>
  <div class="child1">
      <div>我是child1</div>
      // 从child1组件向child2组件传递消息，
      <div> 
          <button @click="child1ToChild2">child1向child2发送信息</button>
      </div>
 
  </div>
</template>
<script>
import eventHub from './eventHub.js'
export default {
  name: 'Child1',
  methods:{
      child1ToChild2(){
          // 通过一个外部vue实例，此实例相当于一个事件处理中心，触发一个自定义事件
          eventHub.$emit("tochild2event",'从child1传递过来的消息');
      }
  }

}
</script>
  
``` 
- 子组件 child2.vue
```javascript
<template>
  <div class="child2">
   <div>我是child2</div>
   <div>
       <div>
           显示从child1中获取到的信息：{{fromchild1}}
       </div>
   </div>
 
  </div>
</template>
<script>
import eventHub from './eventHub.js'
export default {
  name: 'Child2',
 
  data(){
      // 根级响应式属性，全部在此处声明
      return {
          fromchild1:'',
        
      }
  },
  // 在此处需要首先监听事件
  mounted(){
      const that = this;
      // 组件挂载之后开始监听tochild2event事件，并进行回调函数的处理
      eventHub.$on("tochild2event",function(msg){
          that.fromchild1 = msg;
      })
  },

}
</script>
```  
## $attrs 和 $listeners 
> vm.$attrs，包含了父作用域中没有被props接受的属性，class和style除外；
> vm.$listeners,包含了父作用域中的v-on事件监听器，不包括.native修饰符修饰的
> $attrs 和 $listeners 来能够直线隔代组件之间的消息互通,中间组件可通过v-bind='$attrs' | v-on='$listeners'将信息直接传递给其后代组件
> $listeners 和 $attrs 两者表面层都是一个意思，$attrs 是向下传递数据，$listeners 是向下传递方法，底层组件中可直接手动调用 $listeners 对象里的方法;
### 代码示例
- 父组件communication.vue 
```javascript
<template>
  <div class="communication">
      <div>我是父组件</div>
          <div>
            <span>从孙子组件传递过来的信息：</span>
            <span>{{fromGrandsonMsg}}</span>
        </div>

       <div class="child">
           <!-- 使用v-on监听子组件中的事件 myevent grandsonCompmsg和grandEvent都是给孙子组件的 -->
           <child1 :arr="arr" @myevent="childEmit" :grandsonCompmsg="grandmsg" @grandEvent="grandCallMethod"></child1>
       </div>
  </div>
</template>
<script>
import Child1 from './child1.vue'
export default {
  name: 'Communication',
  data(){
      return {
          arr:[
              {national:'蜀国',emperor:'刘备'},
              {national:'吴国',emperor:'孙权'},
              {national:'魏国',emperor:'曹操'},

            ],
        
            grandmsg:"孙子，收到我的信息了吗？",
            fromGrandsonMsg:""

      }

  },
  components:{
      Child1,
  },
   methods:{
       grandCallMethod(msg){
           this.fromGrandsonMsg = msg;
       }
   }

}
</script>
  
``` 
- 子组件 child1.vue
```javascript
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
    
      <div>
          <!-- 此处通过 v-bind='$attrs'和v-on='$listeners'向孙子组件传递数据和方法 -->
          <child1-child v-bind="$attrs" v-on="$listeners"></child1-child>
      </div>
 
   
 
  </div>
</template>
<script>
import Child1Child from './child1_child.vue'
export default {
  name: 'Child1',
  // 为true时，从父组件中传入的,此组件没有通过props接受的参数，都会自动成为子组件根标签上的属性;此时 $attrs中也存在
  // 若为false，则没有被props接受的参数，都回保存到 $attrs中去
  inheritAttrs: false,
  components:{
      Child1Child
  },

  // 接受父组件传递过来的数据，并规定接受数据的类型
  props:{
      arr:{
          type:Array,
          default:[]
      }

  },
 
  data(){
      // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {
          paraentArr:this.arr
        
      }
  },
 
}
</script>
```
- 子组件 child1_child.vue 
```javascript
<template>
  <div class="child1_child">
      <div>我是child1的child</div>
      <div>
          <span>我是从爷爷组件中获取到的信息：{{fromGrandfarherMsg}}</span>
      </div>
      <button @click="$listeners.grandEvent('爷爷，你收到我发的信息了吧')">我要给爷爷发信息</button>
     
  </div>
</template>
<script>
export default {
  name: 'Child1Child',
  // 为true时，从父组件中传入的,此组件没有通过props接受的参数，都会自动成为子组件根标签上的属性;此时 $attrs中也存在
  // 若为false，则没有被props接受的参数，都回保存到 $attrs中去
  inheritAttrs: false,

 // 接受爷爷组件传递过来的数据，并规定接受数据的类型
  props:{
      grandsonCompmsg:{
          type:String,
          default:""
      }
  },
 
  data(){
     // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {
          fromGrandfarherMsg:this.grandsonCompmsg
      }
  },


}
</script>

```   
## v-model 和 :xx.sync
> v-model通常用在表单组件的双向数据绑定，当然，组件之前的通信也可用v-model来实现,组件之间使用v-model绑定参数时，默认绑定在value属性上，同时默认给绑定了input事件；如：<component v-model="xx">相当于：<component v-bind:value="xx" v-on:input="xx = arguments[0]">
> 组件属性可通过sync修饰符，从而使得组件之间可进行双向的数据绑定，使用sync显示符时，此处在绑定一个属性foo时，默认绑定了一个update:foo的事件，如下所示：<demo :foo.sync="something"></demo> 相当于<demo :foo="something" @update:foo="val => something = val"></demo> 
### 代码示例
- 父组件 communication.vue
```javascript
<template>
  <div class="communication">
      <div>我是父组件</div>
      

       <div class="child">
           <!-- v-model给子组件绑定vmodelmsg时，同时默认绑定了input事件给子组件，子组件中使用默认使用value接受属性，也可以在子组件中使用model选项自定义接受属性名及事件名 使用$emit触发事件即可-->
           <!--  此处使用sync绑定tosync属性的同时，默认绑定了update:tosync事件给子组件，子组件中props中接受tosync属性即可，使用$emit('update:tosync'，xx)触发事件即可-->
           <child1 
            v-model="vmodelmsg" :tosync.sync ="someMsg" >

       </div>
  </div>
</template>
<script>
import Child1 from './child1.vue'
export default {
  name: 'Communication',
  data(){
      return {
        vmodelmsg:"从父组件传递过来的vmodel_msg信息",
        someMsg:'从 父组件 .sync方式传递过来的信息......'

      }

  },
  components:{
      Child1,
  },
  
}
</script>

``` 
- 子组件child1.vue 
```javascript
<template>
  <div class="child1">
      <div>我是child1</div>
     
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
 
   
 
  </div>
</template>
<script>
export default {
  name: 'Child1',
  // 为true时，从父组件中传入的,此组件没有通过props接受的参数，都会自动成为子组件根标签上的属性;此时 $attrs中也存在
  // 若为false，则没有被props接受的参数，都回保存到 $attrs中去
  inheritAttrs: false,
 
 // 次数可以自定义接受v-model绑定的属性及时间名称
  model:{
      prop:"vmodel_msg",
      event:"vmodelevent"

  },
  // 接受父组件传递过来的数据，并规定接受数据的类型
  props:{
      vmodel_msg:String,
      tosync:String
  },
 
  data(){
      // 将props中接受到的数据缓存到此处是必要的，因为你不能直接修改 props 的值
      return {

          fromparent_vmodel:this.vmodel_msg,
          fromsync:this.tosync
        
      }
  },
  methods:{
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
``` 
## provide 和 inject
> provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性
> inject 选项应该是：一个字符串数组，或一个对象，对象的 key 是本地的绑定名，value 是注入时的key
> 在父组件中通过 provider 来提供属性，然后在子组件中通过 inject 来注入变量。不论子组件有多深，只要调用了 inject 那么就可以注入在 provider 中提供的数据，而不是局限于只能从当前父组件的 prop 属性来获取数据，只要在父组件的生命周期内，子组件都可以调用。这和 React 中的 Context API 有没有很相似！
### 代码示例
- 父组件communication.vue
```javascript
<template>
  <div class="communication">
      <div>我是父组件</div>
      
       <div class="child">
           <child1 ></child1>
        </div>
  </div>
</template>
<script>
import Child1 from './child1.vue'
export default {
  name: 'Communication',
  data(){
      return {
  
      }

  },
  // 使用provide注入数据
  provide:{
      providePra:[1,2,3]
  },
  components:{
      Child1,
  },


}
</script>
``` 
- 子组件child1.vue 
```javascript
<template>
  <div class="child1">
      <div>我是child1</div>

      <div>
          <h1>父组件中provide传递的：{{fromParentProvide}}</h1>
      </div>

  </div>
</template>
<script>
export default {
  name: 'Child1',
// 此处使用字符串数据或者对象的形式都可以接受到
//   inject:['providePra'],
  inject:{
      'fromParentProvide':'providePra'
  },
}
</script>
``` 
## 中央事件总线EventBus
> 中央事件总线其实就是$on和$emit在应用上的全局使用，上面是只是在局部组件中引入使用，在全局使用测，在跟组件创建之前，先定义中央事件总线：const EventBus = new Vue();然后将中央事件总线赋值到 Vue.prototype 上，即Vue.prototype.$EventBus = EventBus;这样所有组件都能通过this.$EventBus访问到了，然后使用this.$EventBus.$on和this.$EventBus.$emit监听和触发事件，从而进行各种类型之间的组件通信
