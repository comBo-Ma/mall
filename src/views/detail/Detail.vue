<template>
<div id="detail">
  <DetailNavBar @titleClick="titleClick" ref="nav" :clickIndex="currentIndex"></DetailNavBar>
  <Scroll :probe-type="3" :pullUpLoad="true" class="content" @scroll="contentScroll" ref="scroll">
    <DetailSwiper :topImages="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
    <DetailShopInfo :shop="shop"></DetailShopInfo>
    <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
    <DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
    <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
    <GoodsList ref="recommend" :goods="goodsList"></GoodsList>
  </Scroll>
  <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
  <BackTop v-show="isShowBackTop" @click.native="backClick"></BackTop>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,getRecommend} from "../../network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {Shop,Goods,GoodsParam} from "../../network/detail";
import BackTop from "../../components/content/backTop/BackTop";
import Scroll from "../../components/common/scroll/Scroll";

import {imgItemLoadListener} from "../../common/mixins";

export default {
  name: "Detail",
  components:{
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailBaseInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data(){
    return{
      iid:null,
      res:null,
      topImages:[],
      goods:{},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      goodsList:[],
      isShowBackTop:false,
      themeTopYs:[],
      currentIndex:0
    }
  },
  created() {
    this.iid=this.$route.query.iid
    getDetail(this.iid).then((res)=>{
      this.topImages=res.data.result.itemInfo.topImages;
      //获取商品信息
      this.goods=new Goods(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo)
      //获取店铺信息
      this.shop=new Shop(res.data.result.shopInfo)
      //获取商品详细信息
      this.detailInfo=res.data.result.detailInfo;
      //获取商品参数信息
      this.paramInfo=new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule)
      //获取评论信息
      if(res.data.result.rate.cRate>0){
        this.commentInfo=res.data.result.rate.list[0]
      }
    })
    //推荐数据的请求
    getRecommend().then((res)=>{
      this.res=res;
      this.goodsList=res.data.data.list
    })
  },
  methods:{
    contentScroll(y){
      //判断backTop是否显示
      this.isShowBackTop=-y>500?true:false;
      if(-y>=this.themeTopYs[0]&&-y<this.themeTopYs[1]){
        this.currentIndex=0
      }else if(-y>=this.themeTopYs[1]&&-y<this.themeTopYs[2]){
        this.currentIndex=1
      }else if(-y>=this.themeTopYs[2]&&-y<this.themeTopYs[3]){
        this.currentIndex=2
      }else if(-y>=this.themeTopYs[3]) {
        this.currentIndex=3
      }else{
        this.currentIndex=0
      }
    },
    backClick(){
      this.$refs.scroll.bs.scrollTo(0,0,500)
    },
    imageLoad(){
      this.$refs.scroll.bs.refresh();
      this.$nextTick(()=>{
        this.themeTopYs=[];
        this.themeTopYs[0]=0;
        this.themeTopYs[1]=this.$refs.param.$el.offsetTop;
        this.themeTopYs[2]=this.$refs.comment.$el.offsetTop;
        this.themeTopYs[3]=this.$refs.recommend.$el.offsetTop;
      })
    },
    titleClick(index){
      this.$refs.scroll.bs.scrollTo(0,-this.themeTopYs[index],200)
    },
    addToCart(){
      //获取购物车需要展示的信息商品信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid

      //将商品添加到购物车
      this.$store.commit('addCart',product)
    }
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.imgItemLoadListener)
  },
  mixins: [imgItemLoadListener]
}
</script>

<style scoped>
#detail{
  position: relative;
  height: 100vh;
  z-index: 1;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
