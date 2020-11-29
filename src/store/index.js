import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      for (let item of state.cartList) {
        if(item.iid==payload.iid){
          item.count++;
          return ;
        }
      }
      payload.count=1;
      state.cartList.push(payload)
    }
  },
  actions:{

  },
  getters:{

  }
})

export default store;
