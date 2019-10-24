# js Object的属性和静态方法及实例方法
## 属性
- Object.prototype
- Object.prototype._protto_
- Object.prototype.constructor
## 静态方法
- Object.assign(target,source1,source2,...)
    >  用于将所有源对象source的可枚举性的值合并到目标对象target上，返回目标对象。此方法只拷贝源对象的自身属性，不拷贝继承的属性
    ```javascript
        const target = {
            x : 0,
            y : 1
        };
        const source = {
            x : 1,
            z : 2 ,
            fn : {
                number : 1
            }
        };
        Object.assign(target, source);  
        /*target  {x : 1, y : 1, z : 2, fn : {number : 1}}   //同名属性会被覆盖 */   
        /*source  {x : 1, z : 2, fn : {number : 1}}*/
        target.fn.number = 2;                                  /*拷贝为对象引用*/
        /*source  {x : 1, z : 2, fn : {number : 2}}*/
        
        
        function Person(){
            this.name = 1
        };
        Person.prototype.country = 'china';
        let student = new Person();
        student.age = 29 ;
        const young = {insterst : 'sport'};
        Object.assign(young,student);
        /*young {instest : 'sport' , age : 29, name: 1}*/                /*只能拷贝自身的属性，不能拷贝prototype*/ 
        
        
        Object.assign([1, 2, 3], [4, 5])                      /*把数组当作对象来处理*/ 
        /*[4, 5, 3]*/ 

        const obj = Object.create({foo: 1}, { /* foo 是个继承属性。*/
            bar: {
                value: 2  /*bar 是个不可枚举属性。*/ 
            },
            baz: {
                value: 3,
                enumerable: true  /*baz 是个自身可枚举属性。*/ 
            }
        });

        const copy = Object.assign({}, obj);
        console.log(copy); /*{ baz: 3 }*/ 

    ```
- Object.create(prototype,[propertiesObject])
    > 此方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。prototype——新创建对象的原型对象 
    ```javascript
        var o;

        /*创建一个原型为null的空对象*/ 
        o = Object.create(null);
        o = {};
        /*以字面量方式创建的空对象就相当于:*/ 
        o = Object.create(Object.prototype);
        var parent = {
            x : 1,
            y : 1
        }
        var child = Object.create(parent,{
            z : {                           /*z会成为创建对象的属性*/ 
                writable:true,
                configurable:true,
                value: "newAdd"
            }
        });
        console.log(child) //{z: "newAdd"__proto__:{x: 1,y: 1,__proto__: Object}}
    ```
- Object.definedProperties(obj,props)
    > 此方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    ```javascript
        var obj = {};
        Object.defineProperties(obj, {
        'property1': {
            value: true,
            writable: true
        },
        'property2': {
            value: 'Hello',
            writable: false
        }
        });
    ```
- Object.definedProperty(obj,prop,desc)
    > 此方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
    ```javascript
        /*显式*/ 
        Object.defineProperty(obj, "key", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: "static"
        });
        console.log(obj)/* {key: "static"} */

    ```
- Object.entries()
    > 此方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）
    ```javascript
        const obj = { foo: 'bar', baz: 42 };
        console.log(Object.entries(obj)); /*[ ['foo', 'bar'], ['baz', 42] ]*/ 

        /*array like object*/ 
        const obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.entries(obj)); /*[ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]*/ 

        /*array like object with random key ordering*/ 
        const anObj = { 100: 'a', 2: 'b', 7: 'c' };
        console.log(Object.entries(anObj)); /*[ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]*/ 

        /*non-object argument will be coerced to an object*/ 
        console.log(Object.entries('foo')); /*[ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]*/ 


    ```     
- Object.freeze(obj)
    > 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。obj——要被冻结的对象
    ```javascript
        var obj = {
            prop: function() {},
            foo: 'bar'
        };

        /*新的属性会被添加, 已存在的属性可能会被修改或移除*/ 
        obj.foo = 'baz';
        obj.lumpy = 'woof';
        delete obj.prop;

        /*作为参数传递的对象与返回的对象都被冻结*/ 
        /*所以不必保存返回的对象（因为两个对象全等）*/ 
        var o = Object.freeze(obj);

        o === obj; /*true*/ 
        Object.isFrozen(obj); /* === true*/

        /*现在任何改变都会失效*/ 
        obj.foo = 'quux'; /*静默地不做任何事*/ 
        /*静默地不添加此属性*/ 
        obj.quaxxor = 'the friendly duck';

        let a = [0];
        Object.freeze(a); /*现在数组不能被修改了.*/ 

        a[0]=1; /*fails silently*/ 
        a.push(2); /* fails silently*/
    ```
