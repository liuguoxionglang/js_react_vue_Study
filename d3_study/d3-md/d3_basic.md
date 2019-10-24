# d3.v5 常用api简介
- 选择集
  - 选择
    - d3.selection():选择器根元素: document.documentElement. 整个方法可以用来测试是否为选择集实例 (instanceof d3.selection) 也可以用来扩展选择集原型链，比如为 checkbox 添加一个 check 方法:
    ```javascript
        d3.selection.prototype.checked = function(value) {
            return arguments.length < 1
                ? this.property("checked")
                : this.property("checked", !!value);
        };
        /*然后使用:*/
        d3.selectAll("input[type=checkbox]").checked(true);
    ``` 
    - select:
        - d3.select(selector):从文档中选择符合条件的第一个元素，selector除是字符串之外还可以是指定的节点，
        - selection.select(selector):从被选中的元素中选择其符合条件的第一个后代元素，若selector 为函数，则会在选择前执行对应的函数，并且会传递当前元素的关联数据 (d)，当前的索引 (i) 以及当前分组 (nodes)，
    - selectAll
        - d3.selectAll(selector):从文档中选择符合条件的所有元素，selector 除字符串之外还可以是节点数组。
        - selection.selectAll(selector): 从被选中的元素中选择其符合条件的所有后代元素，如果 selector 是一个函数，则在进一步选择前会先执行，并依次传递当前的数据 d，当前的索引 (i) 以及当前的分组 (nodes),
    - selection.filter(filter) :过滤选择集并返回一个新的过滤后的选择集,filter 可以是一个选择字符串也可以是一个函数。
    - selection.merge(other):返回一个将当前选择集和指定的 other 选择集合并之后的新的选择集 
        ```javascript
            /*UPDATE*/
            var circle = svg.selectAll("circle").data(data) 
                .style("fill", "blue");

             /*EXIT*/
            circle.exit().remove(); 

            
            circle = circle.enter().append("circle") 
                .style("fill", "green")
            .merge(circle) /*ENTER + UPDATE*/  
                .style("stroke", "black");
        ``` 
  - 插入
    - append()：如果指定的 type 为字符串则创建一个以此字符串为标签名的元素，并将其追加到选择集元素列表中
    - selection.insert(type[, before])：如果 type 为字符串则为选择集中每个选中的插入一个指定类型(标签名)的元素，插入的位置为第一个匹配 before 选择条件的元素,type 和 before 都可以使用函数代替，
  - 删除
    - selection.remove():从当前文档中移除选中的元素。返回的选择集(被移除的元素)已经与文档脱离。
- 绑定数据：u 
    - selection.data([data[, key]])
        > 将指定数组的数据 data 与已经选中的元素进行绑定并返回一个新的选择集，data 会被指定给选择集中的 each group(每个分组)。如果选择集中包含多个分组(比如 d3.selectAll 后跟随 selection.selectAll)，则 data 应该应该被指定为一个函数, 数据与选择集的“匹配”逻辑是由 key 函数决定并传递给 selection.data 的; 如果没有指定 key 函数则元素和数据会按照索引绑定；此部分通常用于更新数据

        ```javascript
            var matrix = [
            [11975,  5871, 8916, 2868],
            [ 1951, 10048, 2060, 6171],
            [ 8010, 16145, 8090, 8045],
            [ 1013,   990,  940, 6907]
            ];

            var tr = d3.select("body")
            .append("table")
            .selectAll("tr")
            .data(matrix)
            .enter().append("tr");

            var td = tr.selectAll("td")
            .data(function(d) { return d; })
            .enter().append("td")
                .text(function(d) { return d; });
        ```
    - selection.enter()
        > 返回 enter 选择集: 没有对应 DOM 节点的数据的占位节点. (对于不是通过 selection.data 返回的选择集 enter 选择集为空). 此部分通常用于添加元素
    - selection.exit() 
        > 返回 exit 选择集: 没有对应数据的已经存在的 DOM 节点。(对于不是通过 selection.data 返回的选择集 exit 选择集为空).此部分通常用于删除元素
    - selection.datum([value]) 
        > 获取或设置每个选中元素上绑定的数据
