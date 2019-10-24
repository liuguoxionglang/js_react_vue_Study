
# javaScript正则表达式学习

## 正则表达式中的元字符
* 基本元字符
        正则表达式提供了一些特殊字符表示自一组比较复杂的匹配规则，如下表：

|字符简写|字符全写|含义|
|:---:|:---:|:---:|
.|[^\r\n]|除了回车符和换行符之外的所有字符
\d|[0-9]|数字字符
\D|[^0-9]|非数字字符
\s|[\t\n\x0B\f\r]|空白符
\S|[^\t\n\x0B\f\r]|非空白符
\w|[a-zA-Z0-9_]|单词字符（字母数字下划线）
\W|[^a-zA-Z0-9_]|非单词字符

* 位置元字符

|字符|含义|
|:---:|:---:|
^|必须以xxxx开头
$|必须以xxxx结尾
\b|单词边界
\B|非单词边界

* 数量元字符

|字符|含义|
|:---:|:---:|
*|出现0次或者多次
?|出现0次或者一次
+|至少出现一次
{n}|出现n次
{n,m}|出现n到m次
{n,}|至少出现n次


## 贪婪模式与非贪婪模式（针对数量元字符的，默认是贪婪模式）
贪婪量词|惰性量词|例子|
|:---:|:---:|:---:|
|*|*?| '0123456789'.replace(/[0-9]\*/,"m");//m;  "0123456789".replace(/[0-9]\*?/,'m');//m0123456789|
?|??|'0123456789'.replace(/[0-9]?/, 'm')  // "m123456789";  '0123456789'.replace(/[0-9]??/, 'm')  // "m0123456789"
+|+?| '0123456789'.replace(/[0-9]+/, 'm')  // "m";  '0123456789'.replace(/[0-9]+?/, 'm')  // "m123456789"
{n}|{n}?|'0123456789'.replace(/\d{5}/, 'm')  // "m56789";  '0123456789'.replace(/\d{5}?/, 'm')  // "m56789"
{n,m}|{n,m}?|'0123456789'.replace(/\d{4,8}/, 'm')  // "m89";  '0123456789'.replace(/\d{4,8}?/, 'm')  // "m456789"
{n,}|{n,}?|'0123456789'.replace(/\d{5,}/, 'm')  // "m";   '0123456789'.replace(/\d{5,}?/, 'm')  // "m56789"


## 分组与反向引用
- 捕获

|语法|含义|
|:---:|:---|
|(reg)|匹配reg,捕获到自动命名的数组空间里|
|(?:reg)|匹配exp，不捕获匹配的文本(推荐)|
|(?<name>reg)|匹配reg,并捕获到名称为name的空间里|
|\n|反向引用，指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串,|
> 反向引用使用
>> 这种术语表示法是在反斜杆后面加一个要引用的捕获数量。捕获组捕获到的内容，不仅可以在正则表达式外部通过程序进行引用，也可以在正则表达式内部进行引用，
>> 这种引用方式就是反向引用。反向引用的作用通常是用来查找或限定重复、查找或限定指定标识配对出现等等。例如:([a-z])\1{2}也就表达连续三个相同的小写字母。

```javascript
let reg = /(ok) is \1/; //此处使用已经捕获的第一个ok
let str = "ok is ok?"
console.log(reg.exec(str)) // ["ok is ok", "ok", index: 0, input: "ok is ok?"]
```

## 零宽断言
名称|表达式|含义
---|:--:|---:
正向零宽断言|reg1(?=reg2)|查找reg2前面的reg1
负向零宽断言|reg1(?!reg2)|查找后面不是reg2的reg1
反向零宽断言|(?<=reg2)reg1|查找reg2后面的reg1
负反向零宽断言|(?<!reg2)reg1|查找前面不是reg2的reg1<br>

## 正则表达式的属性
|名称|含义|举例|
|:---:|:---:|:---:|
RegExp.prototype.global|执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）|见如下例1
RegExp.prototype.ignoreCase|执行对大小写不敏感的匹配|见如下例2
RegExp.prototype.multiline|执行多行匹配|见如下例3
RegExp.prototype.unicode|Unicode; 将模式视为Unicode序列点的序列Unicode|见如下例4
RegExp.prototype.sticky|允许 . 去匹配多行|见如下例5

