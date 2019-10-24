# css3属性的巧妙应用

##  自定义属性
> css3中可以用--开头自定义属性，如--mywidth:100px;自定义属性也有其作用范围，在每个选择器内部定义的可以理解为局部变量，
> 要定义能在全局范围内使用的属性变量，则可以使用 :root {--myattr:xxx};定义后的属性变量可以在css中用var()函数引用，如 body{width:var(--mywidth)}
-css代码 
```css
    /* 在此处定义全局作用域的css变量 */
        :root {
            --mywidth: 500px;
        }

        .mydifined{
            width:var(--mywidth);
            height:100px;
            border: 1px solid red
        }
   
```
- html代码
```html
    <div class="mydifined">
```
- 参考链接

    [css自定义属性及var()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var) 

##  shape-outside
> 定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装,提供了一种自定义此包装的方法，可以将文本包装在复杂对象周围而不是简单的框中
```css
       .example-container {
            text-align: left;
            padding: 20px;
            width: 400px;
        }
        #example-element {
            float: left;
            margin: 10px;
            border-radius: 150px;
        }      

```
- html代码
```html
    <div class="example-container">
            <img id="example-element" class="transition-all" src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" width="150" style="shape-outside: circle(50% at 50% 50%);">
            We had agreed, my companion and I, that I should call for him at his house, after dinner, not later than eleven o’clock. This athletic young Frenchman belongs to a small set of Parisian sportsmen, who have taken up “ballooning” as a pastime. After having exhausted all the sensations that are to be found in ordinary sports, even those of “automobiling” at a breakneck speed, the members of the “Aéro Club” now seek in the air, where they indulge in all kinds of daring feats, the nerve-racking excitement that they have ceased to find on earth.
    </div>
```
- 参考链接
 
  [shape-outside详解链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside) 


##  clip-path
> 创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏，clip-path属性代替了现在已经弃用的剪切 clip属性。
```css
        .main {
            width: 500px;
            border: 1px solid red;
        }

        .left,
        .right {
            width: 40%;
            height: 12ex;
            background-color: seagreen;
        }

        .left {
            -webkit-shape-outside: polygon(0 0, 100% 100%, 0 100%);
            shape-outside: polygon(0 0, 100% 100%, 0 100%);
            float: left;
            -webkit-clip-path: polygon(0 0, 100% 100%, 0 100%);
            clip-path: polygon(0 0, 100% 100%, 0 100%);
        }

        .right {
            -webkit-shape-outside: polygon(100% 0, 100% 100%, 0 100%);
            shape-outside: polygon(100% 0, 100% 100%, 0 100%);
            float: right;
            -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
            clip-path: polygon(100% 0, 100% 100%, 0 100%);
        }       

```
- html代码
```html
    <div class="main">
        <div class="left"></div>
        <div class="right"></div>
        <p>
          Sometimes a web page's text content appears to be
          funneling your attention towards a spot on the page
          to drive you to follow a particular link. Sometimes
          you don't notice.to drive you to follow a particular link. Sometimes
          you don't notice.
        </p>
    </div>
```
- 参考链接
 
[clip-path详解链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path) 

##  div>div+div 选择器
> 子元素选择器与兄弟元素选择器的联合使用，完美！！！
-css代码 
```css
        .layout {
            margin-top: 50px;
            border: 1px solid red;
        }
        .layout div {
            width:100%;
            height: 30px;
        }
        /* 选择类名为layout下面的素有div元素，再选择被选中的元素之后的所有元素 */
        .layout>div+div{
            border-top: 1px solid green;

        }

```
- html代码
```html
    <!-- 相邻兄弟选择器之常用场景  加边框线 -->
      <div class="layout">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
```
- 参考链接

