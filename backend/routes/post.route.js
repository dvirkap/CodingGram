const postService = require('../services/post-service');
const userService = require('../services/user-service');


function checkLoggedInUser(req, res, next) {

    if (!req.session.user || !req.session.user.isAdmin) {
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
        res.json(post);

    })

    // CREATE POST
    app.post('/post', async (req, res) => {
        var post = req.body;
        var currUser = req.session.loggedInUser
        console.log('currUser',currUser);
        
        if (currUser) {
            const addedPost = await postService.add(post, currUser)
            res.json(addedPost)
        }
    })
    // like/unlike POST
    app.put('/post/like', async (req, res) => {
        var post = req.body.post;
        var currUser = req.session.loggedInUser
        var userId = req.body.userId

            if(currUser){
                if(currUser._id === userId){
                const updatedPost = await postService.update(post);
                    res.json(updatedPost);}
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
        console.log('req.session.loggedInUser._id:::::::',req.session.loggedInUser._id);
        console.log('req.body.creator._id:::::::::',req.body.creator._id);
        // console.log(req.session, 'updateeeeeeeeeeeeeee');

        var postCreatorId = req.body.creator._id
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
            console.log('req.session.loggedInUser._id:::::::',req.session.loggedInUser._id);
            console.log('req.body.creator._id:::::::::',req.body.comment.creator._id);
            const params = req.params
            var commentCreatorId = req.body.comment.creator._id
            // var post = await postService.getPostById(params.postId)
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
        var post = req.body.currPost;
        var currUser = req.session.loggedInUser
        var userId = req.body.userId
            if(currUser){
                if(currUser._id === userId){
                const updatedPost = await postService.update(post);
                    res.json(updatedPost);}
            }
    })

    // -------------------------- Replies SECTION ---------------------------
    //ADD REPLY
    app.post('/reply', async (req, res) => {
        var reply = req.body;
        console.log(`reply req body:::::::::::`, reply);
        var currUser = req.session.loggedInUser
        var addedReply = await postService.addReply(reply)
        res.json(addedReply)
    })

    //DELETE REPLY
    app.put('/post/:postId/:commentId/:replyId', async (req, res) => {
        if (req.session.loggedInUser.userName) {
            console.log('req.session.loggedInUser._id:::::::',req.session.loggedInUser._id);
            console.log('req.body.creator._id:::::::::',req.body.creator._id);
            console.log('req.body._id:::::::::',req.body._id);
            var replyToDelete = req.body
            // const params = req.params
            var replyCreatorId = req.body.creator._id
            // var post = await postService.getPostById(params.postId)
            if (replyCreatorId === req.session.loggedInUser._id) {
                const deletedReply = await postService.deleteReply(replyToDelete)
                res.end(`reply ${deletedReply} deleted!`)
            }
        }

    })

}

module.exports = addPostRoute;