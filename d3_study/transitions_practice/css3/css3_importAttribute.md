# css3 重点特性介绍
## css3新增的选择器 

|选择器|例子|解释|
|:--:|:--:|:--|
|element1~element2 |p~ul|选择前面有 \<p> 元素的每个\<ul> 元素|
|[attribute^=value] |	a[src^="https"] |	选择其 src 属性值以 "https" 开头的每个 \<a> 元素。	|
|[attribute$=value] |	a[src$=".pdf"] |	选择其 src 属性以 ".pdf" 结尾的所有 \<a> 元素。	|
|[attribute*=value] |	a[src*="abc"] |	选择其 src 属性中包含 "abc" 子串的每个 \<a> 元素。	|
|:first-of-type     |	p:first-of-type|	选择属于其父元素的首个 \<p> 元素的每个 \<p> 元素。	|
|:last-of-type      |	p:last-of-type|	选择属于其父元素的最后 \<p> 元素的每个 \<p> 元素。	|
|:only-of-type      |	p:only-of-type|	选择属于其父元素唯一的 \<p> 元素的每个 \<p> 元素。	|
|:only-child        |	p:only-child|	选择属于其父元素的唯一子元素的每个 \<p> 元素。	|
|:nth-child(n)      |	p:nth-child(2)|	选择属于其父元素的第二个子元素的每个 \<p> 元素。	|
|:nth-last-child(n) |	p:nth-last-child(2)|	同上，从最后一个子元素开始计数。	|
|:nth-of-type(n)	|p:nth-of-type(2)|	选择属于其父元素第二个 \<p> 元素的每个 \<p> 元素。	|
|:nth-last-of-type(n)|	p:nth-last-of-type(2)|	同上，但是从最后一个子元素开始计数。	|
|:last-child        |	p:last-child|	选择属于其父元素最后一个子元素每个 \<p> 元素。	|
|:root              |	:root	|选择文档的根元素。	|
|:empty             |	p:empty|	选择没有子元素的每个 \<p> 元素（包括文本节点）。	|
|:target            |	#news:target|	选择当前活动的 #news 元素。	|
|:enabled           |	input:enabled	|选择每个启用的 \<input> 元素。	|
|:disabled          |	input:disabled	|选择每个禁用的 \<input> 元素	|
|:checked           |	input:checked	|选择每个被选中的 \<input> 元素。	|
|:not(selector)     |	:not(p)	|选择非 \<p> 元素的每个元素。	|
|::selection        |	::selection|	选择被用户选取的元素部分。	| 
## 文本效果
- text-shadow:向文本添加阴影。
    > text-shadow: h-shadow---必需。水平阴影的位置。允许负值; v-shadow---必需。垂直阴影的位置。允许负值; blur----可选。模糊的距离; color---可选。阴影的颜色; 
- box-shadow:
    > box-shadow: h-shadow---必需的。水平阴影的位置。允许负值; v-shadow---必需的。垂直阴影的位置。允许负值; blur---可选。模糊距离; spread---可选。阴影的大小; color--可选。阴影的颜色。; inset---可选。从外层的阴影（开始时）改变阴影内侧阴影; 
- text-overflow:规定当文本溢出包含元素时发生的事情
    > text-overflow: clip|ellipsis|string-----------修剪文本|显示省略符号来代表被修剪的文本|使用给定的字符串来代表被修剪的文本 
- word-wrap:允许对长的不可分割的单词进行分割并换行到下一行。
    > word-wrap: normal------只在允许的断字点换行（浏览器保持默认处理）,break-word------------ 在长单词或 URL 地址内部进行换行。 
- word-break :规定非中日韩文本的换行规则。
    > word-break: normal|break-all|keep-all; normal默认，break-all单词内换行，keep-all 只能在半角空格或连字符处换行。
- 常用实例
    ```javascript
            /*单行文本超出 显示省略号 样式如下：*/
            div{
                    width:200px; 
                    border:1px solid #000000;
                    overflow:hidden;
                    white-space:nowrap; /*不换行*/ 
                    text-overflow:ellipsis;
                }
            /*多行文本超出，显示省略号，样式如下：*/
            div{
                    width:400px;
                    margin:0 auto;
                    overflow : hidden;
                    border:1px solid #ccc;
                    text-overflow: ellipsis;
                    padding:0 10px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    line-height:30px;
                    height:60px;
                }

    ```      
## 颜色
- rgba : rgb为颜色值，a为透明度
- hsl : h:色相”，“s：饱和度”，“l：亮度”，“a：透明度”
    ```javascript
        color: rgba(255,99,00,1);
        color: hsla( 112, 72%, 33%, 0.68);

    ``` 
