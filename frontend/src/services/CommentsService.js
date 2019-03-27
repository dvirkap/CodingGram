import PostService from './PostService.js';
import Axios from 'axios';
// import PostService from '@/services/PostService.js'

export default {
    addComment,
    deleteComment,
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
    console.log('post.comments::::::::', post.comments);
    var comment = post.comments.find(comment=> comment._id === payload.commentId)
    console.log('COMMENT     creator id:', comment.creator._id)

    var commentWithPost = {
        comment,
        post
    }
    var headers = {
        data: commentWithPost
    }
    // console.log('commentId front service', commentId)
    // console.log(_URL + commentId)
    console.log(payload);
    console.log('COMMENT ID::::::::::::', payload.commentId);

    const deletedComment = await axios.delete(`${_URL}${payload.postId}/${payload.commentId}`, headers)
    return deletedComment
}