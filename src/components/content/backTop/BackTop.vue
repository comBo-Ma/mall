<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
name: "BackTop"
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 1000;
  }
  .back-top img{
    width: 50px;
  }
</style>
