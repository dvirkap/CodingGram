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
    console.log(post,'in SERVER')
    var currPost = {
            
            title : post.title, 
            desc : post.desc, 
            snippet : {
                lang : "js", 
                html :post.snippet.html, 
                css :post.snippet.css, 
                code :post.snippet.code, 
            }, 
            hashtags : [
                "javascript"
            ], 
            createdAt : Date.now(), 
            creator : {
                "userName" : "Kenny Goddard", 
                "_id" : ObjectId("5c8e97334330fca0bb034d54"), 
                "userImg" : "51.jpg"
            }, 
            copiedCount : 1, 
            isApproved : false, 
            likeBy : [
            ], 
            comments : [
        
            ]
        
    }
    return mongoService.connect()
        .then(db => db.collection('posts').insertOne(currPost))
        .then(res => {
            post._id = res.insertedId
            return post
        })
}

//EDIT POST
function update(post) {
    const strId = post._id
    const postId = strId
    console.log('EDIT POST --- POSTID BEFORE MONGO:::::::', postId, post);
    delete post._id
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: post }))
        .then(res => {
            console.log('UPDATE POST BACK FROM POST-SERVICE:', post);

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
function removeComment(params) {
    return mongoService.connect()
        .then(db => {
            console.log(params)
            // var commentID = new ObjectId(params.commentId)
            const collection = db.collection('posts');
            console.log('commentId from back service', params)
            return collection.updateOne({ _id: new ObjectId(params.postId) }, { $pull: {comments: { _id: params.commentId } }})
            // return collection.updateOne({ _id: new ObjectId(params.postId) }, { $pull: { comments: commentID} })
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