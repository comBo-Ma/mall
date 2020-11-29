<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-controller v-show="isTabControlFixed" ref="tabControl1"  :titles="['流行','新款','精品']" class="tab-controller" @tabClick="tabClick"></tab-controller>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadUp">
      <home-swiper :banners="banners" @SwiperImgLoad="SwiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <Feature></Feature>
      <tab-controller v-show="!isTabControlFixed" ref="tabControl2" :titles="['流行','新款','精品']" @tabClick="tabClick"></tab-controller>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>
    <MainTabBar></MainTabBar>
    <BackTop @click.native="backClick" v-show="isBackTopShow"></BackTop>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";
import TabController from "components/content/tabController/TabController";
import {getHomeMultidata,getHomeGoods} from "network/home";
import GoodIsListItem from "../../components/content/goods/GoodsListItem";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";
import Scroll from "../../components/common/scroll/Scroll";
import MainTabBar from "components/content/mainRabBar/MainTabBar";
import {imgItemLoadListener} from "../../common/mixins";


export default {
  name: "Home",
  components: {
    Scroll,
    GoodsList,
    GoodIsListItem,
    TabController,
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    BackTop,
    MainTabBar
  },
  data(){
    return {
      result: null,
      banners:[],
      recommends: [],
      goods: {
        'pop':{page:1,list:[]},
        'new':{page:1,list:[]},
        'sell':{page:1,list:[]}
      },
      currentType:'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabControlFixed: false,
      saveY:0
    }
  },
  created(){
    console.log('created')
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
  },
  destroyed() {
    console.log('destroyed');
  },
  activated() {
    this.$refs.scroll.bs.scrollTo(0,this.saveY,0);
    this.$refs.scroll.bs.refresh();
  },
  deactivated() {
    //在离开Home页面的时候，保存此时的Y位置
    this.saveY=this.$refs.scroll.bs.y;
    //离开时取消对图片的加载监听
    this.$bus.$off('itemImgLoad',this.imgItemLoadListener)
  },
  methods:{
    tabClick(index){
      switch (index){
        case 0:
          this.currentType='pop'
          break;
        case 1:
          this.currentType='new'
          break;
        case 2:
          this.currentType='sell'
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.result=res;
        this.banners=res.data.data.banner.list;
        this.recommends=res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page;
      getHomeGoods(type,page).then(res=>{
        const newList=res.data.data.list;
        this.goods[type].list.push(...newList);
        this.goods[type].page+=1;
        this.$refs.scroll.bs.finishPullUp();
      })
    },
    backClick(){
      this.$refs.scroll.bs.scrollTo(0,0,500)
    },
    contentScroll(y){
      //设置BackTop的显示位置
      this.isBackTopShow=-y>500?true:false;
      //设置分类的固定
      this.isTabControlFixed=-y>=this.tabOffsetTop?true:false;
    },
    loadUp(){
      this.getHomeGoods(this.currentType)
    },
    SwiperImgLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    }
  },
  mixins:[imgItemLoadListener]
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-controller{
    position: relative;
    width: 100%;
  }
</style>
