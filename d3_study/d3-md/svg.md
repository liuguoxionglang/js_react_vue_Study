# svg入门api介绍
- svg 常用标签
    - 矩形:rect 
        > rect 元素有个6个属性 
        +  x:  矩形左上角的x轴坐标 
        +  y:矩形左上角的y轴坐标 
        +  rx:矩形圆角的x轴半径 
        +  ry: 矩形圆角的y轴半径  
        +  width:矩形的宽  
        +  height:矩形的高
          
        ```javascript
            //例如：
            <rect x="60" y="10" rx="10" ry="10" width="30" height="30"/> 
        ```
    - 圆:circle
        > circle 元素有个3个属性 
        +  r:  圆形的半径
        +  cx: 圆心的x轴坐标  
        +  cy: 圆心的y轴半径 
        ```javascript
            //例如：绘制一个圆心坐标为（25，75）半径为20的圆
           <circle cx="25" cy="75" r="20"/>
        ``` 
    - 椭圆:ellipse
        > ellipse 元素的4个属性 
        +  rx:  椭圆的x轴半径
        +  ry:  椭圆的y轴半径
        +  cx: 椭圆中心的x轴坐标  
        +  cy: 椭圆中心的y轴半径 
        ```javascript
            //例如：绘制一个圆心坐标为（75，75）x轴半径为20 y轴半径为5的椭圆
           <ellipse cx="75" cy="75" rx="20" ry="5"/>
        ```  
    - 折线:polyline
         > polyline 折现是由多条线段连接组成的，因此它的坐标就是一组坐标点的组合，用points属性表示
        +  points:  一个点坐标的数组，点坐标之间用逗号分开，点坐标的x y轴中间用空格分开
        ```javascript
            //例如：绘制折现
           <polyline points="60 110, 100 115, 75 180" />
        ```   
    - 线段:line
        > line 元素的4个属性 
        +  x1:  线段起点的x轴坐标
        +  y1:  线段起点的y轴坐标
        +  x2: 线段终点的x轴坐标  
        +  y2: 线段终点的y轴坐标
        ```javascript
            //例如：绘制一个条起点坐标为（10，50），终点坐标为（110，150）的线段
           <line x1="10" x2="50" y1="110" y2="150"/>
        ```  
    - 多边形:polygon
        > polygon 多边形元素是有多条线段收尾相连做成的，因此它的坐标就是一组坐标点的组合，用points属性表示
        +  points:  一个点坐标的数组，点坐标之间用逗号分开，点坐标的x y轴中间用空格分开
        
        ```javascript
            //例如：绘制一个4边型
           <polygon points="60 110, 100 115, 75 180,60 160,60 110, "/>
        ```  
    - 路径:path
        > path 使用path，可以绘制任何形状的图形
        +  d:  用d属性表示要绘制路径的坐标点，路径的绘制有多种方式，如直线、曲线、弧形线等如下：
            - M = moveto ：移动到某一点 Mx y
            - L = lineto ：绘制线段到指定点 Lx y
            - H = horizontal lineto ：绘制水平线段到指定x点 Hx
            - V = vertical lineto ：绘制垂直线段到指定的y点 VY
            - C = curveto ：绘制一条到指定点x y的三次贝塞尔曲线 Cx1 y1 x2 y2 x y 其中(x1,y1),(x2,y2)是控制点
            - S = smooth curveto ：绘制一条到指定点x y的反射贝塞尔曲线 Sx2 y2 x y 其中（x2,y2）是控制点
            - Q = quadratic Bézier curve ：绘制一条到指定点x y的二次贝塞尔曲线 Cx1 y1 x y 其中(x1,y1) 是控制点
            - T = smooth quadratic Bézier curveto：绘制一条到指定点x y的反射二次贝塞尔曲线 Tx y 前一个坐标点是控制点
            - A = elliptical Arc：A rx,ry x-axis-rotation large-arc-flag sweep-flag x,y
                - rx 弧的半长轴长度
                - ry 弧的半短轴长度
                - x-axis-rotation 是此段弧所在的x轴与水平方向的夹角，即x轴的逆时针旋转角度，负数代表顺时针旋转角度。
                - large-arc-flag 为1表示大角度弧线，0表示小角度弧线
                - sweep-flag 为1表示从起点到终点弧线绕中心顺时针方向，0表示逆时针方向。
                - xy 是终点坐标。 
            - Z = closepath : 关闭路径  链接最后一个点与第一个点
        
        ```javascript
            //例如：
           <path d="M0 0 Q50 50, 100 0 T200 0 Z" stroke="black" fill="none"/>
        ```  
    - 文本标签：text
        > text 元素定义了一个由文字组成的图形。注意：我们可以将渐变、图案、剪切路径、遮罩或者滤镜应用到text上。特有属性如下：
        + x ：当是一个数字时，表示文本元素左上角的x轴坐标；若为一组数字，依次为每一个文本内容对应的x轴坐标
        + y : 当时一个数字时，表示文本元素左上角的y轴坐标；若为一组数字，依次为每一个文本内容对应的y轴坐标
        + dx :基于原坐标，文本内容在x轴方向上的偏移量
        + dy :基于原坐标，文本内容在y轴方向上的偏移量
        + text-anchor :文本对齐方式
        + rotate：文本选装角度
        + textLength：文本长度
        + lengthAdjust ：长度调整（字间距和字母间距）
     
        ```javascript
            <svg width="900" height="600" xmlns="http://www.w3.org/2000/svg">
            <g font-face="sans-serif">
                <text x="20" y="20" dx="50" dy="100"   textLength="300" lengthAdjust="spacing">
                Stretched using spacing only.
                </text>
                <text x="20" y="80" dx="150" dy="100" rotate="60" >fdfdfdfdfddddddddd</text>
                <text x="20" y="110" textLength="100" lengthAdjust="spacingAndGlyphs">
                Shrunk using spacing and glyphs.
                </text>
            </g>
        </svg>
        ``` 
    - 分组标签（容器标签）:g
        > 元素g是用来组合对象的容器。添加到g元素上的变换会应用到其所有的子元素上。添加到g元素的属性会被其所有的子元素继承。
        > 此外，g元素也可以用来定义复杂的对象，之后可以通过\<use>元素来引用它们。svg的通用属性g元素都可使用

        ```javascript
            <svg width="100%" height="100%" viewBox="0 0 95 50"
                xmlns="http://www.w3.org/2000/svg">
                <g stroke="green" fill="white" stroke-width="5">
                    <circle cx="25" cy="25" r="15" />
                    <circle cx="40" cy="25" r="15" />
                    <circle cx="55" cy="25" r="15" />
                    <circle cx="70" cy="25" r="15" />
                </g>
            </svg>
        ```
         
    - 自定义一个形状 pattern
        > 容器元素，使用预定义的图形对一个对象进行填充或描边，就要用到pattern元素。pattern元素让预定义图形能够以固定间隔在x轴和y轴上重复（或平铺）从而覆盖要涂色的区域。
        > 先使用pattern元素定义图案，然后在给定的图形元素上用属性fill或属性stroke引用用来填充或描边的图案。
        + patternUnits：patter元素几何特性坐标系的指定
        + patternContentUnits ：patter元素内容坐标系的指定
        + patternTransform：The patternTransform attribute defines a list of transform definitions that are applied to a pattern tile.
        + x ：patter元素左上角的x轴坐标
        + y ：patter元素左上角的y轴坐标
        + width :patter元素的宽
        + height :patter元素的高
        + xlink:href ：应用外部资源
        + preserveAspectRatio:与viewport搭配使用，表示是否强制进行统一缩放
   
    ```javascript
        /*使用pattern定义基本形状，然后在circle元素上，使用fill属性引用定以后的基本元素进行填充*/
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="120" viewBox="0 0 120 120" version="1.1">
            <pattern id="Triangle" width="10" height="10" patternUnits="userSpaceOnUse">
                <polygon points="5,0 10,10 0,10"/>
            </pattern>           
            <circle cx="60" cy="60" r="50" fill="url(#Triangle)"/>
        </svg>
    ```
    - 自定义形状：defs
        > 容器元素 结构元素 SVG 允许我们定义以后需要重复使用的图形元素。 建议把所有需要再次使用的引用元素定义在defs元素里面。这样做可以增加SVG内容的易读性和可访问性。 在defs元素中定义的图形元素不会直接呈现。 你可以在你的视口的任意地方利用 <use>元素呈现这些元素。svg通用属性，都可使用 
        ```javascript
            /* 先定义一个线性渐变，然后在rect元素中引用刚定义的线性渐变*/
            <svg width="80px" height="30px" viewBox="0 0 80 30"
                xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <linearGradient id="Gradient01">
                    <stop offset="20%" stop-color="#39F" />
                    <stop offset="90%" stop-color="#F3F" />
                    </linearGradient>
                </defs>

                <rect x="10" y="10" width="60" height="10" 
                        fill="url(#Gradient01)"  />
            </svg>
        ``` 
    - 复制标签：use
        > use元素在SVG文档内取得目标节点，并在别的地方复制它们。它的效果等同于这些节点被深克隆到一个不可见的DOM中，然后将其粘贴到use元素的位置，很像HTML5中的克隆模板元素。因为克隆的节点是不可见的，所以当使用CSS样式化一个use元素以及它的隐藏的后代元素的时候，必须小心注意。隐藏的、克隆的DOM不能保证继承CSS属性，除非你明文设置使用CSS继承。出于安全原因，一些浏览器可能在use元素上应用同源策略，还有可能拒绝载入xlink:href属性内的跨源URI。
        + x ：被复制的元素被粘贴位置的左上角的x轴坐标
        + y ：被复制的元素被粘贴位置的左上角的y轴坐标
        + width ：被粘贴位置的宽
        + height ：被粘贴位置的高
        + xlink:href :引用外部资源
        ```javascript
            /*先预定义一个圆，然后用use元素复制给圆并粘贴到use元素当前的位置*/
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <style>
                    .classA { fill:red }
                </style> 
                <defs>
                    <g id="Port">
                    <circle style="fill:inherit" r="10"/>
                    </g>
                </defs>
                
                <text y="15">black</text>
                <use x="50" y="10" xlink:href="#Port" />
                <text y="35">red</text>
                <use x="50" y="30" xlink:href="#Port" class="classA"/>
                <text y="55">blue</text>
                <use x="50" y="50" xlink:href="#Port" style="fill:blue"/>
            </svg>

        ```  
    - 图片标签：image
        > SVG文件是这样的一种图像：不被当做外部资源加载，不可以用:visited 样式，不能有交互。使用动态SVG元素，可以用\<use>引入外部的URL。使用SVG文件并添加scripts在里面，可以用\<object> 放在 \<foreignObject>中
        + x：图像水平方向上到原点的距离
        + y：图像竖直方向上到原点的距离
        + width：图像宽度。和HTML的\<img>不同，该属性是必须的
        + height：图像高度。和HTML的\<img>不同，该属性是必须的
        + xlink:href：图像的URL指向
        + preserveAspectRatio：控制图像比例
        ```javascript
            <svg width="100%" height="100%" viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink"> 	 		
                 <image xlink:href="http://www.baidu.com/img/bd_logo1.png?qua=high" x="0" y="0" height="100" width="100" />  	
            </svg>
            
        ```  
    - 动画标签：animate
        > 动画元素放在形状元素的内部，用来定义一个元素的某个属性如何踩着时点改变。在指定持续时间里，属性从开始值变成结束值。专有属性有以下几个
        + attributeName ：指定父元素需要改变的属性
        + attributeType ：该属性指定目标属性和它相对应的值处于哪个命名空间里 通常有 css xml auto
        + from : 动画过程中被修改属性的初始值
        + to : 动画过程中被修改属性的终止值
        + dur : 完成动画所需的时间
        + repeatCount :动画重复次数
        ```javascript
            <svg width="120" height="120" viewPort="0 0 120 120" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
            
                <rect x="10" y="10" width="100" height="100">
                    <animate attributeType="XML" attributeName="x" from="-100" to="120"
                        dur="10s" repeatCount="indefinite"/>
                </rect>
            </svg>
        ```  

###参考文献

参考链接:[mdn svg ](https://developer.mozilla.org/zh-CN/docs/Web/SVG")        
     