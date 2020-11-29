<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="SwiperImgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isLoad:false
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    SwiperImgLoad(){
      if(!this.isLoad){
        this.$emit('SwiperImgLoad')
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>
