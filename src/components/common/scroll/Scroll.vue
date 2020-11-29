<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "Scroll",
  data(){
    return{
      bs:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init() {
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      this.bs.on('scroll', ({ x,y }) => {
        this.$emit("scroll",y)
      })
      this.bs.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    finishPullUp(){
      this.bs.finishPullUp();
    }
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;
}
</style>
