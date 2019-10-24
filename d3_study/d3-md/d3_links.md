# d3 links 
> link 用来生成从一个源点到目标点的光滑的三次贝塞尔曲线。曲线在起点和终点的切线要么是 vertical，要么是 horizontal，要么是 radial的。
## api
- d3.linkVertical()
    > 返回一个新的 link 生成器，生成的曲线在曲线的终点和起点处的切线是垂直方向的
- d3.linkHorizontal()
    > 返回一个新的 link 生成器，生成的曲线在曲线的终点和起点处的切线是水平方向的
- link(arguments)
- link.source([source])
    > 如果指定了 source 则将 source 访问器设置为指定的函数并返回当前 link 生成器
- link.target([target])
    > 如果指定了 target 则将 target 访问器设置为指定的函数并返回当前 link 生成器
- link.x([x])
    > 如果指定了 x 则将 x 访问器设置为指定的函数或数值，并返回当前 link 生成器
- link.y([y]) 
    > 如果指定了 y 则将 y 访问器设置为指定的函数或数值，并返回当前 link 生成器
- link.context([context])
     > 如果指定了 context，则设置上下文并返回当前 link 生成器。如果没有指定 context 则返回当前的上下文，默认为 null
- d3.linkRadial()
    > 返回一个新的径向 link 生成器
- linkRadial.angle([angle])
    > 等价于 link.x, 只不过访问器返回的是弧度值，其中 0 度为 12 点钟方向。
- linkRadial.radius([radius])
    > 等价于 link.y, 只不过访问器返回的是半径: 到 ⟨0,0⟩ 的距离
## 实例 
- html代码
```html
    <div id="container"></div>
``` 
- js代码
```javascript
     // 此实例结合了hierarchy布局和tree()布局
     //  svg画布的宽高
        var width = 600,
            height = 400,
            margin = {left:15,top:20,right:15,bottom:15}
            data = {
            "name": "老祖宗",
            "children": [
            {
            "name": "analytics",
            "children": [
                {
                "name": "cluster",
                "children": [
                {"name": "AgglomerativeCluster", "value": 3938},
                {"name": "CommunityStructure", "value": 3812},
                
                ]
                },
                {
                "name": "graph",
                "children": [
                {"name": "ShortestPaths", "value": 5914},
                {"name": "SpanningTree", "value": 3416}
                ]
                },
                {
                "name": "optimization",
                "children": [
                {"name": "AspectRatioBanker", "value": 7074}
                ]
                }
            ]
            },
            {
            "name": "animate",
            "children": [
                {"name": "Easing", "value": 17010},
                {"name": "TransitionEvent", "value": 1116},
                {"name": "Tween", "value": 6006}
            ]
            },
            {
            "name": "data",
            "children": [
                {
                "name": "converters",
                "children": [
                {"name": "Converters", "value": 721},
                {"name": "JSONConverter", "value": 2220}
                ]
                },
                {"name": "DataField", "value": 1759},
            
            ]
            },
            
            ]
            };
        
        var chart_width = width - margin.left - margin.right;
        var chart_height = height - margin.top - margin.bottom;    

       
       
       
       // d3.hierarchy() 根据指定的层次结构数据构造一个根节点
       var tree = (data)=>{
        const root1 = d3.hierarchy(data);
        //console.log(root,"......hierarchy..........");
        root1.dx = 30;
        root1.dy = width / (root1.height + 1);
        // 创建一个数布局，并设置系统树布局的节点尺寸为指定的数值二元数组，然后对指定的 root hierarchy 进行布局，并为 root 以及它的每一个后代附加两个属性node.x和node.y
        
        return d3.tree().nodeSize([root1.dx, root1.dy])(root1);
       }


        const root = tree(data);
        console.log(root,"...............root,...........")

        let x0 = Infinity; // 最小值
        let x1 = -x0; // 最大值
        //node.each(function) 以 breadth-first order(广度优先) 的次序为每个 node 调用执行的 function, 一个给定的节点只有在比其深度更小或者在此节点之前的相同深度的节点都被访问过之后才会被访问。指定的函数会将当前 node 作为参数。
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
            console.log(x0,"...x0............",d)
        });
        
        // 创建svg画布
         const svg = d3.select("#container").append("svg")
            // .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2])
            .attr("width",width).attr("height",height);
        // 创建图表显示区域
        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 14)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)
            .attr("width",chart_width).attr("height",chart_height)
            //.attr("transform",`translate(${margin.left},${margin.top})`);
            

     
        const link = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.9)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links()) //当前 node 的 links 数组, 其中每个 link 是一个定义了 source 和 target 属性的对象
        .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));
        // console.log(root.links(),"......root.links()...........")
        // console.log(root.descendants(),"......root.descendants()...........")
       
       
        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants()) //返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
        .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", d => d.children ? "red" : "#999")
            .attr("r", 6);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
        // .clone(true).lower()
        //     .attr("stroke", "white");
``` 