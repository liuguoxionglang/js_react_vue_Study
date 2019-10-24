## main.js
    import Toast from './components/toast/toast';
    Vue.use(Toast);   //封装的messagebox组件 通过this调用
## 复制代码home.vue 具体使用
this.$toast.show({
    text: '复制成功',
    time:'2000', //显示的时间
})
