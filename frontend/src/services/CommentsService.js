import axios from 'axios';

export default {
    addComment,
    deleteComment
}

const _URL = (process.env.NODE_ENV !== 'development')
    ? '/post/'
    : 'http://localhost:3000/post/';


function addComment(post) {
      console.log('post from front service', post);
    return axios.post(`${_URL}`, post)
}

function deleteComment(commentId) {
    console.log('commentId front service', commentId)
    console.log(_URL + '' + commentId)
    return axios.delete(`${_URL}${commentId}`, commentId)
}