
<script>
export default {
  name: 'HelloWorld',
  props: {
    type: {
        type:String,
        default:"normal"
    },
    text:{
        type:String,
        default:"demo"
    }
  },
  methods:{
      ClickMethod(){
          this.$emit("myClick")
      }
  },
  // 其本质就是生成template模板，原理：内部通过调用一个方法，此方法时通过render方法的参数传递进去的，此处记作h方法，
  // h 方法可以传递三个 参数，第一个参数为标签名，第二个为标签的属性，第三个方法为标签的html内容，
  // render 方法vue2.x及以上支持，可以使用jsx语法，使用babel plugin支持即可
  render(h){
    // h 函数， 创建元素标签，标签名为div,
    return h("div",{
        //相当于v-bind:class
        class:{
            btn:true,
            "btn-success":this.type === "success",
            "btn-waring":this.type === "waring",
            "btn-error":this.type === "error",
            "normal":this.type === "normal",
        },
        // dom 属性
        domProps:{
            innerText:this.text,

        },
        on:{
            click:this.ClickMethod
        }
    
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff
}
.btn-success{
    background: green;
}
.btn-waring{
    background: orange;
}
.btn-error{
    background: red;
}
.normal {
    background: pink
}
</style>
