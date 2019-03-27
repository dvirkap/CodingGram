const postService = require('../services/post-service');

function checkLoggedInUser(req, res, next) {
    console.log('INSIDE MIDDLEWARE: ', req.session.userName);
    console.log('INSIDE MIDDLEWARE: ', req.session.user.isAdmin);

    if (!req.session.user || !req.session.user.isAdmin) {
        console.log('INSIDE');
        return res.status(401).end('Unauthorized');
    }
    next();
}

function addPostRoute(app) {
    app.get('/post', async (req, res) => {
        var posts = await postService.query(req.query.filter)
        res.json(posts)
    })


    //GET POST BY ID
    app.get('/post/:postId', async (req, res) => {
        var postId = req.params.postId
        const post = await postService.getPostById(postId)
        console.log('post is---------', post);
        res.json(post);

    })

    // CREATE POST
    app.post('/post', async (req, res) => {
        var post = req.body;
        var currUser = req.session.loggedInUser
        if (currUser) {
            const addedPost = await postService.add(post, currUser)
            res.json(addedPost)
        }
    })
    // like/unlike POST
    app.put('/post/like', async (req, res) => {
        var post = req.body;
        var currUser = req.session.loggedInUser
        if (currUser) {
            if (post.likeBy.length) {
                var indexUser = post.likeBy.findIndex(user => user._id === currUser._id)
                if (indexUser === -1) {
                    console.log('added')
                    post.likeBy.push(currUser)
                    const updatedPost = await postService.update(post);
                    res.json(updatedPost);
                } else {
                    console.log('removeed')
                    post.likeBy.splice(indexUser, 1)
                    const updatedPost = await postService.update(post);
                    res.json(updatedPost);
                };
            } else {
                console.log('added')
                post.likeBy.push(currUser)
                const updatedPost = await postService.update(post);
                res.json(updatedPost);
            };
        } else {
            console.log('no user')
        }
    })

    // UPDATE POST
    app.put('/post/:postId', async (req, res) => {
        const post = req.body;
        var postCreatorId = post.creator._id
        if (postCreatorId === req.session.loggedInUser._id) {
            const updatedPost = await postService.update(post);
            res.json(updatedPost);
        }
    })

    // DELETE POST
    app.delete('/post/:postId', async (req, res) => {
        var postCreatorId = req.body.post.creator._id
        if (postCreatorId === req.session.loggedInUser._id) {
            const postId = req.params.postId;
            console.log('postId::::::::', postId);
            const deletedPost = await postService.removePost(postId)
            res.end()
        }
    })

    // -------------------------- COMMENTS SECTION ---------------------------

    //DELETE COMMENT
    app.delete('/post/:postId/:commentId', async (req, res) => {
        if (req.session.loggedInUser.userName) {
            const params = req.params
            var commentCreatorId = req.body.comment.creator._id
            var post = await postService.getPostById(params.postId)
            if (commentCreatorId === req.session.loggedInUser._id) {
                const deletedComment = await postService.removeComment(params)
                res.end(`comment ${deletedComment} deleted!`)
            }
        }

    })

    // ADD/UPDATE COMMENT
    app.put('/post/:postId/comment', async (req, res) => {
        if (req.session.loggedInUser.userName) {
            var currUser = req.session.loggedInUser
            const id = req.params.postId
            const newComment = req.body;
            const updatedPost = await postService.updateComment(id, newComment, currUser);
            res.json(updatedPost);
        }

    })

    app.put('/comment/like', async (req, res) => {
        var post = req.body.post;
        var currUser = req.session.loggedInUser
        var comment = req.body.comment

   
        
        
        if (currUser) {
            if (comment.likeBy.length) {


                var indexUser = comment.likeBy.findIndex(user => user._id === currUser._id)
                if (indexUser === -1) {

                    console.log('added')
                    comment.likeBy.push(currUser)
                    var currCommentIdx = post.comments.findIndex(cmt => cmt._id === comment._id )
                    post.comments.splice(currCommentIdx,1, comment)
                    const updatedPost = await postService.update(post);
                    res.json(updatedPost);
                } else {
                    console.log('removeed')
                    var currUserLikeIdxOnComment = comment.findIndex(user => user._id === currUser._id)
                    var updatedComment = comment.likeBy.splice(currUserLikeIdxOnComment,1)
                    var currCommentIdx = post.comments.findIndex(cmt => cmt._id === comment._id )
                    
                    post.comments.splice(currCommentIdx,1, updatedComment)
                    const updatedPost = await postService.update(post);
                    res.json(updatedPost);

                };
            } else {
               
                console.log('added')
                comment.likeBy.push(currUser)
                var currCommentIdx = post.comments.findIndex(cmt => cmt._id === comment._id )
                post.comments.splice(currCommentIdx,1, comment)
                const updatedPost = await postService.update(post);
                res.json(updatedPost);
            };
        } else {
            console.log('no user')
        }
    })

    // -------------------------- Replies SECTION ---------------------------
    //ADD REPLY
    app.post('/reply', async (req, res) => {

        var reply = req.body;
        var currUser = req.session.loggedInUser
        console.log('req.body:::::::::::', reply);
        var addedReply = await postService.addReply(reply)
        res.json(addedReply)
    })

}

module.exports = addPostRoute;