const mongoService = require('./mongo-service')

// const objectId = require('mongodb').ObjectID;
const ObjectId = require('mongodb').ObjectId;

function query() {
    // console.log('post-service query:', query);
    return mongoService.connect()
        .then(db => db.collection('posts').find({})
            .toArray())
}

function addPost(post) {
    console.log('post from back service', post);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('posts');
            return collection.save(post)
                .then(result => {
                    post.comments._id = result.insertedId;
                    return comment;
                })
        })
}

function getPostById(postId) {
    // const id = new objectId(postId)
    // console.log('postId from back service', postId);
    return mongoService.connect()
        .then(db => db.collection('posts').findOne({ _id: new ObjectId(postId) }))
        .then(post => {

            console.log('---------------------------')
            console.log(post)
            console.log('---------------------------')
            return post
        })
}

function update(post) {
    console.log('posttttttttt', post)
    console.log('posttttttttt')
    console.log('post._id::::::::::::::::::', post._id);
    const strId = post._id
    // const postId = new ObjectId (strId)
    const postId = strId
    console.log('post._id:::::::', postId);
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { comments: post.comments[post.comments.length - 1] } }))
        .then(res => {
            console.log('ressssssssssssssssssss', res);
            post._id = strId;
            return post;
        })
}
// function update(post) {
//     console.log('posttttttttt', post)
//     const strId = post._id
//     const _id = new Object(post._id)
//     post._id = _id
//     return mongoService.connect()
//         .then(db => {
//             returndb.collection('posts')
//                 .updateOne({_id}, {$set: comment})
//         })
//         .then(() => {
//             comment._id = strId;
//             return comment;
//         })
// }

function remove(commentId) {
    commentId = new ObjectId(commentId);
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
    addPost,
    getPostById,
    remove
}