## 边框
- border-radius：一个用于设置所有四个边框- *-半径属性的速记属性
    >  border-radius: 1-4 length|% / 1-4 length|%; length----定义弯道的形状;%-----使用%定义角落的形状
- border-image:设置所有边框图像的速记属性。
    > border-image: source slice width outset repeat|initial|inherit;
    - border-image-source	用于指定要用于绘制边框的图像的位置
    - border-image-slice	图像边界向内偏移
    - border-image-width	图像边界的宽度
    - border-image-outset	用于指定在边框外部绘制 border-image-area 的量
    - border-image-repeat	用于设置图像边界是否应重复（repeat）、拉伸（stretch）或铺满（round）。 
    - 用法实例
    ```javascript
        .demo {
            border: 15px solid transparent;
            padding: 15px;   
            border-image: url(border.png);
            border-image-slice: 30;
            border-image-repeat: round;
            border-image-outset: 0;
        }
        
    ``` 
## 背景
- background-image:背景图片的资源路径
- background-size:规定背景图片的尺寸
    > background-size: length|percentage|cover|contain; 
- background-origin:规定背景图片的定位区域。
    > background-origin: padding-box|border-box|content-box;背景图像以边框为相对位置 | 背景图像以内边距为相对位置 | 背景图像以内容为相对位置
- background-clip:	规定背景的绘制区域。
    > background-clip: border-box|padding-box|content-box;	默认值,背景从边框开始绘制，包括边框| 背景从内边距处开始绘制，包括内边距，不包括边框| 背景从内容区开始绘制，不包括内边距及以外的区域
## 滤镜
> filter定义了元素(通常是\<img>)的可视效果(例如：模糊与饱和度)
-  blur(): 失焦感的高斯模糊，默认0rem
-  brightness(): 亮度，默认1，全黑0，曝光过度2+
-  contrast(): 对比度，默认1，全灰0，黑白分明2+ 
-  drop-shadow(): 透明区域无阴影的 
-  grayscale(): 叠加灰度，默认0，灰色1 
-  hue-rotate()：图像应用色相旋转，若值未设置，默认值是0deg。 
-  invert(): 反色，默认0，全灰0.5，反色1
-  opacity(): 透明度，默认1，全透明0
-  saturate(): 饱和度，默认1，灰色0，艳丽2+ 
-  sepia(): 叠加褐色，默认0，褐色1 
-  url():引用一个自定义的滤镜
```javascript
        <p>原图</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" />
        <p>黑白色filter: grayscale(100%)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter: grayscale(100%);"/>
        <p>褐色filter:sepia(1)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:sepia(1);"/>
        <p>饱和度saturate(2)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:saturate(2);"/>
        <p>色相旋转hue-rotate(90deg)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:hue-rotate(90deg);"/>
        <p>反色filter:invert(1)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:invert(1);"/>
        <p>透明度opacity(.5)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:opacity(.5);"/>
        <p>亮度brightness(.5)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:brightness(.5);"/>
        <p>对比度contrast(2)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:contrast(2);"/>
        <p>模糊blur(3px)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:blur(3px);"/>
        <p>阴影drop-shadow(5px 5px 5px #000)</p>
        <img src="https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg" style="filter:drop-shadow(5px 5px 5px #000);"/>
```
## 渐变
- 线性渐变
    > background: linear-gradient(direction, color-stop1, color-stop2, ...);
    ```javascript
        <!-- 从左上角到右下角的线性渐变： -->
            #grad {
                background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
                background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
            }
    ``` 
- 径向渐变
    > background: radial-gradient(center, shape size, start-color, ..., last-color);
    ```javascript
            <!-- 带有不同尺寸大小关键字的径向渐变： -->
            #grad1 {
                /* Safari 5.1 - 6.0 */
                background: -webkit-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); 
                /* Opera 11.6 - 12.0 */
                background: -o-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
                /* Firefox 3.6 - 15 */
                background: -moz-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
                /* 标准的语法 */
                background: radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
            }
    ``` 
## 过渡
- transition	简写属性，用于在一个属性中设置四个过渡属性。	
- transition-property	规定应用过渡的 CSS 属性的名称。	
- transition-duration	定义过渡效果花费的时间。默认是 0。	
- transition-timing-function	规定过渡效果的时间曲线。默认是 "ease"。	
- transition-delay  过渡的延迟时间
- 应用
    ```javascript
            div {
                width: 100px;
                height: 100px;
                background: red;
                -webkit-transition: width 2s, height 2s, -webkit-transform 2s; /* For Safari 3.1 to 6.0 */
                transition: width 2s, height 2s, transform 2s;
            }

            div:hover {
                width: 200px;
                height: 200px;
                -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
                transform: rotate(180deg);
        }
    ```  
