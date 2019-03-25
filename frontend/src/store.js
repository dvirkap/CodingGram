import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService.js';
import CommentsService from './services/CommentsService.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    currPost: null,
    currComment: null,
    likes: []
  },
  mutations: {
    updatePost(state, { post }) {
      state.currPost = post;
      let postIdx = state.posts.findIndex(post => post._id === state.currPost._id)
      state.posts.splice(postIdx, 1, state.currPost)
    },
    addPost(state, { post }) {
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
    deleteComment(state, { payload }) {
      let postIdx = state.posts.findIndex(post => post._id === payload.postId)
      let commentIdx = state.posts[postIdx].comments.findIndex(comment => comment._id === payload.commentId)
      state.posts[postIdx].comments.splice(commentIdx, 1)
    },
    addLike(state, payload) {
      let likes = [];
      let addLike = true
      for (let i = 0; i < state.likes.length; i++) {
        if (state.likes[i].likeBy.userName === payload.post.userName) {
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
    addPost(context, post) {
      console.log(post, 'paayy')
      PostService.updatePost(post).then(res => {
        if (post._id) {
          context.commit({ type: 'updatePost', post })
        } else {
          context.commit({ type: 'addPost', post })

        }
      })
    },


    loadPosts(context, payload) {
      return PostService.query()
        .then(posts => {
          context.commit({ type: 'setPosts', posts })
        })
    },

    addComment(context, { post }) {
      return CommentsService.addComment(post)
        .then(res => {
          context.commit({ type: 'createComment', post: res })
        });
    },
    deleteComment(context, payload) {
      return CommentsService.deleteComment(payload)
        .then(res => {
          context.commit({ type: 'deleteComment', payload })
        })
    },
    addLike(context, post) {
      let likeBy = post.likeBy
      console.log('post', post)
      return PostService.addLike(post)
        .then(res => {
          context.commit({ type: 'addLike', likeBy })
        })
    }

  }


})