- 比例尺：定义域和值域
    - 线性比例尺：
        > 线性比例尺，能将一个连续的区间，映射到另一区间。
        - continuous(value):根据定义域domain中的值，返回对应值域中的值
        - continuous.invert(vlaue)：根据值域中的range的值，返回对应定义域中的值
        - continuous.domain([domain])：定义域，是数值或者能被转化成数值
        - continuous.range([range]):值域，任意值，
        - continuous.rangeRound([range]):设置比例尺的值域为range的同时设置插值器函数为interpolateRound
        - continuous.interpolate(interpolate)  ：设置比例尺插值器
        - continuous.ticks(count)：返回近似的用来表示比例尺 domain 的 count。ticks 经常被用来显示刻度线或者刻度标记。
        - continuous.tickFormat([count[, specifier]]):返回一个调整小时刻度值的 number format 函数。count 应该与通过 tick values 指定的 count 相同。
        - continuous.copy():返回一个当前比例尺的拷贝。返回的拷贝和当前比例尺之间不会相互影响。
        - continuous.nice():扩展 domain 使其为整。
        - continuous.clamp(clamp):如果指定了 clamp 则启用或者关闭比例尺的钳位功能。
        - 几种常用的线性比例尺：
            - d3.scaleLinear() :线性比例尺
            - d3.scalePow()：
            - d3.scaleLog()  ：对数比例尺
            - d3.scaleTime()：事件比例尺   
    - 序数比例尺：
        >  与 continuous scales 不同，序数比例尺的输出域和输入域都是离散的，即定义域和值域不一定是连续的
        -  d3.scaleOrdinal([range])：使用空的输入域和指定的 range 构造一个序数比例尺。如果没有指定 range 则默认为空数组。序数比例尺在定义非空的输入域之前，总是返回 undefined
        -  ordinal(value):根据定义域以及输入的值，输出所对应的值域中的值
        -  ordinal.domain([domain]):定义域，值必须为字符串或者能被强制转为字符串的类型，并且必须唯一
        -  ordinal.range([range]):值域，输入域中的元素与输出域中的元素一一对应
        -  ordinal.unknown():如果指定了 value 则将未知输入的输出值设置为指定的值。如果没有指定 value 则返回当前的未知值，默认为 implicit. 隐式值会对输入域进行隐式调整，
        -  ordinal.copy():返回当前比例尺的精准拷贝。原比例尺和副本之间不会相互影响
        -  d3.scaleImplicit:序数比例尺 ordinal.unknown 的一个特殊的值，支持对输入域的隐式构造：将未知的值到输入域中。
    - 分段比例尺：
        > 分段比例尺与 ordinal scales 类似，只不过其输出域可以是连续的数值类型。离散的输出值是通过将连续的范围划分为均匀的分段。分段比例尺通常用于包含序数或类别维度的条形图。
        - d3.scaleBand() :创建分段比例尺实例
        - band(value):获取定义域对应的值域
        - band.domain([domain])：定义域，输入域中的值必须是字符串或者能被强制转为字符串的值。并且必须唯一。
        - band.range([range])：值域，数组中元素不是数值类型则会被强制转为数值类型。如果没有指定 range 则返回比例尺当前的输出范围，默认为 [0, 1]。
        - band.rangeRound([range]):将比例尺的 range 设置为指定的二元数值数组。并且启用 rounding
        - band.round([round]):如果指定了 round 则表示启用或关闭取整操作，如果开启了取整，则每个分段的起点和终点都是整数。
        - band.paddingInner(padding):padding 则将分段的内部间隔设置为指定的值，值的范围必须在 [0, 1] 之间. 
        - band.paddingOuter(padding): padding 则将分段的外部间隔设置为指定的值，值的范围必须在 [0, 1] 之间. 
        - band.pandding(padding):一个同时设置 inner 和 outer 的便捷方法。如果没有指定 padding 则返回内部间隔。
        - band.align([aling]):align 则设置分段的对其方式，值处于 [0, 1] 之间。
        - band.bandWith():回每一个分段的宽度。
        - band.copy():返回当前比例尺的精准拷贝。原比例尺和副本之间不会相互影响。
        - band.step():返回相邻的两个分段的起点之间的距离
    - 序列比例尺：
      > 序列比例尺，与 diverging scales 和 continuous scales 类似，将连续的数字输入域映射到连续的输出域。但是与连续比例尺不一样的是，它的输出域是根据指定的插值器内置且不可配置，其次它的插值方式也不可配置。不暴露 invert, range, rangeRound 和 interpolate 方法。
      - d3.scaleSequential(interpolator)   
    - 发散比例尺：
        > 发散比例尺，与 sequential scales 和 continuous scales 类似，讲一个连续的数值类型输入映射到连续的输出域。但是与连续比例尺不同的是，发散比例尺的输出是根据插值器计算不可配置。不暴露 invert, range, rangeRound 和 interpolate 方法.
        - d3.scaleDiverging(interpolator) 
    - 量化比例尺：
        > 量化比例尺与 linear scales 类似，但是其输出区间是离散的而不是连续的。连续的输入域根据输出域被分割为均匀的片段。每一个输出域中的值 y 都可以定义为输入域中 x 值的一个线性函数：x: y = m round(x) + b. 
        - d3.scaleQuantize()  
    - 分位数比例尺
        > 分位数比例尺将一个离散的输入域映射到一个离散的输出域。输入域被认为是连续的，因此可以接受任何合理的输入值。但是输入域被指定为一组离散的样本值，输出域中的值的数量决定了分位数的数量。为了计算分位数，输入域中的值会被排序。
        - d3.scaleQuantile() 
    - 阈值比例尺
        > 阈值比例尺与 quantize scales 类似，只不过它们允许将输入域的任意子集映射到输入域的离散值。输入域依旧是连续的，并且会根据输出域分片
        - d3.scaleThreshold() 
    - 标点比例尺：
        > 标点比例尺是 band scales 的分段宽度为 0 时的变体。标点比例尺通常用于对具有序数或分类维度的散点图。unknown value 总是 undefined: 它们不能隐式的构造输入域。
        -  d3.scalePoint()
