# redux 原理进阶(源码梳理)(版本号4.0.4)
## 简述
> 是一个状态管理的js库,将所有的状态数据统一维护到一个store中，并提供给用户相应的方法来管理store中的数据。
## 核心api及原理介绍
- createStore(reduce,preloadedState,enhancer)
    > 第一个参数是一个reduce必须是一个函数，但是为了代码的模块化，在实际的应用中可能会把数据划分为多个模块，由于createStore函数只能有个一个reduce函数， redux作者就增加了combineReducers函数;
    > 第二个参数preloadedState是初始化时的状态对象；
    > 第三个参数是一个增强函数，redux的原始功能就是管理state状态树，为了在此基础上扩展其功能，比如处理异步的action，我们常见的比如redux-thunk,redux-saga,为了统一管理这些扩展，引入了applyMiddleware函数
    ```javascript
        /*createStore源码*/
        function createStore(reducer, preloadedState, enhancer) {
            var _ref2;
            /*第2,第3两个参数不能同时为函数*/
            if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
                throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
            }
            /*当第二个参数为函数，第三个参数没有时，则默认传入第二个参数为增强函数，初始值为undefined*/
            if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
                enhancer = preloadedState;
                preloadedState = undefined;
            }
            /*当第三个参数为一个函数时，次函数必须是个以ApplyMiddleware式的增强函数，增强后，再次包装调用createStore函数创建store，*/ 
            if (typeof enhancer !== 'undefined') {
                if (typeof enhancer !== 'function') {
                    throw new Error('Expected the enhancer to be a function.');
                }
                return enhancer(createStore)(reducer, preloadedState);
            }
            /*reducer必须是一个函数，通常都是纯函数*/
            if (typeof reducer !== 'function') {
                throw new Error('Expected the reducer to be a function.');
            }

            var currentReducer = reducer; /*当前的reducer对象*/ 
            var currentState = preloadedState; /*当前的状态state*/ 
            var currentListeners = []; /*当前的监听器队列*/ 
            var nextListeners = currentListeners; /*未来的监听器队列*/ 
            var isDispatching = false; /*是否正在dispatch*/ 

            /*判断未来的监听器与当前监听器是否相同*/
            function ensureCanMutateNextListeners() {
                if (nextListeners === currentListeners) {
                nextListeners = currentListeners.slice();
                }
            }


            /*...此处省略*/
            return _ref2 = {
                dispatch: dispatch,
                subscribe: subscribe,
                getState: getState,
                replaceReducer: replaceReducer
            };
        }
    ``` 
    - getState()
        > 获取状态树中的状态,把createStore创建的对象比作一个javaBean对象，则getState方法就是javabean中修改bean属性的get方法
        ```javascript
            function getState() {
                /*判断dispath方式是否正在执行*/
                if (isDispatching) {
                    throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
                }
            
                return currentState;
            }
        ``` 
    - dispatch()
        > 与getState()函数对应，修改redux中state的状态;在redux中想要修改state，只能使用dispacth函数发起,传达一个action给reducer，reducer会根据action和currentState以及自己的内部实现逻辑，来计算出新的state
        ```javascript
            function dispatch(action) {
                /*简单对象，即对象字面量或者new Object()创建的对象*/ 
                if (!isPlainObject(action)) {
                    throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
                }
                if (typeof action.type === 'undefined') {
                    throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
                }
                if (isDispatching) {
                 throw new Error('Reducers may not dispatch actions.');
                }
                try {
                    isDispatching = true;
                    /*执行当前的reduce函数获取新的状态树*/
                    currentState = currentReducer(currentState, action);
                } finally {
                    isDispatching = false;
                }
            
                var listeners = currentListeners = nextListeners;
                /*state更新了后，就如之前我们所说的subscribe，将注册的回调都触发一遍，都触发一遍，都触发一遍!!!*/ 
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                        listener();
                }
                return action;
            }
        ``` 
    - subscribe()
        > 一个监听state变化的监听器，redux中的状态树更新好，此监听器的回调函数都会自动执行，react-redux中应用了此原理；
        > 经典设计思想（个人意见）：此函数将传入的监听器回调放入回调器队列中后，立即返回了一个取消监听的闭包函数
        ```javascript
             function subscribe(listener) {
                if (typeof listener !== 'function') {
                    throw new Error('Expected the listener to be a function.');
                }
            
                if (isDispatching) {
                    throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
                }
            
                var isSubscribed = true;
                /* 判断当前的监听器队列和未来的是否一样，如果不一样那就将当前的赋值给未来的*/
                ensureCanMutateNextListeners();
                /*将监听器回调push到未来的监听器数组中*/ 
                nextListeners.push(listener);
                /*注册监听器后会返回一个取消监听的函数*/ 
                return function unsubscribe() {
                    /*如果是已经调用该函数取消监听了，则就中断函数继续向下执行*/ 
                    if (!isSubscribed) {
                        return;
                    }
                
                    if (isDispatching) {
                        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
                    }
                    /*取消订阅标志*/ 
                    isSubscribed = false;
                    ensureCanMutateNextListeners();
                    var index = nextListeners.indexOf(listener);/*找到当前的监听器回调函数，并从未来的监听器队列中移除*/
                    nextListeners.splice(index, 1);
                };
            }
        ``` 
    -  
