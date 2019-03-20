import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService';
import userService from './services/userService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    postsFiltered(state, posts) {
      state.posts = posts
    }
  },

  getters: {
    postsFiltered(state) {
      return state.posts
    }
  },
  actions: {
    loadUser(context) {
      return userService.get
    },
    async loadPosts(context, payload){
     let posts = await PostService.query()
      context.commit('postsFiltered', posts)
    }
  }
})
