# d3 饼图
> pie 生成器不会直接生成图形，但是会计算生成饼图或环形图所需要的角度信息，这些角度信息可以被传递给 arc generator。
## api
- d3.pie()
    > 创建一个新的返回默认值得pie生成器
- pie(data[, arguments…]) 
    > 根据指定的 data 数组生成一组对象数组，返回的数组对象包含以下属性：
    - data - 输入数据; 对应输入数组中的数据元素.
    - value - arc 对应的 value.
    - index - arc 基于 0 的 sorted index(排序后的索引).
    - startAngle - arc 的 start angle.
    - endAngle - arc 的 end angle.
    - padAngle - arc 的 pad angle.
- pie.value([value]):指定此生成器的值访问器
    > 如果指定了 value 则设置当前饼图生成器的值访问器为指定的函数或数值，并返回当前饼图生成器。如果没有指定 value 则返回当前的值访问器默认为
- pie.sort([compare]):数据比较函数
    > 如果指定了 compare 则将数据比较函数设置为指定的函数并返回饼图生成器。如果没有指定 compare 则返回当前的数据对比函数，默认为 null。如果数据比较函数和值比较函数都为 null 则返回的 arc 会保持数据的次序。否则，返回的结果会安装相应的比较函数进行排序。排序操作是通过修改每个生成的元素的起始角度值来实现排序的，传入数据的次序不会被修改
- pie.sortValues([compare])
    > 如果指定了 compare 则将 value 比较函数设置为指定的函数并返回当前的饼图生成器。如果没有指定 compare 则返回当前的值比较函数，默认为降序。
- pie.startAngle([angle])
    > 如果指定了 angle 则将饼图的布局起始角度设置为指定的函数或数值并返回饼图生成器
- pie.endAngle([angle])
    > 如果指定了 angle 则将整个饼图的终止角度设置为指定的函数或数值并返回当前饼图生成器。
- pie.padAngle)[angle]  
    > 如果指定了 angle 则将饼图扇形之间的间隔设置为指定的函数或数值，并返回当前饼图生成器。        
## 实例 
- html代码
```html
    // 引入d3.v5库
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <div id="container"></div>
```
- js代码
```javascript
     //  svg画布的宽高
        var width = 600,
            height = 400,
            data = [
                {name:"caocao",value:1212},
                {name:"sunquan",value:1200},
                {name:"liubei",value:999},
                ];
        var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height);

         //svg中添加g元素
        var g = svg
            .append("g")
            .attr("transform","translate(150,150)")
            //.attr("stroke","red");

        // 创建环形 扇形生成器 并设置内径和外径
        var arc =d3.arc()
                    .innerRadius(40)
                    .outerRadius(100)
        
        // 创建饼图生成器，并转换数据，以供arc使用
        var arcs = d3.pie().value(function(d){return d.value})(data);
        console.log(arcs,"...arcs...");
        
        // 添加饼图路径
        g
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", function(d){ return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`})
        .attr("d", arc)

        // 添加标签数据
        g.selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .text(function(d){return d.data.name})
        .attr("transform",function(d){return `translate(${arc.centroid(d)})`})
        // .attr("transform","translate(0,0)")
        .attr("text-anchor","middle")

        // 添加标题
        g
        .append("text")
        .attr("class","centertext")
        .text("战斗力")
        .attr("transform","translate(0,0)")
        .attr("text-anchor","middle")
```
