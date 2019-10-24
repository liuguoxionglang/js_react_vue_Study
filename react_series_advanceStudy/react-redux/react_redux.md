# react-redux 原理进阶(源码梳理)(版本号7.1.1)
## 简述
> react与redux之间的桥梁， 其主要有两大方面的作用：
> 第一，通过将store传入root组件的context，使子节点可以获取到 state。 
> 第二，通过store.subscribe 订阅store的变化，更新组件。 另外还有对于性能的优化，减少不必要的渲染。
## 核心api及原理介绍

- connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2)
    > connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来;
    > connect方法的第一参数mapStateToProps，当有此参数时，UI 组件就会订阅Store，Store 的更新就会引起UI组件的更新
    > connect方法的第一参数mapDispatchToProps，当有此参数时，UI 组件就会订阅Store，Store 的更新就会引起UI组件的更新
    - connect的应用
        ```javascript
            /*先定义一个UI组件*/
            class MainPanelPhone extends Component {render(){return()}}
            /**
             *  mapStateToProps 用来创建一个从（外部的）state对象到（UI 组件的）props对象的映射关系。mapStateToProps会订阅 Store，当state更新时，就会自动重新计算 UI 组件的参数，从而触发重新渲染
             *  mapStateToProps 的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象；
             *  */
            const mapStateToProps = (state) => {
                console.log("总的state", state);
                return {
                    vehflow: state.vehflow,
                    vehflowzb: state.vehflowzb,
                }
            };
            /**
             *  mapDispatchToProps 用来建立UI组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
             *  若 mapDispatchToProps是一个函数，会得到dispatch和ownProps两个参数，如下示例所示；
             *  若 mapDispatchToProps是一个对象，它键名对应UI组件的同名参数，键值应该是一个 actionCreator函数 ，返回的 action会由Redux自动发出;
             */
            const mapDispatchToProps = (dispatch,ownProps) => {
                return {
                    onClick: () => {
                    dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: ownProps.filter
                    });
                    }
                };
            }
            /*用connect高阶函数把一个UI组件生成容器组件*/
            export default connect(mapStateToProps,mapDispatchToProps)(MainPanelPhone)
        ```    
    - connect源码 
        ```javascript
            function createConnect(_temp) {

                /*省略部分代码*/
                
                /*返回connect高阶函数*/
                return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {

                    /*省略部分代码*/

                    /*此处的connectHoc函数时之前定义的函数，初始化是就是connectAdvanced函数,详解如下*/
                    return connectHOC(selectorFactory, _ref);
                };
            }


            /**
            * selectorFactory函数返回一个selector函数，根据store state, 展示型组件props,和dispatch计算得到新props，最后注入容器组件，selectorFactory函数结构形如：
            */
            (dispatch, options) => (state, props) => ({ 
                thing: state.things[props.thingId],  
                saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
            })


            function connectAdvanced(selectorFactory,  _ref) {
                /*省略部分代码*/
                /*返回一个以组件为参数的函数*/ 
                return function wrapWithConnect(WrappedComponent) {
                    /*省略部分代码*/

                    /*类似Object.assign，将子组件的非React的静态属性或方法复制到父组件，React相关属性或方法不会被覆盖而是合并。*/
                    return hoistNonReactStatics_cjs(Connect, WrappedComponent);
                };
            }
                    
            /*获取到connect方法*/
            var connect = createConnect();
                  


        ```     
- provider
    > connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。一种解决方法是将state对象作为参数，传入容器组件,但是这样，当组件多层嵌套时，逐级往下传递比较麻烦。
    > Provider本质上是一个react组件，通过react的context api(使一个组件可以跨多级组件传递props)挂载redux store中的state，并且当组件初始化后开始监听state。当监听到state改变，Provider会重新setState在context上的storeState
    - 应用
        > 是一个组件，用来接受store,再经过它的手通过context api传递给所有的子组件
        ```javascript
            ReactDOM.render(
                <Provider store={store}>
                    {/* <Router history={history}>
                        <Route exact path="/" component={MainPanel} />
                    </Router> */}
                    <MainPanel />
                </Provider>,
                document.getElementById("root")
            )
        ```
    - 源码
        > 利用函数原型，给provider组件函数定义了周期函数 ，并通过context上下文向子组件共享了store
        ```javascript
            var Provider =function (_Component) {
                /*provider使用原型继承_Componnet*/
                _inheritsLoose(Provider, _Component);
            
                function Provider(props) {
                    var _this;
            
                    _this = _Component.call(this, props) || this;
                    var store = props.store; /*传入的store*/
                    _this.notifySubscribers = _this.notifySubscribers.bind(_assertThisInitialized(_this));
                    /*创建监听器对象*/
                    var subscription = new Subscription(store);
                    subscription.onStateChange = _this.notifySubscribers;
                    /*保存状态树和订阅器到该组件的state上*/
                    _this.state = {
                    store: store,
                    subscription: subscription
                    };
                    _this.previousState = store.getState();
                    return _this;
                }
                var _proto = Provider.prototype;

                _proto.componentDidMount = function componentDidMount() {
                    this._isMounted = true;
                    this.state.subscription.trySubscribe();/*创建监听器及监听器队列相关方法*/
                    /*当前后状态变化时，依次执行监听提队列中的回调函数*/
                    if (this.previousState !== this.props.store.getState()) {
                    this.state.subscription.notifyNestedSubs();
                    }
                };
            
                _proto.componentWillUnmount = function componentWillUnmount() {
                    if (this.unsubscribe) this.unsubscribe();  /*组件移除时，则取消监听*/
                    this.state.subscription.tryUnsubscribe();
                    this._isMounted = false;
                };
            
                _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
                    /*组件完成更新之后，前后状态变化时，先取消原来的监听器，再创建新的监听器*/
                    if (this.props.store !== prevProps.store) {
                    this.state.subscription.tryUnsubscribe();
                    var subscription = new Subscription(this.props.store);
                    subscription.onStateChange = this.notifySubscribers;
                    this.setState({
                        store: this.props.store,
                        subscription: subscription
                    });
                    }
                };
                /*逐个执行监听器队列中的回调函数*/
                _proto.notifySubscribers = function notifySubscribers() {
                    this.state.subscription.notifyNestedSubs();
                };
            
                _proto.render = function render() {
                    /*创建context上下文对象，默认ReactReduxContext = React.createContext(null);*/
                    var Context = this.props.context || ReactReduxContext;
                    /*Context.provider返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。接收一个 value 属性，传递给消费组件*/
                    return React__default.createElement(Context.Provider, {
                    value: this.state
                    }, this.props.children);
                };
            
                return Provider;
            }(React.Component);
        ``` 