-  Object.fromEntries(iterable) 
    > 此方法把键值对列表转换为一个对象，iterable可迭代对象，类似 Array 、 Map 或者其它实现了可迭代协议的对象。返回一个新对象,Object.fromEntries() 是 Object.entries 的反转。
    ```javascript
        <!-- 通过 Object.fromEntries， 可以将 Map 转化为 Object: -->
        const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
        const obj = Object.fromEntries(map);
        console.log(obj); // { foo: "bar", baz: 42 }

        <!-- 通过 Object.fromEntries， 可以将 Array 转化为 Object: -->
        const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
        const obj = Object.fromEntries(arr);
        console.log(obj); // { 0: "a", 1: "b", 2: "c" }

    ```
- Object.getOwnPropertyDescriptor(obj,prop)
    > 此方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）,obj：目标对象，prop:目标对象内属性名称
    ```javascript
        var o = { bar: 42 };
        var d = Object.getOwnPropertyDescriptor(o, "bar");
        console.log(d)
        // d {
        //   configurable: true,
        //   enumerable: true,
        //   value: 42,
        //   writable: true
        // }

    ```
- Object.getOwnPropertyDescriptors(obj)
    >  此方法用来获取一个对象的所有自身属性的描述符。obj:任意对象
    ```javascript
        var obj = {
            name : 'js',
            age : 20
        }
        console.log(Object.getOwnPropertyDescriptors(obj))
        //{
        //    age: {value: 20, writable: true, enumerable: true, configurable: true}
        //    name: {value: "js", writable: true, enumerable: true, configurable: true}
        //    __proto__: Object
        // }
    ```
- Object.getOwnPropertyNames(obj)
    > 此方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。obj:
    ```javascript
        <!-- 类数组对象 -->
        var obj = { 0: "a", 1: "b", 2: "c"};
        console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
    ```
- Object.getOwnPropertySymbols(obj)
    > 此方法返回一个给定对象自身的所有 Symbol 属性的数组。obj:要返回 Symbol 属性的对象
    ```javascript
        var obj = {"bbbb":999999999};
        var a = Symbol("a");
        var b = Symbol.for("b");

        obj[a] = "localSymbol";
        obj[b] = "globalSymbol";

        var objectSymbols = Object.getOwnPropertySymbols(obj);
        console.log(objectSymbols) //[Symbol(a), Symbol(b)]
    ```
- Object.getPrototypeOf(obj)
    > 此方法返回指定对象的原型（内部[[Prototype]]属性的值）;obj:要返回其原型的对象
    ```javascript
        var proto = {};
        var obj = Object.create(proto);
        Object.getPrototypeOf(obj) === proto; // true

        var reg = /a/;
        Object.getPrototypeOf(reg) === RegExp.prototype; // true
    ```
- Object.is(value1, value2) 
    > 此方法判断两个值是否是相同的值。
    ```javascript
        Object.is('foo', 'foo');     /* true*/
        Object.is(window, window);   /* true*/

        Object.is('foo', 'bar');     /* false*/
        Object.is([], []);            /* false*/

        var foo = { a: 1 };
        var bar = { a: 1 };
        Object.is(foo, foo);         /* true*/
        Object.is(foo, bar);          /* false*/

        Object.is(null, null);       /* true*/

        /*特例*/ 
        Object.is(0, -0);             /* false*/
        Object.is(0, +0);            /* true*/
        Object.is(-0, -0);           /* true*/
        Object.is(NaN, 0/0);         /* true*/
    ```  
- Object.isExtensible(obj)
    > 此方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性） obj：需要检测的对象
    ```javascript
        <!-- 新对象默认是可扩展的. -->
        var empty = {};
        Object.isExtensible(empty); /* === true*/

        <!-- 可以变的不可扩展. -->
        Object.preventExtensions(empty);
        Object.isExtensible(empty); /*=== false*/ 


    ```       
- Object.isFrozen(obj)
    > 此方法判断一个对象是否被冻结。obj:被检测的对象。
    ```javascript
        <!-- 一个对象默认是可扩展的,所以它也是非冻结的. -->
        Object.isFrozen({}); // === false

        <!-- 一个非空对象默认也是非冻结的. -->
        var oneProp = { p: 42 };
        Object.isFrozen(oneProp) //=== false

        <!-- 让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象, -->
        <!-- 因为p属性仍然是可以配置的(而且可写的). -->
        Object.preventExtensions(oneProp);
        Object.isFrozen(oneProp) //=== false
    ```
- Object.isSeal(obj)
    > 此方法判断一个对象是否被密封。 obj:要被检查的对象
    ```javascript
        <!-- 新建的对象默认不是密封的. -->
        var empty = {};
        Object.isSealed(empty); // === false

        <!-- 如果你把一个空对象变的不可扩展,则它同时也会变成个密封对象. -->
        Object.preventExtensions(empty);
        Object.isSealed(empty); // === true
    ```
- Object.keys(obj) 
    > 此方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。如果对象的键-值都不可枚举，那么将返回由键组成的数组。
    ```javascript
        <!-- simple array -->
        var arr = ['a', 'b', 'c'];
        console.log(Object.keys(arr)); // console: ['0', '1', '2']

        <!-- array like object -->
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.keys(obj)); // console: ['0', '1', '2']

        <!-- array like object with random key ordering -->
        var anObj = { 100: 'a', 2: 'b', 7: 'c' };
        console.log(Object.keys(anObj)); // console: ['2', '7', '100']

    ```
