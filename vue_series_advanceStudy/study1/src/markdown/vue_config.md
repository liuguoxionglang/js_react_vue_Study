# vue api强化学习之-------全局配置参数(抄了一遍官网，留个影响)
> Vue.config 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：
- silent
> 布尔型，默认false;
> 是否 取消 Vue 所有的日志与警告。 
- optionMergeStrategies
> 自定义合并策略，默认一个空对象，对象中的键值通常是函数
> 合并策略选项分别接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，Vue 实例上下文被作为第三个参数传入 
- devtools
> 布尔类型
> 配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查
- errorHandler
> 一个函数对象，指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例
```javascript
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```  
- warnHandler
> 一个函数对象，为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略
```javascript
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```  
- ignoredElements
> 数组对象，须使 Vue 忽略在 Vue 之外的自定义元素 (如使用了 Web Components APIs)。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告 
- keyCodes
> 类型：{ [key: string]: number | Array<number> } 默认一个空对象，
> 给 v-on 自定义键位别名 
```javascript
Vue.config.keyCodes={
    f8:88,
    up:[37,38,39]
}
``` 
- performance
> 布尔类型，默认false;设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪 
- productionTip
> 布尔类型，默认true,
> 设置为 false 以阻止 vue 在启动时生成生产提示 