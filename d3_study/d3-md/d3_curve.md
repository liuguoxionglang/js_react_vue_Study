# d3 Curves
>把一些离散的点转换为连续的线条:在这些点之间进行插值，插值的方式有很多种。插值曲线通常不会直接使用，而是传递给 line.curve 和 area.curve。如:
```javascript
    var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    .curve(d3.curveCatmullRom.alpha(0.5));
```
## api
- d3.curveBasis(context)
    > 使用指定的控制点生成一个三次 basis spline(样条曲线)。第一个和最后一个点会被分成三个重复的点，这样就能保证线条经过第一个和最后一个点。并且曲线与第一个和第二个点之间的连线相切，同时与最后一个与倒数第二个点连线相切 
- d3.curveBasisClosed(context)
    > 使用指定的控制点生成一个闭合的三次 basis spline。当一个线段结束时，前三个控制点被重复，产生一个连续性的闭环。
- d3.curveBasisOpen(context)
    > 使用指定的控制点生成一个三次 basis spline。与 basis 不同，第一个和最后一个控制点不会被重复，这条曲线通常不会与这些点相交。
- d3.curveBundle(context)
    > 使用指定的控制点产生一个可以校正调整的三次 basis spline，校正系数根据曲线的 beta 系数确定，默认为 0.85。
    - bundle.beta(beta)
        > 根据指定的 beta 设置曲线的校正系数，系数范围为 [0, 1] 用来表示绑定强度。如果 beta 为 0 则会在第一个和最后一个点之间生成一个直线，如果 beta 为 1，则会生成一个标准的 basis。例如:var line = d3.line().curve(d3.curveBundle.beta(0.5)); 
- d3.curveCardinal(context)
    > 使用指定的控制点生成一条三次 cardinal spline 曲线，默认 tension 为 0.
- d3.curveCardinalClosed(context)
    > 使用指定的控制点生成一条闭合的三次 cardinal spline 曲线。默认 tension 为 0.
- d3.curveCardinalOpen(context)
    > 使用指定的控制点生成一条三次 cardinal spline 曲线，与 curveCardinal 不同，生成的曲线不利用第一个和最后一个点。默认 tension 为 0
    - cardinal.tension(tension) 
        > 使用指定的处于 [0, 1] 的 tension 系数设置曲线的张力，张力确定了切线的长度：张力为 1 等价于 curveLinear，张力为 0 等价于 Catmull–Rom。例如：var line = d3.line().curve(d3.curveCardinal.tension(0.5));
- d3.curveCatmullRom(context)
    > 使用指定的控制点和默认值为 0.5 的 alpha 值生成一条 Catmull–Rom 曲线
- d3.curveCatmullRomClosed(context)
    > 使用指定的控制点和默认值为 0.5 的 alpha 值生成一条闭合的 Catmull–Rom 曲线。
- d3.curveCatmullRowOpen(context)
    > 使用指定的控制点和默认值为 0.5 的 alpha 值生成一条 Catmull–Rom 曲线。与 curveCatmullRom 不同的是所生成的曲线不经过第一个和最后一个控制点
    -  catmullRom.alpha(alpha)
        > 使用指定的 alpha 值([0, 1]) 返回一条 Catmull–Rom 生成器。如果 alpha 为 0 则等价于 curveCardinal，如果 alpha 为 1 则会生成 chordal 曲线，如果 alpha 为 0.5 则会生成 centripetal spline。例如:var line = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
- d3.curveLinear(context)
    > 通过制定的点产生折线
- d3.curveLinearClosed(context) 
    > 通过致电的点产生闭合折线
- d3.curveMonotoneX(context)
    > 产生一条在 y 方向保持单调性的曲线，假设在 x 方向是单调的。
- d3.curveMonotoneY(context)     
    > 产生一条在 x 方向保持单调性的曲线，假设在 y 方向是单调的。
- d3.curveNatural(context)    
    > 产生一条 自然的 的 三次样条曲线，其二阶导数在端点设为零。