**例1**
```javascript
let reg = /Are you ok ?/；
console.log(reg.global) //false;
console.log(reg.exec('o'));//
let reg1 = /Are you ok ?/g
console.log(reg1.global)//true
```
**例2**
```javascript
let reg = /Are you ok ?/；
console.log(reg.ignoreCase) //false;
let reg1 = /Are you ok ?/g
console.log(reg1.ignoreCase)//true
```
**例3**
```javascript
let reg = /Are you ok ?/；
console.log(reg.multiline) //false;
let reg1 = /Are you ok ?/g
console.log(reg1.multiline)//true
```
**例4**
```javascript
let reg = /Are you ok ?/；
console.log(reg.unicode) //false;
let reg1 = /Are you ok ?/g
console.log(reg1.unicode)//true
```
**例5**
```javascript
let reg = /Are you ok ?/；
console.log(reg.sticky) //false;
let reg1 = /Are you ok ?/g
console.log(reg1.sticky)//true
```


## 正则表达式的方法
 - RegExp.prototype.exec()
    - 语法：reg.exec(str)
    - 解释：
           使用正则表达式模式对字符串参数进行匹配搜索，如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，
           将正则括号里匹配成功的作为数组填充到后面;如果匹配失败，exec() 方法返回 null。
    - 例子
        ```javaScript
        const str = "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!";
        let reg = /e ok/g;
        console.log(reg.lastIndex); // 0
        console.log(reg.exec(str)); // ["e ok", index: 6, input: "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!"]
        console.log(reg.lastIndex); // 10
        console.log(reg.exec(str)); // ["e ok", index: 31, input: "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!"]
        console.log(reg.lastIndex); // 35
        console.log(reg.exec(str)); // ["e ok", index: 56, input: "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!"]
        console.log(reg.lastIndex); // 60
        console.log(reg.exec(str)); // null
        console.log(reg.lastIndex); // 0
        ```

 - RegExp.prototype.test()
    - 语法：reg.test(str)
    - 解释：测试字符中str中是否有匹配正则reg的字符创，若能返回true,否则返回false
    - 例子
        ```javaScript
        const str = 'wo men dou shi zhong guo ren';
        let reg1 = /ren$/;
        // 判断str是不是以ren结尾
        console.log(reg1.test(str)); // true
        let reg2 = /^ren/;
        // 判断str是不是以ren开头
        console.log(reg2.test(str)); // fase

        const reg3 = /\w/g;
        while(reg3.test(str)){
          console.log(reg3.lastIndex);
        }
        //即进行test时，正则表达式的lastIndex会发生变化 输出：1 2 ... 28 表示第一个匹配上了、第二个匹配上了，直到第28个都匹配上啦，没有第29个，跳出循环

        ```

