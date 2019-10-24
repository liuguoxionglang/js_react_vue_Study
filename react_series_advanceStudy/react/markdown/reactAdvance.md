# react 原理进阶( React v16.9.0)
## reactelement元素的创建
> 用jsx语法编写的代码先经babel编译，然后再通过react.createElemet()方法的加工后形成reatElement元素对象
- 创建reactelement元素对象
```javascript
    // react中的函数
     const virtual_dom =()=>{
            return(
                <div className='no_test_percent' style={{height:20}}>
                    <div>0</div>
                    <div>2222</div>
                </div>
            )

    }
    //经babel的编译后，上述函数应该是这样
    const virtual_dom =()=>{
            return  React.createElement(
                    ‘div’,
                    { className: ‘no_test_percent’,style={height:20} },
                    [
                        React.createElement(
                            ‘div’,
                            { },
                            0
                        ),
                        React.createElement(
                            ‘div’,
                            { },
                            222
                        ),
                    ]

                )
            return(
                <div className='no_test_percent' style={{height:20}}>
                    <div>0</div>
                    <div>2222</div>
                </div>
            )

    }
   
    // 经react构建后的reactelement
    {
        $$typeof: Symbol(react.element) //reactelement对象的标识符
        key: null //元素对象的唯一标识符
        props: {
            children: (2) [{…}, {…}]
            className: "no_test_percent"
            style: {height: 20}
        }   // props 存放元素属性和子元素
        ref: null
        type: "div"
        _owner: null
        _store: {validated: false}
        _self: null
        _source: null
        __proto__: Object
    }
    // 把函数转换成reactElemt的过程中，ReactElement.createElement(type, config, children) 做了三件事：
    // 1) 把 config里的数据一项一项拷入props, 
    //2) 拷贝 children 到 props.children， 
    //3) 拷贝 type.defaultProps 到 props;

```
## react组件渲染
> react 16之前reactDom.render()渲染方法采用的是同步虚拟dom的渲染，渲染过程中不能中断，长时间占用浏览器主线程，这就导致类似一些鼠标，键盘灯操作不能及时响应；
> react 16之后reactDom.render()渲染方法采用的是异步渲染虚拟dom，就是把渲染任务分片，再加上调度管理，提高了响应速度；其中任务的分片主要引用了Fiber技术；
-  Fiber
> Fiber就是通过对象记录组件上需要做或者已经完成的更新，一个组件可以对应多个Fiber。Fiber是一个链表
- fibertree的结构如下：
  > fiber是一个链表，render()过程中，首先是reactElemt树转Fiber链表的过程
  ```html
    // 假如有如下代码，则它对应的fiber链表结构如下
    <div class="A">
        <div class="B">
            <span class="D"></span>
            <span class="E"></span>
        </div>
        <span class="C"><span>
    </div>
    // fiber链表结构 child:表示父节点的第一个子节点，return : 表示子节点的父节点，sibling:表示子节点的下一个兄弟节点
    A ----child----> B -----child-----> D

    B ---- return ----> A
    B ---- sibling ----> C
    C -----return ------>A

    D ---- return ----> B
    D ---- sibling ----> E
    E-----return ------>B

  ```
