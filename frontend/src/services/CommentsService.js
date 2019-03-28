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
    ? '/post/'
    : 'http://localhost:3000/post/';


async function addComment(payload) {
    const postId = payload.postId
    const newComment = payload.newComment
    const updatedPost = await axios.put(`${_URL}${postId}/comment`, newComment)
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
    const deletedComment = await axios.delete(`${_URL}${payload.postId}/${payload.commentId}`, headers)
    return deletedComment
}

async function likeComment(payload) {
    console.log('PAYLOAD:::::', payload);
    var comment = payload.comment
    var post = await PostService.getPostById(payload.postId)
    var postAndComment = {
        post,
        comment
    }
    var like = await axios.put(`http://localhost:3000/comment/like`, postAndComment)
    return like
}