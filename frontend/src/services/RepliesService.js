import Axios from 'axios';
// import PostService from '@/services/PostService.js'

export default {
    addReply,
    deleteReplay
}

const axios = Axios.create({
    withCredentials: true
})
const _URL = (process.env.NODE_ENV !== 'development')
    ? '/post/'
    : 'http://localhost:3000/post/';


async function addReply(newReplay) {
     //The payload: commentId, reply
     
    var addedReply = await axios.post(`http://localhost:3000/reply`, newReplay)
    return addedReply.data
}
async function deleteReplay(payload) {
     //The payload: commentId, reply
    console.log(payload);
    const deletedReply = await axios.delete(`${_URL}${payload.commentId}/${payload.replyId}`)
    return deletedReply
}