- reactDom.render()初始调用
>  render()函数开始执行时，首先会根据dom容器中是否包含root，若没有root对象，则会创建root对象，此过程就是生成fiber链表的过程，然后跟新dom;若存在root对象，直接获取并更新dom
```javascript
    reactDom.render(){
        /*省略部分代码*/
         return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
    }
    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
        var root = container._reactRootContainer;
        var fiberRoot = void 0;
        if (!root) {
            // 初次创建根root
             root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
            fiberRoot = root._internalRoot;

            //不需要批量更新
            unbatchedUpdates(function () {
                updateContainer(children, fiberRoot, parentComponent, callback);
            });
        }else {
            // 已经有root对象
            fiberRoot = root._internalRoot;
            //批量更新
            updateContainer(children, fiberRoot, parentComponent, callback);

        }

        return getPublicRootInstance(fiberRoot);
    }
```   
- reactDom.render()构建fiber链表的过程
    > render函数在第一次渲染ReactElement树时候会创建结构一模一样的Fiber节点树;不同的ReactElement类型对应不同的Fiber节点类;一个ReactElement的工作就由它对应的Fiber节点来负责。
    > 一个React Element可以对应不止一个Fiber，因为Fiber在update的时候，会从原来的Fiber（我们称为current）clone出一个新的Fiber（我们称为alternate）。两个Fiber diff出的变化（side effect）记录在alternate上。所以一个组件在更新时最多会有两个Fiber与其对应，在更新结束后alternate会取代之前的current的成为新的current节点。 
    ```javascript
        /*初次创建root根对象过程*/ 
        /**
         * legacyCreateRootFromDOMContainer()--->new ReactSyncRoot()---->createContainer()---->createFiberRoot()
         * 
         * 
        /
        /*createFiberRoot() 方法中创建了两个对象fiberroot和rootFiber,并且相互引用，具体代码如下：*/
        function createFiberRoot(containerInfo, tag, hydrate) {
            var root = new FiberRootNode(containerInfo, tag, hydrate);
            // Cyclic construction. This cheats the type system right now because
            // stateNode is any.
            var uninitializedFiber = createHostRootFiber(tag);
            root.current = uninitializedFiber; // 给fiberRoot实例对象的root属性赋值，其值为rootFiber的实例对象
            uninitializedFiber.stateNode = root;
            return root;
        }
        /* fiberRoot对象的属性如下，上面函数中主应用了属性current,和containerInfo;containerInfo构造函数被调用时赋值，current属性是在实例对象创建后被赋值*/
        function FiberRootNode(containerInfo, tag, hydrate) {
            this.tag = tag;
            this.current = null;
            this.containerInfo = containerInfo;
            this.pendingChildren = null;
            this.pingCache = null;
            this.finishedExpirationTime = NoWork;
            this.finishedWork = null;
            this.timeoutHandle = noTimeout;
            this.context = null;
            this.pendingContext = null;
            this.hydrate = hydrate;
            this.firstBatch = null;
            this.callbackNode = null;
            this.callbackExpirationTime = NoWork;
            this.firstPendingTime = NoWork;
            this.lastPendingTime = NoWork;
            this.pingTime = NoWork;
        }
        /*createHostRootFiber()---->createFiber()--->new FiberNode() 此过程最后创建FiberRoot对象，其主要属性如下：*/

        function FiberNode(tag, pendingProps, key, mode) {
            // Instance
            this.tag = tag;
            this.key = key;
            this.elementType = null;
            this.type = null;
            this.stateNode = null; //管理 instance 自身的特性
            // Fiber
            this.return = null; // 父节点
            this.child = null; // 子节点，并且父节点只有一个child指向此属性
            this.sibling = null; // child的兄弟节点，指向父节点的下一个子节点
            this.index = 0;
            this.ref = null;
            this.pendingProps = pendingProps;// 新 props
            this.memoizedProps = null;// 旧 props
            this.updateQueue = null; // 存储 setState 中的第一个参数
            this.memoizedState = null;// 旧的 state
            this.dependencies = null;
            this.mode = mode;
            
            this.effectTag = NoEffect;
            // 以下三个属性也会形成一个链表
            this.nextEffect = null;// 下一个需要进行 DOM 操作的节点
            this.firstEffect = null;// 第一个需要进行 DOM 操作的节点
            this.lastEffect = null;// 最后一个需要进行 DOM 操作的节点，同时也可用于恢复任务
            this.expirationTime = NoWork; // 任务过期时间
            this.childExpirationTime = NoWork;
            this.alternate = null; // 在fiber更新时克隆出的镜像fiber，update的变化首先更新到alternate上，等全部update完毕后，再用alternate替换current
        }
        
    ``` 
