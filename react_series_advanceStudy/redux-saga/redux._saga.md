# saga redux-saga 原理学习
> Redux-saga是redux应用的又一个副作用模型。可以用来替换redux-thunk中间件。 redux-saga 抽象出 Effect （影响, 例如等待action、发出action、fetch数据等等），便于组合与测试,是处理异步数据的插件之一
> 主要使用了拦截action，并监听对异步操作的每一步；