/**
 * 
 */

(function(window,undefined){

    var last_data = []; //保存更新前的数据;
    var sort_field, // 排序字段
     item_identify, // 每一条数据的唯一识别码
     labelName_field;// 标签名称字段
    //定义柱状图排名函数
    var BarSort = function(data,containerId,options){
        last_data = data;
         //svg 大小 以及柱状图表容器外边距默认配置
         var defaultOptions = {
            svg_height:1000,
            svg_width:1000,
            chart_margin : {left:60,top:30,right:30,bottom:30},
            sort_field:"value",
            item_identify:"name"
        },
        options = options || defaultOptions;
        sort_field = options.sort_field; 
        item_identify = options.item_identify;
        labelName_field = options.labelName_field;

        if(!Array.isArray(data)){
            return new Error("data is not array");
        };
        if(!containerId || !/^#[\w]+$/.test(containerId)){
            return new Error("container id is illegal");
        };
        initData = data;
        initContainerID = containerId;
        initOptions = options;

      
        // 图表容器的宽和高
        chart_width = options.svg_width - options.chart_margin.left - options.chart_margin.right,
        chart_height = options.svg_height - options.chart_margin.top - options.chart_margin.bottom;
        svg_height = options.svg_height;
        svg_width = options.svg_width;
        //创建svg画布
        var svg = d3.select(containerId)
        .append("svg")
        .attr("width",svg_width) 
        .attr("height",svg_height);

        console.log(chart_width,chart_height,"////////chart_width,chart_height//////////");
        // 创建chart 容器
        var chart = svg.append("g")
            .attr("transform",`translate(${options.chart_margin.left},${options.chart_margin.top})`)
            .attr("width",chart_width )
            .attr("height",chart_height);

        // 定义x轴缩放比例尺
        var scale_x = d3.scaleLinear()
                .domain([0,d3.max(data.map(item=>item[sort_field]))])
                .range([0,chart_width]);
        //console.log(scale_x(900),"...........scale_x...........");
        // 定义y轴缩放比例尺 
        var scale_y = d3.scaleBand()
                .domain(data.map(item=>item[labelName_field]).reverse())
                .range([chart_height,0])
                .paddingInner(0.1)
                .paddingOuter(0.3);
       // console.log(scale_y("China"),"...........scale_y...........");               
        // 创建x轴
        var axis_x = d3.axisTop();
        axis_x.scale(scale_x);
       
        // 创建y轴
        var axis_y = d3.axisLeft();
        axis_y.scale(scale_y);

        // 创建 bar元素
        var bar = chart.selectAll(".bar")
        .data(initData,function(d){ return d[item_identify]})
        .enter();

       
        BarSort.prototype.chart_width  = chart_width 
        BarSort.prototype.chart_height  = chart_height 
        BarSort.prototype.svg_height  = svg_height 
        BarSort.prototype.svg_width = svg_width 
        BarSort.prototype.chart_margin = options.chart_margin 
        BarSort.prototype.svg =svg;
        BarSort.prototype.chart = chart;
        BarSort.prototype.scale_x = scale_x;
        BarSort.prototype.scale_y = scale_y;
        BarSort.prototype.axis_x = axis_x;
        BarSort.prototype.axis_y = axis_y;
        BarSort.prototype.bar = bar;
    }
   
    BarSort.prototype.init = function(){

        var that = this;
        //console.log(this,"/////////..............")

        // 添加x轴坐标
        that.chart.append("g").attr("class","axis_x").call(that.axis_x);
        
        // 创建 bar元素
       var g =  that.bar.append("g")
        .attr("class","bar")
        .attr("transform",function(d,i){return `translate(0,${that.scale_y(d[labelName_field])})` })

        // 添加柱子矩形
        g.append("rect")
        .attr("height",that.scale_y.bandwidth())
        .attr("fill-opacity", 1)
        .attr("width", function (d) {return that.scale_x(0);})
        .style("fill",function(d){ return d.color})
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr("width",function(d){return that.scale_x(d[sort_field])})
        .attr("fill-opacity", 1)

        // 添加柱子数字标签
        g.append('text')
        .text(d => d3.format(',.0f')(d[sort_field]))
        .attr("x",function(d){return that.scale_x(d[sort_field])})
        .attr("y",that.scale_y.bandwidth()/2)
        .attr("text-anchor","start")
        .attr("class","label")
        .attr("dx",10)

        // 添加y轴 种类名称
        g.append('text')
        .text(function(d){return d[labelName_field]})
        .attr("x",-this.chart_margin.left/2)
        .attr("y",that.scale_y.bandwidth()/2)
        .attr("text-anchor","middle")
        .attr("class","catogroy_y");

        this.last_data = JSON.parse(JSON.stringify(last_data))

    };

    BarSort.prototype.redraw = function(newData) {
        var that = this;
        console.log(that,"...........//////////...........")
        // x轴缩放比例尺定义域值域重新赋值
        that.scale_x
        .domain([0,d3.max(newData.map(item=>item[sort_field]))])
        .range([0,that.chart_width]);

        //x轴应用缩放比例尺
        that.axis_x.scale(that.scale_x);
        that.chart.selectAll(".axis_x").call(that.axis_x);

        // y 轴比例尺作用域与值域重置
        that.scale_y.domain(newData.map(item=>item[labelName_field]).reverse())
                .range([that.chart_height,0]);



          // 柱状图重新绑定新数据        
        var bar = that.chart.selectAll('.bar').data(newData,function(d){return d[item_identify]})

        // 无元素 有数据的的添加一个元素        
        var insert = bar.enter()
                .append("g")
                .attr("class", "bar")
                .attr("transform", function (d,i) {
                    console.log(d,"MMMMMMMMMMMMMMM......................")
                    return "translate(0," + that.svg_height + ")";
                });
    
            insert
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("transform", function (d,i) {
                console.log(d,"MMMMMMMMMMMMMMM......................")
                return "translate(0," + that.scale_y(d[labelName_field]) + ")";
            })
        
            // 更新原来元素    
            bar.transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .remove(); 

            // 有元素 无数据的删除    
            bar.exit()
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .remove();    

            // 更新原有元素上的矩形
            var barUpdate = bar
                            .transition("2")
                            .duration(2990 * 1)
                            .ease(d3.easeLinear);   
            // rect元素应用过渡       
            barUpdate
                .selectAll("rect")
                .style("fill",(d,i) => d.color)
                .attr("width", d => {
                    console.log(`${d.date}------${d[labelName_field]}------${d[sort_field]}`);
                    return that.scale_x(d[sort_field])
                });

             // 更新原有元素上的数字标签
             barUpdate.selectAll(".label")
             .text(function(d){return d[sort_field]})
             .attr("x",function(d){return that.scale_x(d[sort_field])})
             .attr("y",that.scale_y.bandwidth()/2)
             .attr("text-anchor","start")
             .attr("dx",10)

             barUpdate.selectAll('.text')
                .text(function(d){return d[labelName_field]})
                .attr("x",-this.chart_margin.left/2)
                .attr("y",that.scale_y.bandwidth()/2)
                .attr("text-anchor","middle")
                .attr("class","catogroy_y")  



            // 添加柱子矩形
            insert.append("rect")
                .attr("height",that.scale_y.bandwidth())
                .attr("fill-opacity", 1)
                .attr("width", function (d) {return that.scale_x(newData[newData.length - 1][sort_field]);})
                .style("fill",function(d){ return d.color})
                .transition()
                .duration(1500)
                .ease(d3.easeLinear)
                .attr("width",function(d){return that.scale_x(d[sort_field])})
                .attr("fill-opacity", 1)
               
                // 添加柱子数字标签
                insert.append('text')
                .text(function(d){return d[sort_field]})
                .attr("x",function(d){return that.scale_x(d[sort_field])})
                .attr("y",that.scale_y.bandwidth()/2)
                .attr("text-anchor","start")
                .attr("class","label")
                .attr("dx",10)

            // 添加y轴 种类名称
            insert.append('text')
                .text(function(d){return d[labelName_field]})
                .attr("x",-this.chart_margin.left/2)
                .attr("y",that.scale_y.bandwidth()/2)
                .attr("text-anchor","middle")
                .attr("class","catogroy_y")    

          

            

            // 重置柱状图标签    
            //bar.select(".label").text(d => d3.format(',.0f')(d[sort_field]))
            bar.select(".label")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .tween("text", function(d,j) {
                    console.log( that.last_data,".....................last....data")
                    var lastdata = that.last_data.filter(item=>item[item_identify] === d[item_identify]);
                    var initval  = ((lastdata[0] ||{})[sort_field]) || 0;
                    console.log(initval,"..initval...................")
                    var i = d3.interpolateRound(initval, d[sort_field]);
                    if(j === last_data.length-1){ // 保存当前数据，下次更新后使用
                        console.log(j,"jjjjjjjjjjjjjjjjjjjjjjjj");
                        that.last_data = JSON.parse(JSON.stringify(newData))
                    }
                    return function(t) {
                        this.textContent = d3.format(',')(i(t));
                    };
                });
        
            // y轴类目标签
            bar.select(".catogroy_y").text(function(d){return d[labelName_field]}) ;


            // 柱子上下移动   
            that.chart.selectAll(".bar").data(newData,function(d){return d[item_identify]})
                .transition()
                .duration(1000)
                .attr("transform", function (d) {
                    console.log(d.date,"....................date")
                    console.log(this.getAttribute("transform"),"..................transform",d[labelName_field],that.scale_y(d[labelName_field]));
                    return `translate(0,${that.scale_y(d[labelName_field])})`
                }); 

            
            
        


       
    }


    // 支持模块化导出; 此处按照jquery源码中的方式
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        // Expose jQuery as module.exports in loaders that implement the Node
        // module pattern (including browserify). Do not create the global, since
        // the user will be storing it themselves locally, and globals are frowned
        // upon in the Node module world.
        module.exports = BarSort;
    } else {
        // Register as a named AMD module, since jQuery can be concatenated with other
        // files that may use define, but not via a proper concatenation script that
        // understands anonymous AMD modules. A named AMD is safest and most robust
        // way to register. Lowercase jquery is used because AMD module names are
        // derived from file names, and jQuery is normally delivered in a lowercase
        // file name. Do this after creating the global so that if an AMD module wants
        // to call noConflict to hide this version of jQuery, it will work.
        if ( typeof define === "function" && define.amd ) {
            define( "barsort", [], function () { return BarSort; } );
        }
    }

    
    
    //抛出BarSort函数
    if ( typeof window === "object" && typeof window.document === "object" ) {
        window.BarSort = window.$BarSort = BarSort;
    }

})(window)