- combineReducers(reducers)
    > 此函数是用来整合多个reducer函数, 因为createStore只接受一个reducer。 其参数是一个object对象，此函数返回了一个闭包的reduce函数；
    - reduce函数
        > 在了解combinereducers函数的源码之前，先看一个reduce到底是一个怎样的函数
        ```javascript
            /*reduce函数时一个纯函数，接受两个参数state对象,跟action对象，state为修改前的状态数对象，action是一个包含类型和数据两种数据的对象*/
            (state = {}, action) => {
                switch (action.type) {
                    case 'SHOWVEH_OWENERSHIP':
                    return Object.assign({}, state, action.datas);
                    case 'UPDATEVEH_OLDBYL':
                    return Object.assign({}, state, action.datas)
                    default:
                    return state
                }
           }
        ``` 
    - combineReducers()源码
        > 整合reducer函数的函数，是一个闭包函数，将多个reducer函数存放到一个闭包中的局部变量中
        ```javascript
           function combineReducers(reducers) {
                /*每个reducer函数的key*/ 
                var reducerKeys = Object.keys(reducers);
                var finalReducers = {}; /*保存符合要求的reducer函数*/
                for (var i = 0; i < reducerKeys.length; i++) {
                    var key = reducerKeys[i];
                
                    {
                    if (typeof reducers[key] === 'undefined') {
                        warning("No reducer provided for key \"" + key + "\"");
                    }
                    }
                
                    if (typeof reducers[key] === 'function') {
                        finalReducers[key] = reducers[key];
                    }
                }
                /*符合要求的reducer函数的key*/ 
                var finalReducerKeys = Object.keys(finalReducers); 
                var unexpectedKeyCache;
                {
                    unexpectedKeyCache = {};
                }
                
                var shapeAssertionError; /**形状断言错误*/
                
                try {
                    /*此函数是判断reducer函数的内部结构是否符合要求，如若不符合规定要求，则抛出异常*/
                    assertReducerShape(finalReducers);
                } catch (e) {
                    shapeAssertionError = e;
                }
                
                /*返回一个reducer函数*/
                return function combination(state, action) {
                    if (state === void 0) {
                        state = {};
                    }
                    if (shapeAssertionError) {
                        throw shapeAssertionError;
                    }
                    {
                    var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
                        if (warningMessage) {
                            warning(warningMessage);
                        }
                    }
                
                    var hasChanged = false; /*默认前后状态树无变化，即相同*/
                    var nextState = {}; /*本次更新好新的状态树*/
                
                    /*遍历每个reducer函数*/
                    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
                    var _key = finalReducerKeys[_i]; /*每个reducer函数的标识符*/
                    var reducer = finalReducers[_key]; /*每个reducer函数*/ 
                    var previousStateForKey = state[_key];/*本次更新前的每个reducer对应的状态*/
                    var nextStateForKey = reducer(previousStateForKey, action); /*执行一个reducer函数，并传入相应的参数，获得一个新的状态*/
                
                    if (typeof nextStateForKey === 'undefined') {
                        var errorMessage = getUndefinedStateErrorMessage(_key, action);
                        throw new Error(errorMessage);
                    }
                
                    nextState[_key] = nextStateForKey; 
                    /*更新前后的状态树是否相等，若不相等，则表示需要更新*/
                    hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                    }
                    
                    return hasChanged ? nextState : state;
                };
            }
        ``` 
