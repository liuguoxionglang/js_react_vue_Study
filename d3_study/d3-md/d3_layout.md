- 布局
>  布局的作用是：将不适合用于绘图的数据转换成了适合用于绘图的数据。数据转换的函数
>  D3 总共提供了 12 个布局：饼状图（Pie）、力导向图（Force）、弦图（Chord）、树状图（Tree）、集群图（Cluster）、捆图（Bundle）、打包图（Pack）、直方图（Histogram）、分区图（Partition）、堆栈图（Stack）、矩阵树图（Treemap）、层级图（Hierarchy）。
> 12 个布局中，层级图（Hierarchy）不能直接使用。集群图、打包图、分区图、树状图、矩阵树图是由层级图扩展来的。如此一来，能够使用的布局是 11 个（有 5 个是由层级图扩展而来）。这些布局的作用都是将某种数据转换成另一种数据，而转换后的数据是利于可视化的。
 - 布局     
    - 饼图（Pie)
        > 主要用来显示离散型数据的占比或者大小比较
    - 力导向图（Force）：绘图的一种算法。用来表示节点之间的多对多的关系
        > 力布局使用位置Verlet整合算法实现，适合网络型、社交型图数据的可视化展示。  
    - 弦图（Chord）
        > 弦图用来展示一组实体之间的关系，通过在不同的弧线之间画出二次贝塞尔曲线，将实体之间的关系表示在一张弦图中。下面展示了一个弦图，表示五个城市人口互相之间的来源关系，比如北京有2015人来自上海，上海有2060人来自广州
    - 树状图（Tree）：可表示节点之间的包含与被包含关系
        > 树布局能够用莱茵戈尔德-蒂尔福德算法产生一个整洁的树状节点-连接图，下面使用了一个国家名，省份名与市名的从属关系树状图展示效果 
    - 捆图（Bundle）
        > 捆绑布局根据结点数据输入确定结点的父子关系，再根据边数据输入确定结点之间的边怎么画，当从一个结点映射出去的连接比较多时看上去像是形成一捆绳，所以叫捆图。适合展示如demo所示各大城市之间高铁连接关系这样的情况 
    - 打包图（Pack）
        > 包图采用包含（嵌套）来表现层级结构，能清晰地展现分层效果，但是有浪费空间的缺点 
    - 直方图（Histogram）
        > 直方图布局可以用来表示数据分布，通过将离散数据点分组归纳到矩形条例绘制。 
    - 分区图（Partition）
        > 分区布局将会产生邻接的图形：一个节点-连接的树状填充体。结点将被绘制成实心面积图（弧或者矩形），每个节点相对于其他节点的位置显示出了层级结构。 
    - 堆栈图（Stack）
        > 堆叠布局需要一个二维的数据数组，并计算基准线。堆叠图可以被水平、垂直叠放，或者径向叠放。 
    - 地图 geojson
        > 对于地图的可视化，D3有一些显示和操作地理数据的组件。这些组件使用GeoJSON格式的数据，这是javascript中表示地理特征的标准方法。
    - 矩阵树图（Treemap）
    - 层级图（Hierarchy）
    - 集群图（Cluster）
     
- 生成器
    - 弧生成器：d3.arc()
    - 对角线生成器 :d3.diagonal()---->只需要输入两个顶点坐标，即可生成一条贝塞尔曲线。
    - 地理路径生成器:d3.geo.path()
     

- 常用函数
    - d3.max d3.min