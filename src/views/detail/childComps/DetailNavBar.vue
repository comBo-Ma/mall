<template>
  <NavBar>
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" class="title-item" :class="{active:index==(currentIndex=clickIndex)}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {NavBar},
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  props:{
    clickIndex:{
      type:Number,
      default:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('titleClick',index)
    },
    back(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.back{
  position: relative;
  top: 5px;
}
.active{
  color: var(--color-high-text);
}
</style>
