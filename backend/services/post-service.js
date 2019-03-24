const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;


//GET ALL POSTS

function query() {
    return mongoService.connect()
        .then(db => db.collection('posts').find({})
            .toArray())
}


//GET POST BY ID

function getPostById(postId) {
    return mongoService.connect()
        .then(db => db.collection('posts').findOne({ _id: new ObjectId(postId) }))
        .then(post => {
            return post
        })
}

// ADD POST
function add(post) {
    return mongoService.connect()
        .then(db => db.collection('posts').insertOne(post))
        .then(res => {
            post._id = res.insertedId
            return post
        })
}

//EDIT POST
function update(post) {
    const strId = post._id
    const postId = strId
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: post }))
        .then(res => {
            post._id = strId;
            return post;
        })
}

// DELETE POST 
function removePost(postId) {
    const _id = new ObjectId(postId)
    console.log('POST TO DELETE ID:', _id);
    return mongoService.connect()
        .then(db => db.collection('posts').deleteOne({ _id }))
}
// --------------------- COMMENTS ----------------------------------------


// ADD NEW COMMENT
function updateComment(post) {
    const strId = post._id
    const postId = strId
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { comments: post.comments[post.comments.length - 1] } }))
        .then(res => {
            post._id = strId;
            return post;
        })
}

// DELETE COMMENT
function removeComment(commentId) {
    const commentId = new ObjectId(commentId);
    // console.log('commentId::::::::', commentId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('posts');
            console.log('commentId from back service', commentId)
            return collection.remove({ _id: commentId })
        })
}

module.exports = {
    query,
    update,
    add,
    removePost,
    getPostById,
    removeComment,
    updateComment
}