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
    setPost(state,post){
      state.currPost = post
    },
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
    deleteComment(state, payload) {
      let comments = [];
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i]._id === payload.commentId) {
          comments.splice(state.comments[i])
          
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
    post(state){
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
    LoadPost(context, postId){
      return PostService.getPostById(postId).then(res=>res)
    },

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
    deleteComment(context, payload) {
      console.log('commentId from store',payload)
      console.log('postId from store',payload.postId)
      return CommentsService.deleteComment(payload)
        .then(res => {
          context.commit({type: 'deleteComment', payload})
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
