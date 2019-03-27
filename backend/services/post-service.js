const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;


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
            .then(db => db.collection('posts').find(filterObj).sort({ createdAt: -1}).toArray())
    } else {
        return mongoService.connect()
            .then(db => db.collection('posts').find({}).sort({ createdAt: -1})
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
    // console.log('EDIT POST --- POSTID BEFORE MONGO:::::::', postId, post);
    delete post._id
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: post }))
        .then(res => {
            // console.log('UPDATE POST BACK FROM POST-SERVICE:', post);

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
function updateComment(id, newComment, currUser) {
    console.log('POSTID:::::::', id);
    console.log('NEW COMMENT:::::::', newComment);
    console.log('CURR USER:::::::', currUser);

    var comment = {
        _id: new ObjectId(),
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
    // const strId = post._id
    const postId = id
    return mongoService.connect()
        .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { comments: {$each:[comment], $position: 0} } }))
        // .then(db => db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { comments: post.comments[post.comments.length - 1] } }))
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
            // var commentID = new ObjectId(params.commentId)
            const collection = db.collection('posts');
            console.log('commentId from back service', params)
            return collection.updateOne({ _id: new ObjectId(params.postId) }, { $pull: { comments: { _id: new ObjectId(params.commentId) } } })
            // return collection.updateOne({ _id: new ObjectId(params.postId) }, { $pull: { comments: commentID} })
        })
}

// --------------------------- Replies -----------------------------------

//ADD NEW REPLY
function addReply(reply) {
    console.log('---------------reply----------------', reply);
    // console.log('---------------reply----------------', currUser);
    var newReply = {
        commentId: "add id",
        txt: "the first reply",
        createdAt: Date.now(),
        creator: {
            userName: "Ploni"
        }
    }

    return mongoService.connect()
        .then(db => db.collection('replies').insertOne(newReply))
        .then(res => {
            return res
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
    addReply

}


