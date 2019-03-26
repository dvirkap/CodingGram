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


async function addComment(post) {
    console.log('post from front service', post);
    const postId = post._id
    console.log(postId);
    const updatedPost = await axios.put(`${_URL}${postId}`, post)
    return updatedPost.data
}

async function deleteComment(payload) {
    // console.log('commentId front service', commentId)
    // console.log(_URL + commentId)
    console.log(payload);
    console.log('COMMENT ID::::::::::::', payload.commentId);

    const deletedComment = await axios.delete(`${_URL}${payload.postId}/${payload.commentId}`)
    return deletedComment
}