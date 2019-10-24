function createConnect(_temp) {

  /*省略部分代码*/
 
  /*返回connect高阶函数*/
  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {

    /*省略部分代码*/

    /*此处的connectHoc函数时之前定义的函数，初始化是就是connectAdvanced函数*/
    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // 若 mapStateToProps 没有 ，则 Connect component 就不会订阅Store
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
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