- d3.curveStep(context)
    > 产生一个分段常数函数 (阶梯函数)，由水平和垂直的交替线组成。y 值在每一对相邻 x 值的中点处发生变化。
- d3.curveStepAfter(context)
    > 产生一个分段常数函数 (阶梯函数)，由水平和垂直的交替线组成。y 值在 x 值之后发生变化。
- d3.curveStepBefore(context)
    > 产生一个分段常数函数 (阶梯函数)，由水平和垂直的交替线组成。y 值在 x 值之前发生变化。     
## 实例 
- css代码
```css
    <style>
            #container {
                padding-top: 20px
      
            }
            svg {
                overflow:visible;
                margin:50px;
                font: 2em Open Sans, Impact;
            }
           
    </style>
``` 
- html代码
```html
    /*引入d3.v5版本库*/
     <script src="https://d3js.org/d3.v5.min.js"></script>
     <div id="container"></div>
     
```
- js代码
```javascript
     //  svg画布的宽高
        var width = 600,
            height = 400,
            margin = {left:60,top:30,right:30,bottom:60}
            data =[[30, 230], [130, 150],[230, 180], [330, 330], [430, 250], [530, 280], [630, 180], [680, 250]];
        var chart_width = width - margin.left - margin.right;
        var chart_height = height - margin.top - margin.bottom;        
        var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height);
        //图表区域
        var g = svg.append("g")
                .attr("width",chart_width).attr("height",chart_height)
                .attr("transform",`translate(${margin.left},${margin.top})`);
        // 标题        
        var curve_type = svg.append("g").attr("width",100).attr("height",28)        

        // x轴缩放比例
        var scale_x = d3.scaleLinear()
                    .domain([0,d3.max(data.map(item=>item[0]))])
                    .range([0,chart_width]);

        // y轴缩放比例
        var scale_y = d3.scaleLinear()
                .domain([0,d3.max(data.map(item=>item[1]))])
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
        var lineGenerator =  lineGenerator = d3.line()
                    .x(function(d) {
                        // 按照缩放比例缩放
                        return scale_x(d[0])
                    })
                    .y(function(d) {
                        // 按照缩放比例缩放
                        return scale_y(d[1]);
                    });
        
        //  添加折线，用于比较 方式一
        // g.append('path')
        //         .attr('stroke', '#ccc')
        //         .attr('stroke-width', '2')
        //         .attr('fill', 'none')
        //         .attr('d', lineGenerator(data));
        
         //添加折线，用于比较 方式二
        g.append('path').datum(data)
        .attr('stroke', '#000')
        .attr('stroke-width', '2')
        .attr('fill', 'none')
        .attr('d', lineGenerator);        

    //  获取颜色组合
        var colors = d3.schemePaired, //十二分类颜色
        //  获取相关的曲线工厂
        curves = ['curveBasis', 'curveBasisClosed', 'curveBasisOpen', 'curveBundle', 'curveCardinal','curveCardinalClosed',
                 'curveCardinalOpen', 'curveCatmullRom', 'curveCatmullRomClosed','curveCatmullRomOpen', 'curveLinear','curveLinearClosed',
                  'curveMonotoneX', 'curveMonotoneY','curveNatural', 'curveStep', 'curveStepAfter', 'curveStepBefore'];

  
        
        var i = 0;
        var inter = setInterval(function(){
           
            if(i >= curves.length){
                console.log(3)
                clearInterval(inter);
            }
            // 获取转化后的曲线数据
            var lineData = lineGenerator.curve(d3[curves[i]])(data);
           
            // 更换标题
            var text = curve_type.selectAll('.curvetype').remove();
                curve_type.append("text").attr("class","curvetype").text(curves[i])
               
            // 先删除曲线，然后再添加曲线
            g.selectAll('path.curve').remove();
            g.append('path')
                    .classed('curve', true)
                    .attr('stroke', colors[i%12])
                    .attr('stroke-width', '2')
                    .attr('fill', 'none')
                    .attr('d', lineData);
            i++;

        },2000)



``` 