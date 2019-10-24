# vue api强化学习之-------全局api
> Vue提供的一套静态方法
## Vue.use
> Vue.use( plugin )
> 注册vue插件，插件可以是一个对象或者函数，若为对象时，必须提供install方法；若为函数时，它会被作为install方法使用，install方法被调用时，Vue会被作为参数传入。
> 此方法必须在调用创建根实例的new Vue()之前调用；
```javascript
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
// 创建根实例之前 注册路由插件
Vue.use(Router);
// 创建路由实例
var router = new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:xx
        },
    ]
})
// 将路由实例传入vue根组件
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```  
## Vue.component
> 用法：Vue.component( id, [definition] )
> id,给注册的组件一个唯一标识，此id在注册的过程中也被被设置成组件名称；definition为注册组件时的配置选项。
> 注册或获取全局组件，当值传入id时时获取，两个参数都传入时是注册组件； 
## Vue.directive
> 用法：Vue.directive( id, [definition] )
> 参数形式同Vue.component
> 注册或获取全局指令
## Vue.filter
> 用法：Vue.filter( id, [definition] )
> 参数形式同Vue.component
> 注册或后去全局过滤器
## Vue.mixin
> 语法：Vue.mixin( mixin )
> 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用
## Vue.extend
> 语法：Vue.extend( options )
> 使用基础 Vue 构造器，创建一个新的Vue子类构造器，参数是一个包含组件选项的对象。
> data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数 
```javascript
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#app')
``` 
## 以上几个常用方法示例
- main.js
```javascript
import Vue from 'vue'
import App from './App.vue'
import fistdemo from './views/definecomp.vue'
import msgboxVue from './views/messageBoxExtend/messageBox.vue';  


/*********************注册全局指令************************** */
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})


/*********************注册全局插件************************** */
// 全局注册自定义插件
const compo = {
  // 添加install方法，第一个参数必须是Vue
  install:function(Vue){
    Vue.component("first-demo",fistdemo)
  }
}
// 插件是一个对象时，必须有install方法
Vue.use(compo)


/*********************注册全局过滤器************************** */

Vue.filter("capitalize",function(value){
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/*********************全局混入************************** */

Vue.mixin({
  created:function(){
    console.log('全局混入。。。。。')
  },
  errorCaptured:function(a,b){
    return false;
  },
  methods:{
    alertInfo(msg){
      alert(msg)
    }
  }

})

/*********************此插件中利用Vue.extend构建子类构造器，构建了一个插件************************** */
// 定义插件对象
const MessageBox = {};
// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue, options) {
  // 构造一个新的Vue构造器
  const MessageBoxInstance = Vue.extend(msgboxVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = {
    showMsgBox (options) {
      if (!currentMsg) {
        initInstance();
      }
      if (typeof options === 'string') {
        currentMsg.content = options;
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options);
      }
//  Object.assign方法只会拷贝源对象自身的并且可枚举的属性到目标对象
      return currentMsg.showMsgBox()
        .then(val => {
          currentMsg = null;
          return Promise.resolve(val);
        })
        .catch(err => {
          currentMsg = null;
          return Promise.reject(err);
        });
    }
  };
};
Vue.use(MessageBox);   //封装的messagebox组件 通过this调用

new Vue({
  render: h => h(App),
}).$mount('#app')

```
- definecomp.vue 插件一
> 此文件中定义一个非常简单的插件，在main.js中全局注册，在应用组件中应用即可
```javascript
<template>
  <div class="definedcomp">
     <div>{{msg}}</div>
     
 
  </div>
</template>
<script>
export default {
  name: 'fist-demo',
  data(){
      // 根级响应式属性，全部在此处声明
      return {
        msg:'我是全局注册的组件'
      }
  },
}
</script>
```
- messageBox.vue 插件二
> 定义一个全局组件，并在man.js中利用vue.extend，Vue.prototype,vue.use注册为一个全局插件
```javascript
<template>
  <div class="dialog_views" v-show="isShowMessageBox" @touchmove.prevent>
    <div class="UImask" @click="cancel"></div>
    <transition name="confirm-fade">
      <div class="UIdialog" v-show="isShowMessageBox">
        <div class="UIdialog_hd">{{title}}</div>
        <div class="UIdialog_bd">
          <slot>{{content}}</slot>
        </div>
        <div :class="[ isShowCancelBtn ? 'UIdialog_ft' : 'UIdialog_ft UIdialog_ft_one']">
          <span v-if="isShowCancelBtn" class="UIdialog_btn" @click="cancel">{{cancelVal}}</span>
          <span v-if="isShowConfimrBtn" class="UIdialog_btn" @click="confirm">{{confirmVal}}</span>
        </div>

      </div>
    </transition>
  </div>

</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
    };
  },
  props: {
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    isShowCancelBtn: {  //是否展示取消按钮
      type: Boolean,
      default: true
    },
    title: {   //标题
      type: String,
      default: '提示',
    },
    confirmVal: {
      type: String,  //确认文字
      default: '确定'
    },
    cancelVal: {   //取消文字
      type: String,
      default: '取消'
    },
    maskHide: {
      type: Boolean,   //是否可以点击蒙层关闭
      default: true
    }
  },


  methods: {
    // 确定,将promise断定为resolve状态
    confirm() {
      this.isShowMessageBox = false;
      this.resolve('confirm');
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel() {
      this.isShowMessageBox = false;
      this.reject('cancel');
      this.remove();
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox() {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    remove() {
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    destroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    },

  }
};

</script>
<style  scoped>
.UImask {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.UIdialog {
  position: fixed;
  z-index: 999;
  width: 80%;
  max-width: 400px;
  display: table;
  z-index: 5000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transition: opacity 0.3s, transform 0.4s;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  padding: 30px 40px;
}
.UIdialog_hd {
  font-weight: bold;
  font-size: 34px;
  letter-spacing: 1px;
}
.UIdialog_bd {
  margin: 40px 0;
  text-align: center;
  font-size: 24px;

}
.UIdialog_bd p{
    display: inline-block;
    text-align:left; 
}
.UIdialog_ft {
  position: relative;
  font-size: 28px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  margin-bottom: -5px;
  padding-top: 15px;
}
.UIdialog_btn {
  display: block;
  text-decoration: none;
  position: relative;
  display: block;
  background-color: #000;
  border-radius: 40px;
  padding: 12px 45px;
}
.UIdialog_ft_one {
  text-align: center;
  justify-content: center;
}

/* 进入和出去的动画 */
.confirm-fade-enter-active {
  animation: bounce-in 0.5s;
}
.confirm-fade-leave-active {
  animation: bounce-in 0.5s reverse;
}
.confirm-fade-enter,
.confirm-fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

</style>


```  
   
- overallApi.vue 应用组件
>  应用自定义的插件
```javascript
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

``` 
## Vue.nextTick
> 语法： Vue.nextTick( [callback, context] )
> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
> 同 vm.$nextTick类似
``` javascript
    // 修改数据
    vm.msg = 'Hello'
    // DOM 还没有更新
    Vue.nextTick(function () {
    // DOM 更新了
    })
```
## Vue.set
> 语法：Vue.set( target, propertyName/index, value )
> 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性，注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象
## Vue.delete
> 语法：Vue.delete( target, propertyName/index )
> 删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它
> 目标对象不能是一个 Vue 实例或 Vue 实例的根数据对象
## Vue.compile
> Vue.compile( template )
> 在 render 函数中编译模板字符串。只在独立构建时有效
## Vue.version
> 获取Vue的安装版本号
## Vue.observable
> Vue.observable( object )
> 让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
> 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器