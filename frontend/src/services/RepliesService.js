import Axios from 'axios';
// import PostService from '@/services/PostService.js'

export default {
    addReply,
    deleteReply
}

const axios = Axios.create({
    withCredentials: true
})
const _URL = (process.env.NODE_ENV !== 'development')
    ? ''
    // ? '/post/'
    : 'http://localhost:3000';
    // : 'http://localhost:3000/post/';


async function addReply(newReply) {
     //The payload: commentId, reply
     
    var addedReply = await axios.post(`${_URL}/reply`, newReply)
    return addedReply.data
}
async function deleteReply(payload) {
     //The payload: commentId, reply
    console.log(payload);
    const deletedReply = await axios.put(`${_URL}/post/${payload.postId}/${payload.commentId}/${payload.replyId}`, payload)
    return deletedReply
}