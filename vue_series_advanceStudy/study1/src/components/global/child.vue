<template>
  <div class="hello">
    <div>
        我是child组件
    </div>

  </div>
</template>

<script>
export default {
  name: 'child',
 
  props: {
    msg: String
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello div {
    width: 200px;
    height: 100px;
    background: green;
}
</style>
