import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService';
import userService from './services/userService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    loadUser(context) {
      return userService.get
    }
  }
})
