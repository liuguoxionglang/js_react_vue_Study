# javascript 不同应用场景中的this
**一、this绑定的几种情况**
+ 默认绑定
> 严格模式：默认绑定undifined
> 非严格模式：默认绑定全局变量
>> 注意：运行在严格模式下,默认绑定undifined,若函数在严格模式下被调用，函数背部还是会遵循非严格模式下的绑定规则
+ 隐式绑定
> 在特定的执行上下文中，则会隐式绑定此上下文，
>> 注意：隐式丢失 ，函数引用被其它任何上下文中变量引用后，则会丢失原来的this;
```javascript
     // 隐式绑定，丢失this
     function a(){
        console.log(this.x)
     }
     var obj = {
        x:10,
        o:a
    }
     obj.o();//10
     var x = 99;
     var t = obj.o;
     var obj2 = {
         x:100,
         fun:t
     }

     t();//99
     obj2.fun();//100

```
+ 显示绑定
> call() apply() bind() 方法可以显示绑定this,函数的第一参数指定函数this的指向
```javascript
    //模拟实现call（）方法
    //原理  改变this指向   函数执行了
    Function.prototype.myCall = function(context){
        context = context ?object(context):window;// 上下文确定
        const fn = Symbol();
        context[fn] = this; // 上下文中保存了此函数
        const args = [...arguments].slice(1);
        let result= context[fn](args); // 执行次函数
        delete context[fn];
        return reslult;
    }
    //模拟实现apply()方法
    //原理  改变this指向   函数执行了
    Function.prototype.myApply = function(context,arr){
        context = context ?object(context):window; // 上下文确定
        const fn = Symbol();
        context[fn] = this;// 上下文中保存了此函数
        let res;
        if(arr){
            res = context[fn](...arr);//只有一个参数时，执行此函数
        }else {
            res = context[fn]();
        }
        delete context[fn];
        return res;
    }
    // 模式实现bind()方法
    // 原理  返回一个绑定了执行上下文的函数
    // 实现过程：指定this----->接受参数------->柯里话-------->返回一个函数

    Function.prototype.myCall = function(context){
        const self = this; //保存调用者
        // 截取调用时传入的参数，除去指定this的第一个参数
        const args = [].slice.call(arguments,1)
        // return function(){
        //     const  pra = [].slice.call(arguments);//fun.bind()返回后的函数，被执行时，传入的参数
        //     return self.apply(context,args.contact(pra))
        // }
        // 此处 返回的函数，被new调用时，this又被重新指向了，下面方式兼顾了 被new调用时，this指向了实例对象

        const fun = function(){
            const  pra = [].slice.call(arguments);//fun.bind()返回后的函数，被执行时，传入的参数
            return self.apply(this instanceof fun ?this:context,args.contact(pra)); // 判断this若果是 函数fun的实例，则this指向此实例，否则指向执行的上下文对象conext
        }
        fun.prototype = self.prototype; // new 操作时，返回的实例继承构造函数的原型对象
        return fun;

    }
```
+ new操作绑定
> 用new调用函数，也叫构造函数调用，用构造函数调用函数时，则会隐式的创建一个新对象，此对象会被指向函数调用的this,若次函数总无返回值，则默认把新创建的对象返回；若返回的是一个基本类型，则还是返回新创建的对象
```javascript
    // new 调用函数时，返回值情况
    function Aa(){
        this.b = 10;
        console.log(arguments);
        return null; // Aa {b: 10}
        // return 1111;  // Aa {b: 10}
        // return "tttt"; // Aa {b: 10}
        // return true; // Aa {b: 10}
        // return [12,13] // [12,13]
    }

    var aa = new Aa();
    console.log(aa);
    console.log(Aa());
    // 手动实现 new
    function myNew(){
        let obj ={}, // 创建一个新对象
        fun = [].shift.call(arguments); // 拿出第一个参数——函数构造器
        obj._proto_ = fun.prototype; // 创建的新对象的原型指向了构造函数的原型，实现了继承
        const res = fun.apply(obj,arguments); //构造函数this指向实例对象，并调用构造函数，返回结果
        return res instanceof Object ? res:obj; // 返回结果为object对象时，返回返回值，否则返回新构建的对象
    }

    function PP(pra){
        this.b = pra
    }

    PP.prototype.cc = function n(){
        console.log("这是原型方法。。。")
    }

    const aaaa = myNew(PP,10);
    console.log(aaaa)

```
+ 箭头函数绑定
> 箭头函数时根据外层作用域来决定this的，箭头函数的绑定无法被修改
```javascript
    // 箭头函数 this
    function fff(pra){
        this.b = pra; // 给this添加属性
        console.log(this);
        const c = ()=>{
            console.log(this.a); //箭头函数this 指向外侧作用域
        }
        return c;
    }

    const f1 = fff.call({a:8},100); // 改变this指向，并传参
    f1.call({a:99}); // 箭头函数this指向修改无效果

```
**一、this应用**
+ 应用一
```javascript
    // this 绑定的综合示例
    var name = 'lgx';
    var obj = {
        name:'lang',
        f1:function(){
            console.log(this.name);
        },
        f2:function(){
            return function () {
                console.log(this.name)
            }
        },
        f3:()=>console.log(this.name),
        f4:function(){
            return ()=>console.log(this.name);
        }
    }

    var obj1 = {name:'dog'};

    obj.f1();// lang 隐式绑定，this指向调用着obj;
    obj.f1.call(obj1);//dog //显示绑定，this指向传入的对象obj1

    obj.f2()();//lgx obj.f2函数的作用域指向obj; obj.f2()函数无显示绑定，丢失this,obj.f2()返回的函数默认绑定全局作用域
    obj.f2.call(obj1)();//lgx obj.f2.call()，改变obj.f2函数的this指向，obj.f2.call()返回的普通函数丢失this了，因此执行返回的普通函数后，默认绑定this
    obj.f2().call(obj1); //dog   obj.f2函数的作用域指向obj,obj.f2()返回的普通函数再通过call绑定this,因此指向obj1

    obj.f3();//lgx  // 箭头函数绑定,this.执行外部作用域，
    obj.f3.call(obj1) //lgx obj.f3返回箭头函数，执行环境为全局的，this指向外部作用域，

    obj.f4()();//lang obj.f4函数的作用域指向obj,obj.f4(),无显示绑定，丢失this,obj.f4()返回的箭头函数作用域指向全局作用域
    obj.f4.call(obj1)();//dog obj.f4.call() 改变obj.f4的this指向 obj.f4.call()返回的箭头函数的作用域指向外部作用域，指向obj1
    obj.f4().call(obj1);//lang obj.f4函数的作用域指向obj,obj.f4() 返回的箭头函数指向外层作用域，因此指向obj1
```