- Object.preventExtensions(obj) 
    > 此方法让一个对象变的不可扩展，也就是永远不能再添加新的属性;obj:将要变得不可扩展的对象。返回已经不可扩展的对象。
    ```javascript
        /*Object.preventExtensions将原对象变的不可扩展,并且返回原对象.*/ 
        var obj = {};
        var obj2 = Object.preventExtensions(obj);
        obj === obj2;  // true
        
        /*字面量方式定义的对象默认是可扩展的*/ 

        var empty = {};
        Object.isExtensible(empty) //=== true
        
        /* 但可以改变 */ 

        Object.preventExtensions(empty);
        Object.isExtensible(empty) //=== false

    ```
- Object.setPrototypeOf(obj,prototype)
    > 此方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。obj:要设置其原型的对象;prototype:新原型对象
- Object.seal(obj)
    > 此方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变.obj:要被密封的对象
    ```javascript
        var obj = {
            prop: function() {},
            foo: 'bar'
        };
        obj.foo = 'baz';
        obj.lumpy = 'woof';
        delete obj.prop;

        var o = Object.seal(obj);

        o === obj; /*true*/ 
        Object.isSealed(obj); // === true

    ```
- Object.values(obj)
    > 此方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 ) obj:被返回可枚举属性值的对象。
    ```javascript
        var obj = { foo: 'bar', baz: 42 };
        console.log(Object.values(obj)); // ['bar', 42]

        <!-- array like object -->
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.values(obj)); // ['a', 'b', 'c']

    ```
## 实例方法
- Object.prototype.isPrototypeOf(obj)
    > 此方法用于测试一个对象是否存在于另一个对象的原型链上。obj:在该对象的原型链上搜寻
    ```javascript
        function Foo() {}
        function Bar() {}
        function Baz() {}

        Bar.prototype = Object.create(Foo.prototype);
        Baz.prototype = Object.create(Bar.prototype);

        var baz = new Baz();

        console.log(Baz.prototype.isPrototypeOf(baz)); /*返回 true*/
        console.log(Bar.prototype.isPrototypeOf(baz)); /*返回 true*/
        console.log(Foo.prototype.isPrototypeOf(baz)); /*返回 true*/
        console.log(Object.prototype.isPrototypeOf(baz)); /*返回 true*/
    ```
- Object.prototype.hasOwnProperty(prop)
    > 此方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是是否有指定的键） prop:要检测的属性  字符串 名称或者 Symbol
    ```javascript
        o = new Object();
        o.prop = 'exists';

        function changeO() {
        o.newprop = o.prop;
        delete o.prop;
        }

        o.hasOwnProperty('prop');   /*返回 true*/ 
        changeO();
        o.hasOwnProperty('prop');   // 返回 false

        o = new Object();
        o.prop = 'exists';
        o.hasOwnProperty('prop');             /*返回 true*/ 
        o.hasOwnProperty('toString');         /*返回 false*/ 
        o.hasOwnProperty('hasOwnProperty');   // 返回 false
    ```
- Object.prototype.valueOf()
    > 此方法返回指定对象的原始值。
    ```javascript
        <!-- Array：返回数组对象本身 -->
        var array = ["ABC", true, 12, -5];
        console.log(array.valueOf() === array);   // true

        <!-- Date：当前时间距1970年1月1日午夜的毫秒数 -->
        var date = new Date(2013, 7, 18, 23, 11, 59, 230);
        console.log(date.valueOf());   // 1376838719230

        <!-- Number：返回数字值 -->
        var num =  15.26540;
        console.log(num.valueOf());   // 15.2654

        <!-- 布尔：返回布尔值true或false -->
        var bool = true;
        console.log(bool.valueOf() === bool);   // true

        <!-- new一个Boolean对象 -->
        var newBool = new Boolean(true);
        <!-- valueOf()返回的是true，两者的值相等 -->
        console.log(newBool.valueOf() == newBool);   // true

        <!-- 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型 -->
        console.log(newBool.valueOf() === newBool);   // false

        <!-- Function：返回函数本身 -->
        function foo(){}
        console.log( foo.valueOf() === foo );   /*true*/ 
        var foo2 =  new Function("x", "y", "return x + y;");
        console.log( foo2.valueOf() );
        
    

        <!-- Object：返回对象本身 -->
        var obj = {name: "张三", age: 18};
        console.log( obj.valueOf() === obj );   // true

        <!-- String：返回字符串值 -->
        var str = "http://www.xyz.com";
        console.log( str.valueOf() === str );   // true

        <!-- new一个字符串对象 -->
        var str2 = new String("http://www.xyz.com");
        <!-- 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型 -->
        console.log( str2.valueOf() === str2 );   // false

    ```
