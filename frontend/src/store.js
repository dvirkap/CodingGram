import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService';
import userService from './services/UserService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    setPosts(state, payload) {
      console.log('set posts (payload)', payload)
      state.posts = payload.posts;
    }
  },
  actions: {
    getPosts(context) {
      return PostService.query()
        .then(posts => {
          context.commit({type: 'setPosts', posts})
          console.log('load posts (store', posts)
        })
    },
    
  }
})
