import axios from 'axios';
// import PostService from '@/services/PostService.js'

export default {
    addComment,
    deleteComment
}

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

function deleteComment(commentId) {
    console.log('commentId front service', commentId)
    console.log(_URL + commentId)
    return axios.delete(_URL + commentId)
    // return axios.delete(`${_URL}${commentId}`, commentId)
}