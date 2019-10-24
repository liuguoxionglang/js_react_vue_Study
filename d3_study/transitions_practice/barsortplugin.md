# Barsort插件使用说明

- 引入文件
 
    ```javascript
         /*html文件中先引入d3.v5文件，bar_sort_plugin.js文自定义的排名插件*/
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <script src="https://d3js.org/d3.v5.min.js"></script>
            <script src="./bar_sort_plugin.js"></script>
            <title>Document</title>
        </head>
    ```
- 定义容器
    ```javascript
        /*定义容器div*/
        <div id="container"></div>
    ```
- 准备数据
    ```javascript
      /**
       * 定义模拟数据data，按照value字段排名,value字段值必须是数值或者能强制转化成数值的类型
       * 
       * containerID为容器id
       * options 参数配置
       *    svg_width:svg画布的宽
       *    svg_height:svg画布的高
       *    chart_margin:svg画布中定义的柱状图容器（相当于一个div）的外边距：
       *        left:可以控制每个柱状图的类目名称的宽度
       *        right:可以控制每个柱状图的数量标签的宽度
       */
     
         var 
        data = [
        {
            date: 1900,
            name: "百度",
            value: 800,
            color:'red'
        },
        {
            date: 1900,
            name: "阿里",
            value:820,
            color:'green'
        },
        {
            date: 1900,
            name: "腾讯",
            value: 790,
            color:'blue'
        },
        {
            date: 1900,
            name: "京东",
            value: 810,
            color:'pink'
        },
    ],
        containerid = "#container"
        options = {
            svg_width : 800,
            svg_height :600,
            chart_margin :{left:90,top:30,right:60,bottom:30},
        };
            
    ``` 
- 初始化
    ```javascript
        /*创建barsort实例，变调用init方法初始化*/
         var barsortinstance =  new BarSort(data,containerid,options);
        barsortinstance.init();

    ```
- 更新
    ```javascript
        /*先定义个定义器，每个一段时间更新数据，此定时器不是很完美*/
         let i = 1;    
        const inter = setInterval(function(){
            
            if(i>22) {
                clearInterval(inter);
                return;
            }
            i++;
            data = data.map(item=>{
                        item.date = item.date + 1;
                    
                        item.value = item.value + parseInt(Math.random()*100);
                        return item;
                    });
            if(1 === parseInt(Math.random()*5)){
                data.splice(parseInt(Math.random()*data.length),1);
                data.push({
                    id:parseInt(Math.random()*data.length+10),
                    date: 1900,
                    name: `Japan${parseInt(Math.random()*255)}`,
                    value: parseInt(Math.random()*1000)+parseInt(Math.random()*600),
                    color:`rgba(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`
                })
            }        
            data = data.sort((a, b) => b.value - a.value);
            /*通过之前创建的实例对象，调用redraw方法，并传入新的数据即可*/
            barsortinstance.redraw(data)
        
        },5000)
    
    ```     
  