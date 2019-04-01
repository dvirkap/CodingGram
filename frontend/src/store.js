import Vue from 'vue'
import Vuex from 'vuex'
import PostService from './services/PostService.js';
import UserService from './services/UserService.js';
import CommentsService from './services/CommentsService.js';
import RepliesService from './services/RepliesService.js';
import { log } from 'util';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorTheme: "dark",
    posts: null,
    comments: [],
    currPost: null,
    currComment: null,
    likes: [],
    currUser: null,
  },
  mutations: {
    mutCommentLike(state, payload) {
      state.posts.forEach(post => {
        if (post._id === payload.postId) {
          post.comments.forEach(comment => {
            if (comment._id === payload.comment._id) {
             var userIdx = comment.likeBy.findIndex(user => user._id === state.currUser._id)
             if(userIdx === -1) comment.likeBy.push(state.currUser)
             else comment.likeBy.splice(userIdx,1)
            }
          })
        }
      });
    },
    mutLikePost(state,currPost){
      state.posts.forEach(post=>{
        if(post._id === currPost._id){
          var likeIdx = post.likeBy.findIndex(user=> user._id === state.currUser._id)
          if(likeIdx === -1) post.likeBy.push(state.currUser)
          else post.likeBy.splice(likeIdx,1)
        }
      })
    },




    setUserTheme(state, theme) {
      console.log('mutations', theme)

      state.editorTheme = theme
    },
    setLoggedInUser(state, user) {
      state.currUser = user
    },
    setLoggoutUser(state) {
      state.currUser = null;
    },
    setPost(state, post) {
      state.currPost = post
    },
    deletePost1(state, post) {
      var postDeleted = post
      let postIdx = state.posts.findIndex(post => post._id === postDeleted._id)
      state.posts.splice(postIdx, 1)

    },
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

      // const comment = payload.post.comments[payload.post.comments.length - 1];

      // state.currComment = comment
    },
    deleteComment(state, { payload }) {
      let postIdx = state.posts.findIndex(post => post._id === payload.postId)
      let commentIdx = state.posts[postIdx].comments.findIndex(comment => comment._id === payload.commentId)
      state.posts[postIdx].comments.splice(commentIdx, 1)
    },
    deleteReply(state, { payload }) {
      console.log('PAYLOAD BACK TO STORE. FOR DELETE REPLY:', payload);

      let postIdx = state.posts.findIndex(post => post._id === payload.postId)
      console.log(postIdx, 'postIdx');

      let commentIdx = state.posts[postIdx].comments.findIndex(comment => comment._id === payload.commentId)
      console.log(commentIdx, 'commentIdx');

      let replyIdx = state.posts[postIdx].comments[commentIdx].replies.findIndex(reply => reply._id === payload._id)
      console.log(replyIdx, 'replyIdx');
      console.log(state.posts[postIdx].comments, 'state.posts[postIdx].comments beforeee');

      state.posts[postIdx].comments[commentIdx].replies.splice(replyIdx, 1)
      console.log(state.posts[postIdx].comments, 'state.posts[postIdx].comments afterrrr');

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
    getTheme(state) {
      return state.editorTheme;
    },
    post(state) {
      return state.currPost;
    },
    postsFiltered(state) {
      return state.posts;
    },
    getComments(state) {
      return state.comments;
    },
    getLikes(state) {
      return state.likes;
    },
    getCurrUser(state) {
      return state.currUser;
    },
  },
  actions: {
    approvedPost(context, post) {
      PostService.updatePost(post)
        .then(res => {
          context.dispatch('loadPosts')
            .then(() => {
              return Promise.resolve('yes')
            })
        })
    },
    setTheme(context, theme) {
      context.commit('setUserTheme', theme)
    },
    deletePost(context, post) {
      PostService.deletePost(post)
        .then(res => {
          context.commit({ type: 'deletePost1', post: res })
          context.dispatch('loadPosts')
        })
    },
    addPost(context, post) {
      PostService.updatePost(post)
        .then(res => {
          context.dispatch('loadPosts').then(() => {
            return Promise.resolve('yes')
          })
        })
    },
    LoadPost(context, postId) {
      return PostService.getPostById(postId).then(res => res)
    },
    loadPosts(context, filter) {
      return PostService.query(filter)
        .then(posts => {
          context.commit({ type: 'setPosts', posts })
        }).then(() => {
          return Promise.resolve('yes')
        })
    },
    addComment(context, payload) {
      return CommentsService.addComment(payload)
        .then(res => {
          context.commit({ type: 'createComment', post: res })
          context.dispatch('loadPosts')
        });
    },
    deleteComment(context, payload) {
      return CommentsService.deleteComment(payload)
        .then(res => {
          context.commit({ type: 'deleteComment', payload })
          context.dispatch('loadPosts')
        })
    },
    addReplay(context, newReply) {


      return RepliesService.addReply(newReply)
        .then(res => {
          // need to update the store posts array

          context.dispatch('loadPosts')
        });
      // .then(res => {
      //   context.commit({ type: 'createReply', reply: res })
      // });
    },
    deleteReply(context, payload) {

      return RepliesService.deleteReply(payload)
        .then(res => {
          console.log('store after delete reply:', res);
          context.commit({ type: 'deleteReply', payload })
          // context.dispatch('loadPosts')
        });
    },
    checkLoggedInUser(context) {
      console.log('in')

      UserService.checkLoggedInUser().then(res => {
        context.commit('setLoggedInUser', res)
      })
    },
    login(context, userCredentials) {
      return UserService.login(userCredentials)
        .then(res => {

          context.commit('setLoggedInUser', res)

          return res
        })


    },
    signUp(context, newUser) {
      UserService.signup(newUser).then(user => {
        context.commit('setLoggedInUser', user)
      })
    },














    addLike(context, post) {
      context.commit('mutLikePost', post)
      var currPost = context.state.posts.find(post=> post._id === post._id)
      var userId = context.state.currUser._id
      return PostService.addLike(post,userId)
        .then(res => {
          context.dispatch('loadPosts')
        })
    },
    Logout(context) {
      UserService.logout()
      context.commit('setLoggoutUser')
      context.dispatch('loadPosts')
    },
    likeComment(context, payload) {
      context.commit('mutCommentLike', payload)
      var currPost = context.state.posts.find(post=> post._id === payload.postId)
      var userId = context.state.currUser._id
      CommentsService.likeComment(currPost,userId)
        .then(()=>{
          context.dispatch('loadPosts')
        })
    },
  }
})
