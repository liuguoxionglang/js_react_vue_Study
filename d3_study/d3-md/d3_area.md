# d3 区域图
> area generator(区域生成器) 用来在 area 图中生成区域图。一个区域图由两条边界 lines 定义，可以是曲线或折线。通常情况下两条边界线共享一个 x-values (x0 = x1)，仅仅是 y-value (y0 和 y1) 不一样。大多数情况下，y0 会被定义为一个常量 zero. 第一条线 (也就是 上侧线) 由 x1 和 y1 定义渲染。而第二条线 (也就是 基线) 由 x0 和 y0 定义渲染。有了 curveLinear curve，就可以生成一个顺时针方向的多边形。
## api
- d3.area()
    > 创建一个默认的区域生成器
- area(data)
    > 根据指定的一组数据 data。根据这个区域生成器的相关 curve ，给定的输入数据可能需要在传递给区域生成器之前按 x- 值排序。
- area.x([x])
    > 如果指定了 x 则设置 x0 为 x 并且设置 x1 为 null，返回当前区域生成器。如果没有指定 x 则返回当前 x0 访问器。
- area.x0([x])
    > 如果指定看 x 则将 x0 访问器设置为指定的函数或数值并返回当前区域生成器。如果没有指定 x 则返回当前 x0 生成器,
- area.x1([x])
    > 如果制定了 x 则设置 x1 访问器为指定的函数或数值并返回区域生成器。如果 x 没有指定则返回当前的 x1 访问器，默认为 null 表示先前计算的 x0 值应该为 x1 值重用。
- area.y([y])
    > 如果指定了 y 则设置 y0 为 y 并设置 y1 为 null, 返回区域生成器。如果 y 没有被指定则返回当前的 y0 访问器。
- area.y0([y])
    > 如果指定了 y 则设置 y0 访问器为指定的函数或数值并返回当前区域生成器。如果没有指定 y 则返回当前 y0 访问器
- area.y1([y])
    > 如果指定了 y 则将 y1 访问器设置为指定的函数或数值并返回当前区域生成器。如果没有指定 y 则返回当前 y1 访问器
- area.defined([defined])
    > 如果指定了 defined 则将定义访问器设置为指定的函数或布尔值并返回区域生成器。如果没有指定 defined 则返回当前定义访问器默认为：function defined() {return true;}
- area.context([context])
    > 如果指定了 context 则将区域生成器的上下文设置为指定的 context。如果没有指定 context 则返回当前上下文，默认为 null。
- area.curve([curve])
    > 如果指定了 curve 则将 curve factory 设置为指定的 curve 并返回区域生成器。如果没有指定 curve 则返回默认的插值方式，默认为 curveLinear。
- area.lineX0()
- area.lineY0()
- area.lineX1()
- area.lineY1()
> 返回一个新的 line generator, 
## 实例 
- html代码
```html
    <div id="container"></div>

```
- js代码
```javascript
 //  svg画布的宽高
        var width = 600,
            height = 400,
            margin = {left:60,top:30,right:30,bottom:60}
            data = [
                {date:"2019-08-10",value:1212},
                {date:"2019-08-11",value:1200},
                {date:"2019-08-12",value:999},
                {date:"2019-08-13",value:1099},
                {date:"2019-08-14",value:1299},
                {date:"2019-08-15",value:899},
                ];
        var chart_width = width - margin.left - margin.right;
        var chart_height = height - margin.top - margin.bottom;        
        var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height);
        var g = svg.append("g")
                .attr("width",chart_width).attr("height",chart_height)
                .attr("transform",`translate(${margin.left},${margin.top})`);

        // x轴缩放比例
        var scale_x = d3.scaleBand()
                    .domain(data.map(item=>item.date))
                    .range([0,chart_width]);

            // y轴缩放比例
            var scale_y = d3.scaleLinear()
                    .domain([0,d3.max(data.map(item=>item.value))+200])
                    .range([chart_height,0])
            
            // 创建x轴
            var xaxis = d3.axisBottom(scale_x);
            // 创建y 轴
            var yaxis = d3.axisLeft(scale_y);
            
            // 添加x轴到画布
            g.append("g").call(xaxis).attr("transform",`translate(0,${chart_height})`)
            // 添加y轴到画布
            g.append("g").call(yaxis)

            // 创建区域生成器
            var area = d3.area()
                    // .defined(d => !isNaN(d.value))
                    .x(function(d){
                        console.log(d.date,scale_x(d.date),"..............scale_x(d.date).........")
                        return scale_x(d.date)})
                    .y0(scale_y(0))    
                    .y1(function(d){
                        console.log(scale_y(d.value),"...y.....")
                        return scale_y(d.value)})
            
            // 添加折现
            g.append("path")
            .datum(data)
            .attr("fill", "rgba(126,230,129,0.5)")
            .attr("stroke", "rgba(126,230,129,0.5)")
            .attr("stroke-width", 3)
            // .attr("stroke-linejoin", "round")
            // .attr("stroke-linecap", "round")
            .attr("d", area);

            // svg.append("path")
            // .datum(data.filter(area.defined()))
            // .attr("fill", "#eee")
            // .attr("d", area);

    
```