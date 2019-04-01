import Axios from 'axios';

export default {
    query,
    getPostById,
    updatePost,
    addLike,
    deletePost
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
async function deletePost(post) {
    console.log(`POST TO BE DELETED:::::`, post);
    var postId = post._id
    var headers = {
        data: post
    }
    var deletedPost = await axios.delete(`${_URL}${postId}`, headers)
    return deletedPost;
}
// add/edit post
async function updatePost(post) {
    const postId = post._id
    if (postId) {
        var editedPost = await axios.put(`${_URL}${postId}`, post)
        return editedPost
    } else {
        var addedPost = await axios.post(`${_URL}`, post)
        return addedPost
    }
}

async function addLike(post,userId) {
    var postAndUser = {
        post,
        userId
    }
    var editedPost = await axios.put(`${_URL}like`, postAndUser)
    return editedPost
}