- reactDom.render()更新过程
    - 批量更新
        > react中连续使用setState({})更新数据时，并不会触发react的多次渲染,其内部会把多个setstate优化为一次更新。其原理主要是利用队列和延时函数
    - 任务优先级，任务调度
        > react 会根据任务的优先级去分配各自的 expirationTime，在过期时间到来之前先去处理更高优先级的任务，并且高优先级的任务还可以打断低优先级的任务（因此会造成某些生命周期函数多次被执行），从而实现在不影响用户体验的情况下去分段计算更新（也就是时间分片）。,通常任务有批量任务Batched，异步任务Sync，Never,noWork,他们对应的级别值如下：
        ```javascript
            var MAX_SIGNED_31_BIT_INT = 1073741823;
            var NoWork = 0;
            var Never = 1;
            var Sync = MAX_SIGNED_31_BIT_INT;
            var Batched = Sync - 1;
        ```
        - 计算任务的 expriationTime
            > 当前时间（performance.now()）与一个常量（此常量与任务优先级有关） 
        - 调度 requestIdleCallback 
            > 次函数兼容器不好，一秒只能调用回调20次，因此react团队 利用requestAnimationFrame和settimeout重新构建了此回调函数

    - diff算法（调和）
        > 调和阶段主要就是生命周期函数的调用，diff策略的计算；
        > 调和阶段调用的生命周期函数有componentWillReceiveProps，shouldComponentUpdate，compoenntWillMount, componentWillUpdate 
        > 由于调和阶段可能被中断，因此在调和阶段被调用的函数基本现在简易不被使用，针对此react新增的两个生命周期函数getDerivedStateFromProps，getSnapshotBeforeUpdate
        - 生命周期函数的调用:
            > componentWillReceiveProps函数首先被调用(props前后有区别) ---->  调用getDerivedStateFromProps()获取新的state ------->
            > 若存在shouldComponentUpdate函数，调用更新，若不存在则判断是否是纯函数（是否继承pureComponent）,比较前后的props和state得出结果，——————>过需要更新则调用componentWillUpdate()函数，标记componentDillUpdate 和getSnapshotBeforeUpdate函数
        - diff算法的大概原理
            > 遍历服用跟当前节点一样的老节点，根据节点key判断是否一致；
            > 在此之上，若新节点已经遍历完了，删除没有复用的老节点(丢到一个map中)，若老节点遍历完了，创建剩余的新节点 
            > 若在新创建的节点的key能在丢弃的map中找到，则引用，并在此map中剔除，没有用的则彻底删除
    ```javascript
        /*render更新过程中函数的调用逻辑*/
        function updateContainer(element, container, parentComponent, callback) {
            var current$$1 = container.current;  /*获取当前fiberroot对象*/
            var currentTime = requestCurrentTime(); /*获取当前时间*/
            /**省略部分代码***/
            var suspenseConfig = requestCurrentSuspenseConfig();
            var expirationTime = computeExpirationForFiber(currentTime, current$$1, suspenseConfig);/*计算过期时间,获取到如Sync，Batched类似的时间*/
            return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, suspenseConfig, callback);
        }
        /*时间过期时，更新fibertree*/ 
        function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, suspenseConfig, callback) {
            /*省略部分*/
            var context = getContextForSubtree(parentComponent); /*获取子树的上下文*/
            if (container.context === null) {
                container.context = context;
            } else {
                container.pendingContext = context;
            }

            return scheduleRootUpdate(current$$1, element, expirationTime, suspenseConfig, callback);
        }

        function scheduleRootUpdate(current$$1, element, expirationTime, suspenseConfig, callback) {
             /*省略部分*/
            var update = createUpdate(expirationTime, suspenseConfig); /*创建更新对象*/
        
            if (revertPassiveEffectsChange) {
                flushPassiveEffects();
            }
            enqueueUpdate(current$$1, update);/***没看懂是干嘛的*/
            scheduleWork(current$$1, expirationTime);/***没看懂是干嘛的*/

            return expirationTime;
        }
    ```            