## 与正则表达式一起使用的字符串方法
 + search()
   + 语法：str.search(reg)
   + 说明：方法将检索字符串，以找到一个或多个与reg相匹配的字符串,类似正则表达式的test方法，返回第一个匹配结果index，查不到返回-1;search()不执行全局匹配，它将忽略标志g, 并总是从字符串的开始进行检索
   + 应用：
        ```javaScript
        const str = "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!";
        const reg = /ok/g;
        console.log(str.search(reg));//8
        ```
 + match()
   + 语法：str.match(reg)
   + 说明：
           当一个字符串与一个正则表达式匹配时， match() 方法检索匹配项。如果正则表达式不包含 g 标志，则 str.match() 会返回和 RegExp.exec() 相同的结果。而且返回的 Array 拥有一个额外的 input 属性，
           该属性包含被解析的原始字符串。另外，还拥有一个 index 属性，该属性表示匹配结果在原字符串中的索引（以0开始);

           如果正则表达式包含 g 标志，则该方法返回一个 Array ，它包含所有匹配的子字符串而不是匹配对象。
           捕获组不会被返回(即不返回index属性和input属性)。如果没有匹配到，则返回 null 。

   + 应用：
        ```javaScript
        var reg3=/\d(\w)(\w)\d/;    // 非全局搜索只能匹配到第一个结果
        var reg4=/\d(\w)(\w)\d/g;   // 全局搜索匹配全文
        var ts = '$1az2bb3cy4dd5ee'
        var ret1= ts.match(reg3)   // (3) ["1az2", "a", "z", index: 1, input: "$1az2bb3cy4dd5ee", groups: undefined]
        console.log(ret1)
        console.log(reg3.lastIndex+'\t'+ret1.index)  // 0, 1
        var ret2 = ts.match(reg4)  // (2) ["1az2", "3cy4"]
        console.log(ret2)
        console.log(reg4.lastIndex+'\t'+ret2.index)   // 0 undefined

        ```
 + replace()
   + 语法：str.replace(regexp|substr, newSubStr|function)

   + 说明：
        > regexp (pattern): 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。

        > substr (pattern): 一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。

        > newSubStr (replacement): 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。

        > function (replacement): 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。

        >> replace方法接受两个参数，第一个是要被替换的文本，可以是正则也可以是字符串，如果是字符串的时候不会被转换成正则，而是作为检索的直接量文本。第二个是替换成的文本，可以是字符串或者函数，
           字符串可以使用一些特殊的变量来替代前面捕获到的子串。返回一个部分或全部匹配由替代模式所取代的新的字符串。
           如果使用字符串作为参数时替换字符串可以插入下面的特殊变量名：

        >> 变量 \$$ 表示 插入一个 "\$"
           变量 \$& 表示 插入匹配的子串
           变量 \$` 表示 插入当前匹配的子串左边的内容
           变量 \$' 表示 插入当前匹配的子串右边的内容
           变量 \$n 表示 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串
   + 应用：
        ```javaScript
        // 例1
        const str = '2018-03-31';
        let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/;
        function replacer (match, p1, p2, p3, offset, string) {
            console.log([match, p1, p2, p3, offset, string]); // ["2018-03-31", "2018", "03", "31", 0, "2018-03-31"]
            return [p1, p2, p3].join('/')
        }
        console.log(str.replace(reg, replacer)); // 2018/03/31


        // 例2
        const res1 = 'a1b2c3d4e5'.replace(/\d/g, function(match, index, origin){
          return parseInt(match) + 1;
        })
        console.log(res1) // "a2b3c4d5e6"

        const res2 = 'a1b2c3d4e5'.replace(/(\d)(\w)(\d)/g, function(match, group1, group2, group3, index, origin){
          console.log(match)  // 1b2 // 3d4
          return group1 + group3;
        })
        console.log(res2);// "a12c34e5"


        // 例3
        const res3 = '99999999999.33333333'.replace(/\d{1,3}(?=(\d{3})+(?:\.\d+)?$)/g, '$&,')
        console.log(res3) //99,999,999,999.33,333,333

        //例4
        var dateStr = '2019/07/20';
        var reg = /(\d{4})\/(\d{2})\/(\d{2})/;
        dateStr = dateStr.replace(reg, '$1-$2-$3')
        console.log(dateStr); // 2019-07-20
        ```
 + split()
   + 语法：str.split([separator[, limit]])
   + 说明：
        > separator: separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。
        如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返回。

        > limit: 一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。

   + 应用：
        ```javaScript
        const str = "you are ok eques i'am ok!you are ok eques i'am ok!you are ok eques i'am ok!";
        // 例1
        let reg2 = /\s+(ok)\s+/;
        console.log(str.split(reg2));//["you are", "ok", "eques i'am ok!you are", "ok", "eques i'am ok!you are", "ok", "eques i'am ok!"]

        // 例2
        let reg3 = /\s+ok\s+/;
        console.log(str.split(reg3));//["you are", "eques i'am ok!you are", "eques i'am ok!you are", "eques i'am ok!"]

        // 例3
        'alb2c3d'.split(/\d/); //["a", "b", "c", "d"]
        ```
