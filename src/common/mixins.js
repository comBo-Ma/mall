export const imgItemLoadListener={
  data(){
    return{
      imgItemLoadListener:null
    }
  },
  mounted(){
    //图片加载完之后的事件监听
    this.imgItemLoadListener=()=>{
      this.$refs.scroll.bs.refresh()
    };
    this.$bus.$on('itemImgLoad',this.imgItemLoadListener)
  }
}