- 坐标轴
    - 定义坐标轴(添加比例尺)及方法 d3
        - d3.axisTop(scale):根据给定的比例尺，创建一个刻度在上面的水平方向上 的坐标轴， 默认 tick arguments 为空, tick size 为 6， padding 为 3. 坐标轴为水平方向
        - d3.axisRight(scale)：根据给定的比例尺，创建一个刻度在右面的垂直方向上的坐标轴，
        - d3.axisBottom(scale):根据给定的比例尺，创建一个刻度在下面的水平方向上 的坐标轴，
        - d3.axisLeft(scale):根据给定的比例尺，创建一个刻度在左面的垂直方向上的坐标轴
        - axis(context)：将坐标轴渲染到指定的 context, context 可能是一个包含SVG元素的 selection(SVG 或者 G 元素) 也可能是一个 transition.
        - axis.scale([scale])：如果指定了 scale 则设置坐标轴的 scale，如果没有指定 scale 则返回当前坐标轴所使用的比例尺。
        - axis.ticks(arguments…) 
        - axis.ticks([count[, specifier]]) 
        - axis.ticks([interval[, specifier]])
        - axis.tickValues([values]) ：将指定的数组作为刻度而不是自动计算刻度
        - axis.tickFormat([format]) ：设置刻度文字标签格式化方法。
        - axis.tickSize([size]) ：size 设置 内侧 和 外侧 刻度的大小
        - axis.tickSizeInner([size])： size 设置内侧刻度大小，
        - axis.tickSizeOuter([size])： size 设置外侧刻度大小，
        - axis.tickPadding([padding]) ： padding 设置刻度和刻度文本之间的间距
    - 添加坐标轴 call：call() 的参数是一个函数。调用之后，将当前的选择集作为参数传递给此函数
- 动画
    - transition():启动过渡效果。其前后是图形变化前后的状态（形状、位置、颜色等等），例如：
    - duration():指定过渡的持续时间，单位为毫秒。
    - ease():指定过渡的方式，常用的有：
        - linear：普通的线性变化
        - circle：慢慢地到达变换的最终状态
        - elastic：带有弹跳的到达最终状态
        - bounce：在最终状态处弹跳几次
    - delay():指定延迟的时间，表示一定时间后才开始转变，单位同样为毫秒。

- 事件
    - selection.on(typenames[, listener[, capture]]：为每个选中的元素添加或者移除一个指定typenames 事件的 listener;在 D3 中，每一个选择集都有 on() 函数，用于添加事件监听器
    - selection.dispatch(type[, parameters]) 
    - d3.event、d3.customEvent(event, listener[, that[, arguments]]) 、 d3.mouse(container) d3.touch(container[, touches], identifier)、d3.clientPoint(container, event)等
- 控制流
    - selection.each(function) ：
    > 为每个选中的元素依次调用指定的 function，并传递当前元素绑定的数据 d，当前索引 i 以及当前分组 nodes. 函数内部 this 指向当前 DOM 元素(node[i]). 这个方法可以为选中的每个元素调用任意代码，在同一个作用域中同时访问父节点和子节点数据时很有用，比如:
    ```javascript
        parent.each(function(p, j) {
            d3.select(this)
                .selectAll(".child")
                .text(function(d, i) { return "child " + d.name + " of " + p.name; });
        });
    ```  
    - selection.call(function[, arguments…]) 
    > 调用一次指定的 function，并为将当前选择集作为第一个参数，此外还可以使用可选的其他参数。返回选择集，等价于手动调用函数，但是这种方法支持链式调用。例如有一个设置样式的函数:
    ```javascript
        function name(selection, first, last) {
            selection
                .attr("first-name", first)
                .attr("last-name", last);
        }
        /*可以写成如下形式:*/

        d3.selectAll("div").call(name, "John", "Snow");
        /*等价于：*/

        name(d3.selectAll("div"), "John", "Snow");
        /*不同的是 selection.call 总是返回当前选择集，而不是 function 的返回值。*/
    ```  
**参考文献**

[d3.v5 中文官网](https://github.com/xswei/d3js_doc)