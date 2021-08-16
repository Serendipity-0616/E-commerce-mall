<template>
  <div class="nav-bar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow:0 1px 1px rgba(100,100,100,.1);
    z-index: 99;
    background-color: #fff;
    /*  box-shadow属性可以设置一个或多个下拉阴影的框*/
    /*box-shadow:水平方向 垂直方向 模糊度 阴影的距离 颜色*/
  }
  .left{
    width: 60px;
  }
  .center{
    flex: 1;
  }
  .right{
    width: 60px;
  }
</style>
