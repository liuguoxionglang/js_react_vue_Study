# Jquery源码学习
> 针对jquery2.0.3版本,主要针对以下几个方面学习；
+ Jquery函数的定义
> Jquery源码中，开始部分声明了大量的变量，同时在这部分声明了Jquery函数，下面是这部分的主要代码
```javascript
    var
    //此处省略部分变量...
    

	// 防止冲突，若之前没有   则 _jQuery _$ 都为 undefined
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

    // 这部分直接引用一部分数组的方法；
    core_deletedIds = [],
	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

    // 此处声明了我们最终需要的函数JQuery，次函数有两个参数，选择器和上下文
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// 调用juery原型中init函数的构造器 返回了一个实例
        return new jQuery.fn.init( selector, context, rootjQuery );
        // 此处返回的是init函数的一个实例，为了是此实例也能继承Jquery函数中的属性和方法，因此jquery中做了这样的操作：jQuery.fn.init.prototype = jQuery.fn; 此语句很重要!!!
	},

``` 
+ Jquery对象的属性和方法
> Jquery对象的基本属性和对方是添加到Jquery函数的原型下面，任何一个jquery实例都继承了这些方法和属性
```javascript
    jQuery.fn = jQuery.prototype = {
        jquery: core_version, // 执行其版本
        //指向构造函数本身  js源码自动生成， 以防被修改，再次重新赋值  jQuery.prototype = {} 改变了jQuery.prototype.constructor的指向，因此再此重新修复；
        constructor: jQuery,  
        init: function( selector, context, rootjQuery ) {}, // 初始化函数，创建jquery对象的核心函数
        // Start with an empty selector
        selector: "",
        // The default length of a jQuery object is 0
        length: 0,
        // 转数组
        toArray: function() {return core_slice.call( this );},
        // jQuery对象转化成原生的dom集合
        get: function( num ) {},
        // 入栈-------先进后出
        pushStack: function( elems ) {},

        // 遍历jquery对象组
        each: function( callback, args ) {},
        // jquery异步完成加载，通常 DOM（文档对象模型） 已经加载，并且页面（包括图像）已经完全呈现时，会发生 ready 事件。
        ready: function( fn ) {},
        // juqery对象的一些常用方法，
        slice: function() {},//截取
        first: function() {},//获取第一个
        last: function() {},//获取最后一个
        eq: function( i ) {},//获取某一个
        map: function( callback ) {},
        end: function() {},
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }
```  
+ Jquery对象的继承或扩展
> 使用jquery.extend()扩展的方法属于静态方法，js中也叫工具方法，类似java中的静态方法，因此这样扩展出的方法，只能使用jquery函数本身去调用，其实例无法使用；
> 使用jquery.fn.extend()扩展的方法属于实例方法，由于这样扩展出的方法在jquery函数的原型上面，因此用jquery函数创建的任何实例都可以使用；
```javascript
    jQuery.extend = jQuery.fn.extend = function() {}
``` 

