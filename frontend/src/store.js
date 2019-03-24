import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService.js';
import CommentsService from './services/CommentsService.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: []
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload.posts;
    },
    postsFiltered(state, posts) {
      state.posts = posts
    },
    createComment(state, payload) {
      const comment = payload.post.comments[payload.post.comments.length - 1];
      
      state.currComment = comment
    },
    deleteComment(state , payload) {
      let comments = [];
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i]._id !== payload.commentId) {
          comments.push(state.comments[i])
        }
      }
    }
  },
    
  getters: {
    postsFiltered(state) {
      return state.posts
    }
  },
  actions: {
    
    // async loadPosts(context, payload){
    //  let posts = await PostService.query()
    //   context.commit('postsFiltered', posts)
    // },

    // getPosts(context) {
    //     return PostService.query()
    //       .then(posts => {
    //         context.commit({type: 'setPosts', posts})
    //       })

    loadPosts(context, payload) {
      return PostService.query()
        .then(posts => {
          context.commit({type: 'setPosts', posts})
        })
    },

    addComment(context, {post}) {
      console.log('post from store', post);
      return CommentsService.addComment(post)
        .then(res => {
          console.log('res.data', res)
          context.commit({type: 'createComment', post: res})
        });
    },
    deleteComment(context, {commentId}) {
      console.log('commentId from store',commentId)
      return CommentsService.deleteComment(commentId)
        .then(res => {
          context.commit({type: 'deleteComment', commentId})
        })
    }
  },

  
})
