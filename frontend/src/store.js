import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService.js';
import CommentsService from './services/CommentsService.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    currComment: null,
    likes: []
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
    deleteComment(state, payload) {
      let comments = [];
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i]._id !== payload.commentId) {
          comments.push(state.comments[i])
        }
      }
      state.comments = comments;
    },
    addLike(state, payload) {
      let likes = [];
      let addLike = true
      for (let i = 0; i <state.likes.length; i++) {
        if ( state.likes[i].likeBy.userName === payload.post.userName) {
          addLike = false;
        }
        if (addLike === true) state.likes = state.likes.push(payload.likeBy)
      }
    }
  },

  getters: {
    postsFiltered(state) {
      return state.posts;
    },
    getComments(state) {
      return state.comments;
    },
    getLikes(state) {
      return state.likes;
    }
  },
  actions: {

    // async loadPosts(context, payload){
    //  let posts = await PostService.query()
    //   context.commit('postsFiltered', posts)
    // },

    loadPosts(context, payload) {
      return PostService.query()
        .then(posts => {
          context.commit({ type: 'setPosts', posts })
        })
    },

    addComment(context, { post }) {
      console.log('post from store', post);
      return CommentsService.addComment(post)
        .then(res => {
          console.log('res.data', res)
          context.commit({ type: 'createComment', post: res })
        });
    },
    deleteComment(context, { commentId }) {
      console.log('commentId from store', commentId)
      return CommentsService.deleteComment(commentId)
        .then(res => {
          context.commit({ type: 'deleteComment', commentId })
        })
    },
    addLike(context ,post) {
      let likeBy = post.likeBy
      console.log('post',post)
      return PostService.addLike(post)
      .then(res => {
        context.commit({type: 'addLike', likeBy})
      })
    }

  }


})
