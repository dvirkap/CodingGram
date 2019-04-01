const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const UtilService = require('../services/UtilService');

//GET ALL POSTS
function query(filter) {

    if (filter) {
        var keyWord = new RegExp(filter, 'i')
        var filterObj = {
            $or: [{ title: { $regex: keyWord } },
            { desc: { $regex: keyWord } },
            { 'snippet.html': { $regex: keyWord } },
            { 'snippet.lang': { $regex: keyWord } },
            { 'snippet.css': { $regex: keyWord } },
            { 'snippet.code': { $regex: keyWord } },
            { 'creator.userName': { $regex: keyWord } },
            ]
        }
        return mongoService.connect()
            .then(db => db.collection('posts').find(filterObj).sort({ createdAt: -1 }).toArray())
    } else {
        return mongoService.connect()
            .then(db => db.collection('posts').find({}).sort({ createdAt: -1 })
                .toArray())
    }
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
function add(post, creator) {
    var currPost = {

        title: post.title,
        desc: post.desc,
        snippet: {
            lang: "js",
            html: post.snippet.html,
            css: post.snippet.css,
            code: post.snippet.code,
        },
        hashtags: [
            "javascript"
        ],
        createdAt: Date.now(),
        creator: {
            userName: creator.userName,
            _id: new ObjectId(creator._id),
            img: creator.img
        },
        copiedCount: 1,
        isApproved: false,
        likeBy: [
        ],
        comments: [
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
    delete post._id
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
    return mongoService.connect()
        .then(db => db.collection('posts').deleteOne({ _id }))
}
// --------------------- COMMENTS ----------------------------------------


// ADD NEW COMMENT
function updateComment(id, newComment, currUser) {
    console.log('POSTID:::::::', id);
    console.log('NEW COMMENT:::::::', newComment);
    console.log('CURR USER:::::::', currUser);

    var comment = {
        _id: UtilService.makeId(12),
        txt: newComment.txt,
        snippet: {
            lang: newComment.snippet.lang,
            html: newComment.snippet.html,
            css: newComment.snippet.css,
            code: newComment.snippet.code
        },
        createdAt: Date.now(),
        creator: {
            userName: currUser.userName,
            _id: currUser._id,
            img: currUser.img
        },
        replies: [],
        isApproved: false,
        likeBy: []
    }
    const postId = id
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { comments: { $each: [comment], $position: 0 } } }))
        .then(res => {
            var post = res
            post._id = postId;
            return post;
        })
}

// DELETE COMMENT
function removeComment(params) {
    return mongoService.connect()
        .then(db => {
            console.log(params)
            console.log('commentId from back service', params)
            db.collection('posts').updateOne({ _id: new ObjectId(params.postId) }, { $pull: { comments: { _id: params.commentId } } })
        })
}

function addLikeComment(post) {
    var postId = post._id
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: post }))
        .then(res => {
            post._id = postId;
            return post;
        })
}

// --------------------------- Replies -----------------------------------

//ADD NEW REPLY
function addReply(reply) {
    var commentId = reply.commentId
    var postId = reply.postId

    var newReply = {
        _id: UtilService.makeId(12),
        postId: reply.postId,
        commentId: reply.commentId,
        txt: reply.txt,
        // snippet: {
        //     lang: reply.snippet.lang,
        //     html: newComment.snippet.html,
        //     css: newComment.snippet.css,
        //     code: newComment.snippet.code
        // },
        createdAt: Date.now(),
        creator: reply.creator
    }


    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId), "comments._id": commentId }, { $push: { "comments.$.replies": newReply } }))
        .then(res => {
            console.log('result::::::::::::', res);

            var addedReply = res
            return addedReply;
        })
}
function deleteReply(replyToDelete) {
    var commentId = replyToDelete.commentId
    var postId = replyToDelete.postId
    var replyId = replyToDelete._id
    console.log('postId', postId);
    console.log('commentId', commentId);
    console.log('replyId', replyId);

    return mongoService.connect()
        .then(db => db.collection('posts').findOneAndUpdate({ _id: new ObjectId(postId), "comments._id": commentId }, { $pull: { "comments.$.replies": { _id: replyId } } }))
        .then(res => {
            console.log('result::::::::::::', res);

            var deletedReply = res
            return deletedReply;
        })
}

module.exports = {
    query,
    update,
    add,
    removePost,
    getPostById,
    removeComment,
    updateComment,
    addReply,
    addLikeComment,
    deleteReply

}


