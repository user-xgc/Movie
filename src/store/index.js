import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录用户手机号
    phone:'',

    //登录用户信息
    msg:{
      cityHistory: [],
      looked: [],
      order: [],
      password: "",
      phone: "",
      searchHistory: [],
      username: "",
      want: []
    },

    //登录状态
    isLogin:false,

    //想看的电影
    // wantMovies:'',
  },
  getters: {
  },
  mutations: {
    changePhone(state, payload) {
      console.log('触发changePhone的mutations');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.phone = payload;
    },

    changeLogin(state, payload) {
      console.log('触发changeLogin的mutations');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.isLogin = payload;
    },
    changeMsg(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.msg = payload;
    },
    //修改msg中的搜索历史
    changeMsgHistory(state, payload) {
      console.log('触发changeMsgHistory的mutations');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.msg.searchHistory = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
