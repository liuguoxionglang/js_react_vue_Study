# 可视化设计中的css总结
> 用css 实现可视化的过程中的一些方法 总结

###  蒙版文字
> 利用css中的相对定位和绝对定位，实现元素的两层组合，底层显示图片或者其他重要信息，顶层蒙版显示对底层的简易介绍之类的次要信息
- css代码
    ```css
        .box{
            position: relative;
            height: 200px; width: 300px
        }
        .background{
            background-image: url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg);
            background-size: cover;
            height: 100%;
            width: 100%;
        }
        .modal{
            position:absolute;
            height: 20%; 
            width: 100%;
            bottom: 0;
            color: white;
            background: rgba(0,0,0,.5)
        }
       
    ```
- html代码
    ```html
         <div class='box' >
                <div class='background'></div> <!--底层正文-->
                <div class='modal'>简单介绍</div> <!--模顶层模板-->
        </div>
    ```
- 实际效果 
 
    ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/position.jpg) 
###  毛玻璃蒙版
> 在蒙版文字的基础上，对顶层元素加以滤镜等操作，使其模糊化，使其显得更加柔和
> filter:blur()  给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；
- css代码
    ```css
        .main_content{
            position: relative; 
            height:200px; 
            width:300px;
            background: fixed url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg);
        }
        .blur-content{
            position: absolute;
            height:50px; 
            width:300px;
            top: 150px;
            background: fixed url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg);
            filter:blur(1rem)
        }
        .desc_content{
            position: absolute; 
            height:50px; 
            width:300px;
            top: 150px;
            background: rgba(0,0,0,.2);
            color: white
        } 
       
    ```
- html代码
    ```html
         <div class='main_content'>
            <div class='blur-content'></div>
            <div class='desc_content'> 简单的描述 </div>
        </div>
    ```
- 实际效果 
 
    ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/blur.jpg) 
###  滤镜背景
> 在多层元素叠加组合后，把底层元素通过滤镜模糊化作为背景，在顶层元素实现主要内容，使用这种模式，淡化背景图，豆瓣电影页面的介绍好多都采用这用模式
- css代码
    ```css
        .box{
                position: relative
            }
            .background{
                background: url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg);
                background-size: 200%;
                height: 200px; 
                width: 400px;
                filter: blur(16px)
            }
            .content{
                position: absolute;
                height: 200px; 
                width: 400px; 
                top: 0px; 
                left: 0px; 
                background: rgba(0,0,0,.5);
                color: white; 
                text-align: center
            }
       
    ```
- html代码
    ```html
         <div class='box' >
            <div class='background'></div>
            <div class='content'>
                夏洛特烦恼
            </div>
        </div>
    ```
- 实际效果 
 
    ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/blur_background.jpg)  
###  科技感边框及背景
> box-shadow: h-shadow |  v-shadow | blur | spread | color |  inset
> 水平阴影的位置 | 垂直阴影的位置| 模糊距离 | 阴影的大小 |阴影的颜色 | 从外层的阴影（开始时）改变阴影内侧阴影;
- 图片边框
    > 利用ps做的精美图片作为显示内容的边框，模块化，清晰明确，用户能够快速的找到想要看的信息，同时配合整体页面，提高页面的科技感
    - css代码
    ```css
       .pic,.pic1{
                height: 10rem; 
                width: 20rem; 
                color:rgba(255,255,255,.9);
                border: 20px solid transparent;
                border-image: url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/border.png) 5%;
                background:rgba(0,0,0,.3);
                margin-left: 50px;
                float: left;
        }
        .pic1{
                box-shadow:  0 0 5rem rgb(0,110,150) 
        }
       
    ```
    - html代码
        ```html
             <div class='pic'>正常</div>
             <div class='pic1'>外发光</div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/pic_border.jpg) 
- 发光边框
    > 用 box-shadow样式制作，或者ps图片制作，增强立体感以及起到提示的作用
    - css代码
    ```css
        .box{
                height: 200px;
                width: 400px; 
                color:white; 
                padding: 1rem;
                box-shadow: 0 0 3rem rgba(100,200,255,.5) inset;
                background: rgba(0,0,0,.3); 
                border: 1px solid rgba(100,200,255,.5)
            }
       
    ```
    - html代码
        ```html
            <div class='box'>
                数据总览
            </div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/box_shdow.jpg) 
