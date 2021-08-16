<template>
  <div class="goods-list">
    <goods-list-item
            v-for="item in goods"
            :goods-item="item" class="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    /*flex-wrap: wrap; 包裹->根据它的宽度到底显示多少个*/
    padding: 5px;
    justify-content: space-around;
  /* justify-content: space-around; 均等分*/
  }

  .goods-list .item {
    width: 48%;
  }
</style>
