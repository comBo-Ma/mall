<template>
  <div class="tab-controller">
    <div v-for="(item,index) in titles" class="tab-controller-item"
         :class="{active:currentIndex==index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabController",
  data(){
    return{
      currentIndex: 0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    },
  }
}
</script>

<style scoped>
  .tab-controller{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }
  .tab-controller-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .tab-controller-item.active span{
    border-bottom: 2px solid var(--color-high-text);
    padding-bottom: 5px;
  }
</style>
