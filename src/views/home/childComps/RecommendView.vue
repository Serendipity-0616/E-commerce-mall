<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
<!--  <div class="recommend">-->
<!--    <div class="recommend-item" v-for="item in recommends">-->
<!--      <a :href="item.link">-->
<!--        <img :src="item.image" alt="">-->
<!--        <span>{{item.title}}</span>-->
<!--      </a>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        // required: true
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    /*text-align: center;*/
    margin-top: 10px;
    font-size: 15px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
    /*让它们均等分*/
    text-align: center;
  }
  .recommend img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  /*.recommend {*/
  /*  display: flex;*/
  /*  margin-top: 10px;*/
  /*  font-size: 14px;*/
  /*  padding-bottom: 30px;*/
  /*  border-bottom: 10px solid #eee;*/
  /*}*/

  /*.recommend-item {*/
  /*  flex: 1;*/
  /*  text-align: center;*/
  /*}*/

  /*.recommend img {*/
  /*  width: 80px;*/
  /*  height: 80px;*/
  /*  margin-bottom: 10px;*/
  /*}*/
</style>
