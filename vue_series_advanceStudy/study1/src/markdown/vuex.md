# vuex
> 是一种专门为vue.js应用程序开发提供的状态管理模式，简称全局状态管理
> 多应用于多组件嵌套传值，多组件共享一个状态，兄弟组件传值，路由之间的不同页面的传值
## 核心概念
### state
> 单一状态树，集中存储管理应用中各层级的数据
- 组件中获取state 
> 从 store实例中读取状态最简单的方法就是在计算属性中返回某个状态, 在多模块化的系统中，此方法需要每个模块都要导入store实例，繁琐。如下代码所示
```javascript
    // 创建一个 Counter 组件
    const Counter = {
        template: `<div>{{ count }}</div>`,
        // 从 store实例中读取状态最简单的方法就是在计算属性中返回某个状态
        computed: {
            count () {
                return this.$store.state.count
            }
        }
    }
``` 
- 利用Vue.use(Vuex)从根组件注入
> 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store new Vuex.Store({
    state:{},
});
const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
        <div class="app">
        <counter></counter>
        </div>
    `
})

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
- mapState 辅助函数
> 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，mapState返回的是一个对象，可用展开运算符...mapState()与其他的状态混合
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return this.$state.count + this.localCount
    }
  })
}
```
### mutation
>  mutations里面放的是方法，是改变state里面的数据唯一方法；Vuex 中的 mutation类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方.在 Vuex 中，mutation 都是同步事务
```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
``` 
- Store.commit()
> mutatios类似于注册了一些事件，但要触发这些事件，就必须调用store.commit(type)方法，提交对store状态树的改变命令
```javascript
store.commit('increment')
``` 
- 载荷 playload
> store.commit 可以传入额外的参数，即此处说的载荷
```javascript
//....
mutations: {
  increment (state, n) {
    state.count += n
  }
}
this.$store.commit('increment', 10)
```  
### Action
> action类似于mutation，但是不同于mutation的是，action提交的是mutation，还可以提交异步操作，
```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 此处提交mutation
  actions: {
    // Action 函数接受的参数context与 store 实例具有相同方法和属性
    increment (context) {
      context.commit('increment')
    }
  }
})
``` 
- dispatch 分发action
> 在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```  
### Module
> 由于是单一状态树，因此所有的状态可能会集中到一个很大的对象中，因此vuex使用module将store状态数根据实际需求分割成不同的模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块；
```javascript
//模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
// 模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
const moduleB = {
  state:{ctb:2},
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.ctb + rootState.ct) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

const store = new Vuex.Store({
  state:{
      ct:2
  }  ,
  modules: {
    a: moduleA,
    b: moduleB
  }
})

this.$store.state.a // -> moduleA 的状态
this.$store.state.b // -> moduleB 的状态
```  
- 命名空间
> 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应
```javascript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
``` 
- 模块动态注册 
> 在 store 创建之后，你可以使用 store.registerModule 方法注册模块,使用 store.unregisterModule(moduleName) 来动态卸载模块,但不能使用此方法卸载静态模块（即创建 store 时声明的模块）
```javascript
    // 注册模块 `myModule`
    store.registerModule('myModule', {
    // ...
    })
    // 注册嵌套模块 `nested/myModule`
    store.registerModule(['nested', 'myModule'], {
    // ...
    })
```
### Getter
> 有时候我们需要从 store 中的 state 中派生出一些状态，若有多个组件使用此状态，我们通常就是多个组件中都写此方法，或者提取出一个公共方法，然后每个组件引用。因此vuex用构造两个getters,可以认为是 store 的计算属性。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```javascript
    //计算属性。派生出的state中的一些数据
    computed: {
        doneTodosCount () {
            return this.$store.state.todos.filter(todo => todo.done).length
        }
    }
    // 构造getters,根据自己的需要缓存state中的部分数据
    const store = new Vuex.Store({
        state: {
            todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
            ]
        },
        //Getter 接受 state 作为其第一个参数,也可以接受另外一个getter作为第二个参数
        getters: {
            doneTodos: state => {
                return state.todos.filter(todo => todo.done)
            }
        }
    })

``` 
- 通过属性访问
> Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值
```javascript
    this.$store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
``` 
- 通过方法访问
```javascript
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
// 返回一个方法，可以传入参数
this.$store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
``` 
- mapGetters 辅助函数
> mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```     