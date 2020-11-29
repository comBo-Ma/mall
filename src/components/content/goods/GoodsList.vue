<template>
  <div class="goods-list">
    <GoodsListItem class="item" v-for="item in goods" :goodsItem="item"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {GoodsListItem},
  props:{
    goods:{
      type: Array,
      default(){
        return null
      }
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}

.goods-list .item {
  width: 48%;
}
</style>
