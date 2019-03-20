import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, payload) {
      console.log('set posts (payload)', payload)
      state.posts = payload.posts;
    }
  },
    
  getters: {
    postsFiltered(state) {
      return state.posts
    }
  },
  actions: {
    
    async loadPosts(context, payload){
     let posts = await PostService.query()
      context.commit('postsFiltered', posts)
    },
    postsFiltered(state, posts) {
      state.posts = posts
    }
    // getPosts(context) {
      //   return PostService.query()
      //     .then(posts => {
      //       context.commit({type: 'setPosts', posts})
      //       console.log('load posts (store', posts)
      //     })
      // },
  },

  
})
