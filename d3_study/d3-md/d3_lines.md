# d3  直线图
> line 生成器可以用来生成线条图需要的 spline 或 polyline。线条也可以被用在其他的可视化类型中
## api
- d3.line()
    > 使用默认的设置构造一个 line 生成器
- line(data)
    > 根据指定的 data 数组生成一个线条。根据与线条生成器的关联的 curve，输入数据 data 可能需要根据 x 值进行排序。如果线条生成器有 context，则线条会通过 path method 被渲染到指定的上下文中，否则返回一个 path data 字符串
- line.x([x])
    > 如果指定了 x 则将 x 访问器设置为指定的函数或数值并返回当前 line 生成器。如果没有指定 x 则返回当前 x 访问器，默认为: function x(d) {return d[0];}
- line.y([y])  
    > 如果指定了 y 则将 y 访问器设置为指定的函数或数值并返回当前 line 生成器。如果没有指定 y 则返回当前 y 访问器，默认为:function y(d) {return d[1];}
- line.defined([defined])
    > 如果指定了 defined 则将已定义的访问器设置为指定的函数或布尔值。如果没有指定 defined 则返回当前默认的已定义的访问器，默认为:function defined() { return true;}
- line.curve([curve])
    > 如果指定了 curve 则表示设置当前的 curve factory(曲线插值方法) 并返回线条生成器。如果没有指定 curve 则返回当前的线条插值方式，默认为 curveLinear.
- line.context([context])
    > 如果指定了 context 则设置上下文并返回当前线条生成器。如果没有指定 context 则返回当前的上下文，默认为 null
- line.lineRadial()
    > 使用默认的设置构造一个新的 radial line(径向线条) 生成器。径向线条生成器类似于笛卡尔坐标系下的 line generator，只不过 x 和 y 访问器被替换成了 angle 和 radius 访问器。径向线条的生成总是相对于 ⟨0,0⟩，但是你可以使用坐标变换调整其位置
## 实例
- html代码
```html
     <script src="https://d3js.org/d3.v5.min.js"></script>
     <div id="container"></div>
```
- js代码
```javascript
     //  svg画布的宽高
        var width = 600,
            height = 400,
            data = [
                {date:"2019-08-10",value:1212},
                {date:"2019-08-11",value:1200},
                {date:"2019-08-12",value:999},
                {date:"2019-08-13",value:1099},
                {date:"2019-08-14",value:1199},
                {date:"2019-08-15",value:899},
                ];
        var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height);
        var g = svg.append("g").attr("transform","translate(60,30)").attr("width",540).attr("height",340);
        
        // x轴缩放比例
        var scale_x = d3.scaleBand()
                .domain(data.map(item=>item.date))
                .range([0,width]);

        // y轴缩放比例
        var scale_y = d3.scaleLinear()
                .domain([0,d3.max(data.map(item=>item.value))+200])
                .range([height,0])
        
        // 创建x轴
        var xaxis = d3.axisBottom(scale_x);
        // 创建y 轴
        var yaxis = d3.axisLeft(scale_y);
        
        // 添加x轴到画布
        g.append("g").call(xaxis).attr("transform",`translate(0,${340})`)
        // 添加y轴到画布
        g.append("g").call(yaxis)

        // 创建线条生成器，并分别设置线条生成器的x,y访问器
        var line = d3.line()
                .x(function(d){
                    console.log(scale_x(d.date),"..x......")
                    return scale_x(d.date)})
                .y(function(d){
                    console.log(scale_y(d.value),"...y.....")
                    return scale_y(d.value)})
        
        // 添加折线
        g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        // .attr("stroke-linejoin", "round")
        // .attr("stroke-linecap", "round")
        .attr("d", line);



```