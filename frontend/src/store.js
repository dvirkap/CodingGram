import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService.js';
import CommentsService from './services/CommentsService.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    currPost: null

  },
  mutations: {
    updatePost(state, {post}) {
      state.currPost = post;
      let postIdx = state.posts.findIndex(post => post._id === state.currPost._id)
      state.posts.splice(postIdx, 1, state.currPost)
    },
    addPost(state, {post}) {
      console.log(post);
      
    },
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
        if (state.comments[i]._id === payload.commentId) {
          comments.splice(state.comments[i])
          
        }
      }
      state.comments = comments;
    }
  },
    
  getters: {
    postsFiltered(state) {
      return state.posts
    },
    getComments(state) {
      return state.comments
    }
  },
  actions: {
    addPost(context,post){
      console.log(post,'paayy')
      PostService.updatePost(post).then(res=>{
        if(post._id) {
          context.commit({type:'updatePost', post})
        } else {
          context.commit({type:'addPost', post})

        }
      })
      // console.log('in store!',payload)
    },
    
    // async loadPosts(context, payload){
    //  let posts = await PostService.query()
    //   context.commit('postsFiltered', posts)
    // },

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
    deleteComment(context, payload) {
      console.log('commentId from store',payload.commentId)
      console.log('postId from store',payload.postId)
      return CommentsService.deleteComment(payload)
        .then(res => {
          context.commit({type: 'deleteComment', payload})
        })
    }
  },
  

  
})