## 动画
- @keyframes	规定动画规则。
- animation	所有动画属性的简写属性，除了 animation-play-state 属性。	
- animation-name	规定 @keyframes 动画的名称。	
- animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	
- animation-timing-function	规定动画的速度曲线。默认是 "ease"。	
- animation-fill-mode	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。	
- animation-delay	规定动画何时开始。默认是 0。	
- animation-iteration-count	规定动画被播放的次数。默认是 1。	
- animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。	
- animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。
- 应用
   ```javascript
        .stack {
            animation-name: stack;
        }
        .item:nth-child(1) {
            animation-name: stack-item-1;
        }
        @keyframes stack {
            0% {
                left: 22px;
            }
            15% {
                left: 22px;
            }
            30% {
                left: 52px;
            }
            50% {
                left: 52px;
            }
            80% {
                left: 22px;
            }
            }
            @keyframes stack-item-1 {
                0% {
                    transform: rotate(12deg * 0);
                }
                10% {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(0deg);
                }
                54% {
                    transform: rotate(0deg);
                }
                92% {
                    transform: rotate(12deg * 0);
                }
            }

     ``` 
## 转换
- 2d转换
    - transform	适用于2D或3D转换的元素	
    - transform-origin	元素要转换时的相对位置
    - 转换方法
        - matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。
        - translate(x,y)	定义 2D 转换，沿着 X 和 Y 轴移动元素。
        - translateX(n)	定义 2D 转换，沿着 X 轴移动元素。
        - translateY(n)	定义 2D 转换，沿着 Y 轴移动元素。
        - scale(x,y)	定义 2D 缩放转换，改变元素的宽度和高度。
        - scaleX(n)	定义 2D 缩放转换，改变元素的宽度。
        - scaleY(n)	定义 2D 缩放转换，改变元素的高度。
        - rotate(angle)	定义 2D 旋转，在参数中规定角度。
        - skew(x-angle,y-angle)	定义 2D 倾斜转换，沿着 X 和 Y 轴。
        - skewX(angle)	定义 2D 倾斜转换，沿着 X 轴。
        - skewY(angle)	定义 2D 倾斜转换，沿着 Y 轴。   
- 3d转换
    - transform	向元素应用 2D 或 3D 转换。	
    - transform-origin	允许你改变被转换元素的位置。	
    - transform-style	规定被嵌套元素如何在 3D 空间中显示。	
    - perspective	规定 3D 元素的透视效果。	
    - perspective-origin	规定 3D 元素的底部位置。	
    - backface-visibility 
    - 转换方法
        - matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。
        - translate3d(x,y,z)	定义 3D 转化。
        - translateX(x)	定义 3D 转化，仅使用用于 X 轴的值。
        - translateY(y)	定义 3D 转化，仅使用用于 Y 轴的值。
        - translateZ(z)	定义 3D 转化，仅使用用于 Z 轴的值。
        - scale3d(x,y,z)	定义 3D 缩放转换。
        - scaleX(x)	定义 3D 缩放转换，通过给定一个 X 轴的值。
        - scaleY(y)	定义 3D 缩放转换，通过给定一个 Y 轴的值。
        - scaleZ(z)	定义 3D 缩放转换，通过给定一个 Z 轴的值。
        - rotate3d(x,y,z,angle)	定义 3D 旋转。
        - rotateX(angle)	定义沿 X 轴的 3D 旋转。
        - rotateY(angle)	定义沿 Y 轴的 3D 旋转。
        - rotateZ(angle)	定义沿 Z 轴的 3D 旋转。
        - perspective(n)	定义 3D 转换元素的透视视图 
## 反射
> 此属性不是w3c标准属性  fiefox不支持， 需要通过-moz-element()模拟
> box-reflect：none | \<direction> \<offset>? \<mask-box-image>? 
- \<direction> = above | below | left | right
- \<offset> = \<length> | \<percentage>
- \<mask-box-image> =  none | \<url> | \<linear-gradient> | \<radial-gradient> | \<repeating-linear-gradient> | \<repeating-radial-gradient>
- 应用
    ```javascript
        .reflect{
            width:950px;
            margin:0 auto;
            -webkit-box-reflect:below 0 -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));
            font:bold 100px/1.231 georgia,sans-serif;
            text-transform:uppercase;
        }
    ```  
## 多列
- column-count:创建多列  列数
- column-gap：列与列之间的间隙
- column-rule-style ：列与列间的边框样式
- column-rule-width ：两列的边框厚度:
- column-rule-color ：两列的边框颜色：
- column-rule：column-rule-* 所有属性的简写。
- column-span:跨域列的数量
- column-width:属性指定了列的宽度。
- 应用
    ```javascript
        /*设置一个3列 边框宽度为2px 边框颜色为#000 样式为实线 的多列*/
        .newspaper {
            column-count: 3;
            -webkit-column-count: 3;
            -moz-column-count: 3;
            column-rule:2px solid #000;
            -webkit-column-rule:2px solid #000;
            -mox-column-rule:2px solid #000;
        }  

    ``` 
