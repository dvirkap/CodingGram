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
    // console.log('postId from back service', id);
    return mongoService.connect()
        .then(db => db.collection('posts').findOne({ _id : postId  }))
        .then(post => {
            
            console.log('---------------------------')
            console.log(post)
            console.log('---------------------------')
        })
}

function update(post) {
    console.log('posttttttttt', post)
    const strId = post._id
    const _id = new Object(post._id)
    post._id = _id
    return mongoService.connect()
        .then(db => {
            returndb.collection('posts')
                .updateOne({_id}, {$set: comment})
        })
        .then(() => {
            comment._id = strId;
            return comment;
        })
}

function remove(commentId) {
    console.log('commentId from back service', commentId)
    commentId = new ObjectId(commentId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('posts');
            console.log('commentId from back service', commentId)
            return collection.remove({_id: commentId})
        })
}

module.exports = {
    query,
    update,
    addPost,
    getPostById,
    remove
}