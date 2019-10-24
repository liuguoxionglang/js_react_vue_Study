import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import './components/global/global_Component'
import router from './routers/routers'
import store from './store/store'
import fistdemo from './views/definecomp.vue'
// import MessageBox from './views/messageBoxExtend/messageBox';
import msgboxVue from './views/messageBoxExtend/messageBox.vue';  

Vue.config.productionTip = false
// Vue.config.silent = true




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
  router,
  render: h => h(App),
}).$mount('#app')