- compose()
    > 组合函数，在函数式编程中经典思想。也就是数学中常说的复合函数，即f(g(x))；只是在此处，一个函数的返回值，作为另一个函数的变量传入，可以有n个这样的函数相互嵌套，如：a(b(c(n())));redux中也利用了这一思想，结合es6的语法和具体应用实现了自己的compose函数；
    - reduce函数的执行原理
        > array.reduce(callback, [initialValue]);
        > reduce()方法接收callback函数，function callback(preValue, curValue, index, array);
        > preValue: 上一次调用回调返回的值，没有传初始值则默认数组第一项为初始值;curValue: 数组中当前被处理的数组项;index: 当前数组项在数组中的索引值;array: 调用reduce()方法的数组
        ```javascript    
            var funcs = [];
            function func_1(state){
                console.log(state,"...........func_1");
                return ++state
            }
            function func_2(state){
                console.log(state,"...........func_2");
                return ++state
            }
            function func_3(state){
                console.log(state,"...........func_3");
                return ++state
            }
            function func_4(state){
                console.log(state,"...........func_4");
                return ++state
            }
            funcs.push(func_1);
            funcs.push(func_2);
            funcs.push(func_3);
            funcs.push(func_4);
            var aa =  funcs.reduce(function (a, b) {
                    return function () {
                        return a(b.apply(void 0, arguments));
                    };
                });
            console.log(aa(1));
            <!-- 输出 -->
            <!-- 1 "...........func_4" -->
            <!-- 2 "...........func_3" -->
            <!-- 3 "...........func_2" -->
            <!-- 4 "...........func_1" -->
            <!-- 5 -->
        ```
    - redux中compose源码   
        > redux中，利用组合函数将多个中间件函数有序的组合一起执行；
        ```javascript
            function compose() {
                /*redux中，此处的参数是一个中间件函数的数组*/
                for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
                    funcs[_key] = arguments[_key];
                }
                /*当数组中无函数对象时，默认返回一个函数，此函数输入和输出一样*/
                if (funcs.length === 0) {
                    return function (arg) {
                    return arg;
                    };
                }
                /*当数组中只有一个中间件函数时，返回此中间件函数*/
                if (funcs.length === 1) {
                    return funcs[0];
                }
                
                /*当数组的中中间件函数长度不止一个的时候，利用es6数组的reduce函数，返回多个中间件函数有序嵌套的函数*/
                return funcs.reduce(function (a, b) {
                    return function () {
                        return a(b.apply(void 0, arguments));
                    };
                });
            }
        ```  
- applyMiddleware()
    > applyMiddleware 函数接受不定数量的中间件函数，然后返回一个以createStore函数为参数的函数
    > 扩展redux功能，譬如处理异步的action，就可以使用redux-thunk和redux-saga这类中间件。总之，该函数为我们提供了无限的可能。
    > 最简单的中间件的格式: store => next => action => {}
    ```javascript
        function applyMiddleware() {
            /*遍历参数数组，按照参数顺序将中间件函数依次放到数组中*/
            for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
                middlewares[_key] = arguments[_key];
            }
            /*返回一个以createStore函数为参数的函数，返回的此函数作为增强函数，通常作为createStore函数的第三个参数*/
            return function (createStore) {
                /*返回的此函数，是一个类createStore函数,通常只接受reducers,preloadedState两个参数*/
                return function () {
                    /*调用createStore函数，创建一个新的store对象*/
                    var store = createStore.apply(void 0, arguments);

                    /*给每一个中间件定义一个默认的dispatch函数*/
                    var _dispatch = function dispatch() {
                        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
                    };
                    /*够造每一个中间件函数的参数store*/
                    var middlewareAPI = {
                        getState: store.getState,
                        dispatch: function dispatch() {
                        return _dispatch.apply(void 0, arguments);
                        }
                    };
                    /*返回中间件函数传入参数执行后的数组，按照中间的结构原理，这一行代码就是传入了store, 获得了 next => action => {} 的函数数组*/
                    var chain = middlewares.map(function (middleware) {
                        return middleware(middlewareAPI);
                    });
                    /*借用组合函数，将过个中间件函数依次嵌套，每个中间件函数接受一个dispatch函数，经过多个中间件的加工后，产生一个新的dispath函数*/ 
                    _dispatch = compose.apply(void 0, chain)(store.dispatch); 

                    /*经_objectSpread2函数处理之后，返回一个新的store对象*/
                    return _objectSpread2({}, store, {
                        dispatch: _dispatch
                    });
                };
            };
        }
    ```
    
- bindActionCreator(actionCreator, dispatch)
    > 用dispatch包裹actionCreator函数
    - actionCreator
        > 创建action的一个函数
        ```javascript
             function addTodo(text) {
                return {
                    type: 'ADD_TODO',
                    text
                }
            }
        ``` 
    - bindActionCreator源码
        > 若想让子组件不知道redux的存在，还想要使用dispath,则可使用bindActionCreator函数构建一个函数对象，如let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)，将此对象传入子组件，则子组件在调用此函数对象时，就可触发dispatch，修改state状态数
        ```javascript
            function bindActionCreator(actionCreator, dispatch) {
                /*返回一个可以触发dispath的函数*/
                return function () {
                    return dispatch(actionCreator.apply(this, arguments));
                };
            }
        ``` 
- bindActionCreators(actionCreators, dispatch)
    > 原理同bindActionCreator函数，只是多个actionCreator函数被dispatch包裹了
    ```javascript
        function bindActionCreators(actionCreators, dispatch) {
            /*actionCeators是单独的一个actionCreator函数时*/
            if (typeof actionCreators === 'function') {
                return bindActionCreator(actionCreators, dispatch);
            }
            
            if (typeof actionCreators !== 'object' || actionCreators === null) {
                throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
            }
            
            var boundActionCreators = {}; /*包含多个函数的对象，其中每个函数同bindActionCreator函数的返回值*/
            
            /*actionCreators是包含多个actioncreator函数的对象时*/
            for (var key in actionCreators) {
                var actionCreator = actionCreators[key];
            
                if (typeof actionCreator === 'function') {
                boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
                }
            }
            
            return boundActionCreators;
        }
    ```



 

