import Axios from 'axios';

export default {
    query,
    getPostById,
    updatePost,
    addLike
}

const axios = Axios.create({
    withCredentials: true
})
const _URL = (process.env.NODE_ENV !== 'development')
    ? '/post/'
    : 'http://localhost:3000/post/';
// get posts
async function query(filter) {

        let query
        if(filter) query = '?filter=' + filter
        else query = ''
        var res = await axios.get(`${_URL}${query}`);
        return res.data

}
// get post by id
async function getPostById(postId) {
    var post = await axios.get(`${_URL}${postId}`);
    return post.data
}

// add/edit post
async function updatePost(post) {
    const postId = post._id
    if (postId) {
        var editedPost = await axios.put(`${_URL}${postId}`, post)
        return res.data(editedPost)
    } else {
        var addedPost = await axios.post(`${_URL}`, post)
        return addedPost
    }
}

function addLike(post) {
    return axios.post(`${_URL}`, post)
}
