import PostService from './PostService.js';
import Axios from 'axios';
// import PostService from '@/services/PostService.js'

export default {
    addComment,
    deleteComment,
    likeComment
}

const axios = Axios.create({
    withCredentials: true
})
const _URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : 'http://localhost:3000';
    // ? '/post/'
    // : 'http://localhost:3000/post/';


async function addComment(payload) {
    const postId = payload.postId
    const newComment = payload.newComment
    const updatedPost = await axios.put(`${_URL}/post/${postId}/comment`, newComment)
    return updatedPost.data
}

async function deleteComment(payload) {
    var post = await PostService.getPostById(payload.postId)
    var comment = post.comments.find(comment => comment._id === payload.commentId)
    var commentWithPost = {
        comment,
        post
    }
    var headers = {
        data: commentWithPost
    }
    const deletedComment = await axios.delete(`${_URL}/post/${payload.postId}/${payload.commentId}`, headers)
    return deletedComment
}

async function likeComment(currPost,userId) {
    var postAndUser = {
        currPost,
        userId
    }
    var like = await axios.put(`${_URL}/comment/like`, postAndUser)
    return like
}