+ Jquery对象扩展的工具方法
> jquery使用extend（）方法扩展的工具方法，此类方法的使用如：$.ready(function(){}),
```javascript
    jQuery.extend({
        expando://生成唯一jq字符串（内部使用）,
        noConflict()：//防止冲突,
        isReady://dom是否加载完（内部）,
        readyWait://等待多少文件的计数器（内部）,
        holdReady()://推迟dom触发,
        ready()://准备dom触发,
        isFunction()://是否为函数,
        isArray()://是否为数组,
        isWindow()://是否为window,
        isNumeric()://是否为数字,
        type()://判断数据类型,
        isPlainObject()://是否为对象自变量,
        isEmptyObject()://是否为空的对象,
        error()://抛出异常,
        parseHTML()://解析节点,
        parseJSON()://解析json,
        parseXML()://解析xml,
        noop()://空函数,
        globalEval()://全局解析js,
        camelCase()://转驼峰,
        nodeName()://是否为指定节点名,
        each()://遍历集合,
        trim()://去掉前后空格,
        makeArray()://转数组,
        inArray()://数组版的indexof(),
        merge()://合并数组,
        grep()://过滤新数组,
        map()://映射新数组,
        guid://唯一标识符（内部）,
        proxy()://改变this指向,
        access()://多功能值操作, $.css(),$.attr() 根据参数方法不同
        now://当前时间,
        swap(): //css交换（内部）,
})
``` 
+ Jquery——回调函数（对函数的统一管理）
> Callbacks回调函数,是直接定义在jquery函数上的，属于jquery的静态方法；
```javascript
    jQuery.Callbacks = function( options ) {}
```  
+ Jquery——延迟对象（对异步的统一管理）
> jquery通过extend()方法为jquery函数添加了deferred和when方法，这两个方法主要是针对js中的异步方法的同一管理
```javascript
    jQuery.extend({
        // 异步管理的主方法
        Deferred: function( func ) {},

        // Deferred helper 
        // deferred 方法的辅助方法
        when: function( subordinate /* , ..., subordinateN */ ) {}
    })
```  
+ Jquery——数据缓存
> jquery中的数据缓存机制是，在函数背部定义了一个为Data的函数对象，存放每个jquery对象需要缓存的数据
> 通过扩展实例方法的方式构建了两个任何jquery对象使用的方法，用来存储和删除数据，通过扩展静态方法的方式为实例方法提供了几个工具函数
```javascript
    // 扩展静态方法
    jQuery.extend({
        acceptData: Data.accepts,

        hasData: function( elem ) {},

        data: function( elem, name, data ) {},

        removeData: function( elem, name ) {},

        _data: function( elem, name, data ) { },

        _removeData: function( elem, name ) {}
    });
    // 扩展实例方法
    jQuery.fn.extend({
        data: function( key, value ) {},
        removeData: function( key ) {}
  });
```  
+ Jquery——队列
>  队列遵循先进先出(FIFO)原则，jquery中队列的使用通常使用在jquery动画中
```javascript
     // 扩展静态方法
    jQuery.extend({
        queue: function( elem, type, data ) {},
        dequeue: function( elem, type ) {},
        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function( elem, type ) {}
    })
     // 扩展实例方法
    jQuery.fn.extend({
        //入队函数
        queue: function( type, data ) {},
        // 出队函数
        dequeue: function( type ) {},
        //延迟方法
        delay: function( time, type ) {},
        //清空队列
        clearQueue: function( type ) {},
        // 整个队列结束后才执行
        promise: function( type, obj ) {}
    });
``` 
+ Jquery对象属性的操作方法
> 针对jquery对象，jquery封装了以下几种常用的实例方法，用来操作jquery对象的各种属性
```javascript
     // 扩展实例方法
    jQuery.fn.extend({
        // 属性及属性值的添加及获取
        attr: function( name, value ) {},
        //移除某属性
        removeAttr: function( name ) {},
        //属性及属性值的添加及获取，类似attr方法
        prop: function( name, value ) {},
         //移除某属性 类似 removeAttr 
        removeProp: function( name ) {},
        // 给jquery对象添加类
        addClass: function( value ) {},
        // 删除jquery对象的类
        removeClass: function( value ) {},
        // jquery对象添加和移除类的切换
        toggleClass: function( value, stateVal ) {},
        // 判断jquery对象是否有类
        hasClass: function( selector ) {},
        // 通常用在给表单元素队形的jquery对象添加或者获取其值
        val: function( value ) {}
    })
     // 扩展静态方法 以供上面实例方法调用
    jQuery.extend({
        valHooks: {},
        attr: function( elem, name, value ) {},

        removeAttr: function( elem, value ) {},
        attrHooks: {},
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function( elem, name, value ) {},

        propHooks: {}
    })
``` 
+ Jquery对象事件操作的相关方法
> 介绍 
```javascript
    jQuery.fn.extend({
        //给jquey对象添加某一事件
        on: function( types, selector, data, fn, /*INTERNAL*/ one ) {},
        one: function( types, selector, data, fn ) {},
         //给jquey对象解除某一事件的绑定
        off: function( types, selector, fn ) {},
        // 触发某一事件
        trigger: function( type, data ) {},
        triggerHandler: function( type, data ) {}
    });
``` 
+ Jquery对Dom元素的操作
> juery源码中通过以下三部分扩展了jquery对象对dom元素的操作方法
```javascript
    jQuery.fn.extend({
        find: function( selector ) {},

        has: function( target ) { },

        not: function( selector ) { },

        filter: function( selector ) {},

        is: function( selector ) { },

        closest: function( selectors, context ) {},

        // Determine the position of an element within
        // the matched set of elements
        index: function( elem ) { },

        add: function( selector, context ) {},

        addBack: function( selector ) {}
    });
    jQuery.fn.extend({
        text: function( value ) {},

        append: function() {},

        prepend: function() {},

        before: function() {},

        after: function() {},

        // keepData is for internal use only--do not document
        remove: function( selector, keepData ) {},

        empty: function() {},

        clone: function( dataAndEvents, deepDataAndEvents ) {},

        html: function( value ) {},

        replaceWith: function() {},

        detach: function( selector ) {},

        domManip: function( args, callback, allowIntersection ) {}
    })
    jQuery.fn.extend({
        wrapAll: function( html ) {},

        wrapInner: function( html ) {},

        wrap: function( html ) {},

        unwrap: function() {}
    })
``` 
+ Jquery对css样式的操作
> 介绍 
```javascript
    // 扩展实例方法
    jQuery.fn.extend({
        css: function( name, value ) {},
        show: function() {},
        hide: function() {},
        toggle: function( state ) {}
    });
    // 扩展静态方法
    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {
                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": "cssFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {},

        css: function( elem, name, extra, styles ) {}
    });
```  
+ Jquery中异步加载的相关方法
> jquery中的异步加载，
```javascript
    // $.get(),$.post()方法的实现
    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            // shift arguments if data argument was omitted
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    //扩展实例方法  例如：$('#tabs-2').load('Temp_login.html', function (responseText, textStatus) {})
    jQuery.fn.load = function( url, params, callback ) {};
    // 扩展静态方法 主要是$.ajax()方法的实现
    jQuery.extend({
        // 省略部分方法...
        // Main method
        ajax: function( url, options ) {},

        getJSON: function( url, data, callback ) {},

        getScript: function( url, callback ) {}
    });
```  
+ Jquery中动画相关的方法
> 介绍 
```javascript
    //  扩展实例方法 定义好部分参数的方法
    jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });
    // 扩展实例方法
    jQuery.fn.extend({
        fadeTo: function( speed, to, easing, callback ) {},
        animate: function( prop, speed, easing, callback ) {},
        stop: function( type, clearQueue, gotoEnd ) {},
        finish: function( type ) {}
    });
    //扩展实例方法 定义好部分参数的方法
    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });
```  
+ Jquery中位置与尺寸相关方法
> 介绍 
```javascript
    //扩展实例方法
    jQuery.fn.offset = function( options ) {};
    jQuery.fn.extend({
        position: function() {},
        offsetParent: function() {}
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
        var top = "pageYOffset" === prop;

        jQuery.fn[ method ] = function( val ) {}
    })
```  
+ Jquery中延迟对象
> 延迟对象
```javascript
    jQuery.ready.promise = function( obj ) {}
``` 

 