## 媒体查询：
> 监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式！
> @media not|only mediatype and (expressions) {CSS 代码...;} not、only为修改符  mediatype 设备类型  expressions 条件表达式

```javascript
    @media screen and (min-width: 480px) {
        #leftsidebar {width: 200px; float: left;}
        #main {margin-left:216px;}
    }
```
## 布局
- 弹性布局(Flex) :display:flex
    > 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
    - 容器属性。
        - flex-direction :属性决定主轴的方向
            > flex-direction: row | row-reverse | column | column-reverse;
            - row（默认值）：主轴为水平方向，起点在左端。
            - row-reverse：主轴为水平方向，起点在右端。
            - column：主轴为垂直方向，起点在上沿。
            - column-reverse：主轴为垂直方向，起点在下沿。 
        - flex-wrap:定义换行状态
            >  flex-wrap: nowrap | wrap | wrap-reverse;
            - nowrap（默认）：不换行。 
            - wrap：换行，第一行在上方
            - wrap-reverse：换行，第一行在下方。
        - flex-flow：flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
        - justify-content：定义了项目在主轴上的对齐方式。
            >  justify-content: flex-start | flex-end | center | space-between | space-around;
            - flex-start（默认值）：左对齐
            - flex-end：右对齐
            - center： 居中
            - space-between：两端对齐，项目之间的间隔都相等。
            - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍 
        - align-items : 定义项目在交叉轴上如何对齐。
            > align-items: flex-start | flex-end | center | baseline | stretch;
            - flex-start：交叉轴的起点对齐。
            - flex-end：交叉轴的终点对齐。
            - center：交叉轴的中点对齐。
            - baseline: 项目的第一行文字的基线对齐。
            - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 
        - align-content : 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
            > align-content: flex-start | flex-end | center | space-between | space-around | stretch; 
            - flex-start：与交叉轴的起点对齐。
            - flex-end：与交叉轴的终点对齐。
            - center：与交叉轴的中点对齐。
            - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
            - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
            - stretch（默认值）：轴线占满整个交叉轴 
    - 项目属性
        - order ： 定义项目的排列顺序。数值越小，排列越靠前，默认为0。
            > order: \<integer>; 
        - flex-grow : 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
            > flex-grow: \<number>; /* default 0 */ 
        - flex-shrink : 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
            > flex-shrink: \<number>; /* default 1 */ 
        - flex-basis : 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
            > flex-basis: \<length> | auto; /* default auto */ 
        - flex : 此属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。
        - align-self  ： 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
            > align-self: auto | flex-start | flex-end | center | baseline | stretch; 
- 格栅布局:grid
    
    > CSS网格布局（又称“网格”），是一种二维网格布局系统,采用 grid 布局的元素，称为grid容器,
    - 网格容器上的属性
        - display
            > display: grid | inline-grid | subgrid; 当元素设置了网格布局，column、float、clear、vertical-align属性无效
            - grid: 生成块级网格
            - inline-grid: 生成行内网格
            - subgrid: 如果网格容器本身是网格项（嵌套网格容器），此属性用来继承其父网格容器的列、行大小。 
        - grid-template-columns
            > grid-template-columns: <track-size> ... | <line-name> <track-size> ... ; 设置列的大小，在列轨道两边是网格线。
            - track-size: 轨道大小，可以使用css长度，百分比或用分数（用fr单位）。
            - line-name: 网格线名字，你可以选择任何名字。 
        - grid-template-rows
            > grid-template-rows: <track-size> ... | <line-name> <track-size>...;  设置行的大小，在行轨道两边是网格线。
            ```javascript
                /*设置 五列三行的布局容器*/
                .container{
                    display:grid;
                    grid-template-columns: 40px 50px auto 50px 40px;
                    grid-template-rows: 25% 100px auto;
                }

                /*你也可以给网格线定义名字，注意名字需要写在[]里面 网格线可以有多个名字*/
                .container{
                    display:grid;
                    grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
                    grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
                }

            ```
        - grid-template-areas
        - grid-column-gap
        - grid-row-gap
        - grid-gap
        - justify-items
        - align-items
        - justify-content
        - align-content
        - grid-auto-columns
        - grid-auto-rows
        - grid-auto-flow
        - grid
    - 子项属性
        - grid-column-start
        - grid-column-end
        - grid-row-start
        - grid-row-end
        - grid-column
        - grid-row
        - grid-area
        - justify-self
        - align-self 
                  
    [格栅布局详解](https://www.jianshu.com/p/d183265a8dad) 
    