[css选择器链接](https://www.w3school.com.cn/cssref/css_selectors.asp) 

##  div绘制三角形
> 绘制三角形有多种方法，用div绘制三角形主要使用元素的border和border-color两个属性，当border-color属性的四个值设置不同颜色的时候，就能够完美获得想要的三角形了，
-css代码 
```css
    /* 此处只要用transparent替代border-color中不需要的颜色，即可绘制出想要的三角形*/
    .tranigle{
            /* width: 200px;
            height:200px; */
            width: 0px;
            height:0px;
            background-color: blue;
            border: 100px solid red;
            margin-top: 50px;
            border-color: green burlywood red blue;
        }

```
- html代码
```html
   <!-- css绘制三角形 -->
    <div class="tranigle"></div>
```
- 参考链接

[css绘制各种形状](https://juejin.im/post/5c9cbddc5188252d812c6526) 

##  实现水平 垂直居中
> 实现水平居中 和垂直居中 我之前常用两种方式：
> 1、父元素相对定位，子元素绝对定位  并设置子元素margin:auto left:0,right:0,bottom:0 ,top:0
> 2、父元素相对定位,子元素绝对定位 left：50%，top：50%  transform:translate(-50%,-50%)
> 父元素设置成flex容器，子元素设置margin:auto,简单快速设置水平，垂直居中
-css代码 
```css
        .center{
            width:500px;
            height:300px;
            border: 1px solid red;
            display: flex


        }
        .center div {
            width:50px;
            height: 50px;
            border: 1px solid red;
            margin: auto
        }

```
- html代码
```html
     <!-- 实现水平 垂直居中的简易方法 -->
      <div class="center">
          <div></div>
      </div>
```
- 参考链接

##  background-position
> background-position 为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层的。
-css代码 
```css
    /* 多背景图片：每个图片依次和相应的 `background-position` 匹配*/
        .examplethree {
            background-color: #FFEE99;
            background-repeat: no-repeat;
            width: 300px;
            height: 80px;
            margin-bottom: 12px;
            background-image:    url("https://developer.mozilla.org/samples/cssref/images/startransparent.gif"), 
                                url("https://mdn.mozillademos.org/files/7693/catfront.png");
            background-position: 0px 0px,
                                center;
        }

```
- html代码
```html
    <div class="examplethree"></div>
```
- 参考链接

[background-position详解链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position) 

##  object-fit object-position
> object-fit 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。
> object-position 规定了可替换元素的内容，在这里我们称其为对象（即 object-position 中的 object），在其内容框中的位置。可替换元素的内容框中未被对象所覆盖的部分，则会显示该元素的背景
-css代码 
```css
     img {
            width:100px;
            height: 50px;
            object-fit: cover;
            object-position:bottom;
        }

```
- html代码
```html
    <!-- object-fit=====图片在指定尺寸后，可以设置object-fit为contain或cover保持比例 -->
    <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" alt="" >

```
- 参考链接
 
 [object-fit详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 
 [object-position详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position#%E8%BE%93%E5%87%BA)

##  css3中的attr()
> CSS表达式 attr() 用来获取选择到的元素的某一HTML属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素，好多浏览器目前还不支持
-css代码 
```css
    div {
        position: relative;
    }
    div:hover::after {
        /* 取到data-content属性的值 */
        content: attr(data-content);   
        display: inline-block;
        padding: 10px 14px;
        border: 1px solid red;
        border-radius: 5px;
        position: absolute;
        top: -50px;
        left: -30px;
    }

```
- html代码
```html
    <div data-content="我们是中国人">放假了收款方老师</div>
```
- 参考链接
 
 [css中的attr()函数详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr) 

##  css3中的 calc()
> CSS中的函数 calc()用于动态计算长度值。运算符前后都需要保留一个空格，calc()函数支持 "+", "-", "*", "/" 运算；任何长度值都可以运算
-css代码 
```css
     #div1 {
            position: absolute;
            left: 50px;
            width: calc(100% - 100px);
            border: 1px solid black;
            background-color: yellow;
            padding: 5px;
            text-align: center;
    }
```
- html代码
```html
    <div id="div1">一些文本...</div>
```
- 参考链接
 
 [css中的calc()函数详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc) 

##  伪元素after和before
> “伪元素”，顾名思义。它创建了一个虚假的元素，并插入到目标元素内容之前或之后。当然也可以根据绝对定位，设置伪元素到任何位置
-css代码 
```css
    .ech-arrow-l {
        position: relative;
    }
    .ech-arrow-l:before {
        position: absolute;     
        content: "";
        display: block;
        border-style: solid;
        margin: auto;
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        bottom: 0;
        border-width: 10px 10px 10px 0;
        border-color: transparent #ccc transparent transparent;
    }
```
- html代码
```html
    <span class="ech-arrow-l">arrow-l</span>
```
- 参考链接

[伪类元素应用可参考这里](https://juejin.im/post/5b6d0c5cf265da0f504a837f) 

##  box-sizing
> 在标准盒子模型中，元素的总宽＝content + padding + border + margin;
> 使用box-sizing属性会重定义这个计算方式，它有三个取值，分别是：content-box（默认）、border-box、padding-box
-css代码 
```css
    /*假如定义一个栈页面宽为300px像素的div,并且内边距为10px,边框为5px，以下是不同的两种方式*/
   .normal_box {
        width: 270px;   
        height: 150px;
        padding: 10px;
        border: 5px solid red;
    }

    .boxsizing_box {
        margin-top: 50px;
        box-sizing: border-box;
        width: 300px;  
        height: 150px;
        padding: 10px;
        border: 5px solid red;
    }

```
- html代码
```html
    <div class = "normal_box"></div>
    <div  class = "boxsizing_box"></div>
```
- 参考链接

[box-sizing内容详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 

##  animation动画中的steps()
> animation-timing-function属性定义CSS动画在每一动画周期中执行的节奏。可能值为一或多个 <timing-function>
> steps（）有两个参数：参数一是把这次过渡分成几段，这几段其实是在时间上分为几段去显示执行。参数二是表示分成几段后，他是start还是end去执行动画。参数二有两个可选值start和end，默认是end。
-css代码 
```css
    .hi{
            width: 50px;
            height: 72px;
            background-image: url("http://s.cdpn.io/79/sprite-steps.png");
            /*深度理解
            *整个动画1s完成。
            *这里1s要移动500的像素，这1s要有十步走完，每步是平均下来是0.1s，
            *每步比上一步多走了72px的位置，这个走是瞬间走到的。
            *end表示每一步在接近0.1s再去走
            */
            animation: play 1s steps(10) infinite;
        }
        /*定义动画*/
        @keyframes play {
            from { background-position:    0px 0px; }
            to { background-position: -500px 0px; }
        }

```
- html代码
```html
    <img src="http://s.cdpn.io/79/sprite-steps.png" alt="此图片是500*72，主要是为了显示作用">
    <div class="hi"></div>
```
- 参考链接

[animation-timing-function内容详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)
[steps()实例](https://blog.csdn.net/LY_code/article/details/80209183)  

### 源码地址
[html源码](https://github.com/liuguoxionglang/react-redux/blob/master/cssapplication.html)