- 渐变背景
    > 利用渐变实现颜色的平缓过渡
    > background: linear-gradient(direction, color-stop1, color-stop2, ...);
    - css代码
    ```css
           .panel_1{
                height: 12rem; 
                width: 24rem; 
                color:rgba(60,240,250,1); 
                font-size: 1.5rem; 
                padding:1rem;
                border-radius: .5rem;
                border: 1px solid rgba(0,180,220,0.5);
                background: linear-gradient(180deg,rgba(0,180,220,0.3),rgba(0,180,220,0.1),rgba(0,180,220,0.1),rgba(0,180,220,0.3));
                box-shadow: 0 0 2rem rgba(0,180,220,.1) inset
            } 
    ```
    - html代码
        ```html
            <div class='panel_1'>监控数据</div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/gradient.jpg) 
- 渐变 滤镜在布局中的应用
    > 容器属性flex-flow:是flex-direction属性和flex-wrap属性的简写形式,设置主轴方向和换行状态
    > 项目属性 flex：是flex-grow, flex-shrink 和 flex-basis的简写，设置项目的放大比例默认0，缩小比例默认1，项目占据的主轴空间默认auto
    - css代码
        ```css
            .panel_2{
                display: flex; 
                flex-flow: column nowrap;//纵向为主轴方向，不换行
                height: 23rem; 
                width: 40rem;
                box-shadow: 0 0 1rem rgba(0,0,0,.5);
            }
            .panel-head{
                flex: 0 0 3rem;
                font-size: 1.5rem; 
                color: rgba(255,255,255,.7); 
                line-height: 3rem; 
                text-align: center;
                background: linear-gradient(rgb(0,20,30), rgb(0,40,70));
                border: 2px solid rgba(0,90,120,.3);
                
            }
            .panel-body{
                flex: 1 0 auto; //容器空间大，项目放大，容器空间小，项目不变，自动计算
                background: rgba(0,0,0,.3);
                border: 2px solid rgba(0,90,120,.4);
                border-top:none
            }
            .panel_2:hover{
                filter:brightness(1.2) //亮度增强到1.2倍
            }
        ```
    - html代码
        ```html
            <div class='panel_2'>
                <div class='panel-head'>标题行</div>
                <div class='panel-body'></div>
            </div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/flex.jpg)  

- 渐变实现倒直角效果
    > background: linear-gradient(direction, color-stop1, color-stop2, ...);
    > 每一颜色停止点，都可以用数值，或百分比指定具体位置，当两种颜色同时终止与一个点的时候，则会在此处形成一条硬线
    > mdn上是这样解释的(If two or more color stops are at the same location, the transition will be a hard line between the first and last colors declared at that location. )
    - css代码
        ```css
            .panel{
                height: 12rem; width: 24rem;
                border: 1px solid rgba(22,78,137,1);
                background: rgba(13,35,61,1);
                position: relative;
            }
            .panel::after{
                content: attr(corner);
                display: block; 
                position: absolute; 
                top: 0; 
                right: 0; 
                width:100px; 
                padding: 0 1rem; 
                overflow: hidden; 
                text-align: right; 
                color: rgba(255,255,255,.9);
                background: linear-gradient(45deg,transparent 0% , transparent 30%,  rgba(122,78,137,1) 30%,  rgba(22,78,137,1) 100%)
            }
        ```
    - html代码
        ```html
            <div class='panel' corner='按钮'></div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/linear_coner.jpg)   

- 按钮的按压效果
    > 利用css过渡和box-shadow使按钮点击前后产生立体效果
    - css代码
        ```css
             .box{
                height: 100px; width: 300px;
                background: blue; margin: 2rem;
                box-shadow: 0 0 1rem gray;
                cursor: pointer;
                transition: all .3s;
                border-radius: 50px;
                text-align: center;
                font-size : 25px;
                line-height: 100px
            }
            .box:active{
                box-shadow: 0 0 0px gray; 
                transform: scale(0.99)
            }
        ```
    - html代码
        ```html
             <div class='box'>点击我</div>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/btn.gif)
- 选中的凸显效果
    > 利用css过渡 变换 滤镜 以及box-shadow实现被点击时的高亮效果
    - css代码
        ```css
             li{
                display: inline-block; 
                height: 200px; 
                width: 150px;
                background: url(https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/p.jpg);
                background-size: 100%;
                box-shadow: 0 2px 2px #222222;
                border: 2px solid transparent;
                border-radius: 5px;
                filter: brightness(.7);
                cursor: pointer;
                transition: all .2s
            }
            li:hover{
                box-shadow: 0 0 30px yellow;
                border: 2px solid yellow;
                transform: translate(0,-10%);
                filter: brightness(1);
            }
        ```
    - html代码
        ```html
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        ```
    - 实际效果 
    
        ![](https://raw.githubusercontent.com/liuguoxionglang/react-redux/master/selected.jpg??raw=true)             