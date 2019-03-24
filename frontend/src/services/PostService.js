import axios from 'axios';

export default {
    query,
    getPostById
}

const _URL = (process.env.NODE_ENV !== 'development')
    ? '/post/'
    : 'http://localhost:3000/post/';

async function query() {
    let query = '';
    var res = await axios.get(`${_URL}${query}`);
    return res.data
}

async function getPostById(postId) {
    var post = await axios.get(`${_URL}${postId}`);
    return res.data(post)
}