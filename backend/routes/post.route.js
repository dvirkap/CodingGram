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
    //Post rest:

    //GET LIST OF POSTS
    // {
    app.get('/post', async (req, res) => {
        // console.log('0000',req.query.filter)


        // console.log('post.route.js REQ.QUERY:', req.query)
        var posts = await postService.query(req.query.filter)
        res.json(posts)
        // var x = await sendtoAsyncFunc(posts)
        // var y = await sendtosecFunc(x)
    })
    // }


    //GET POST BY ID
    app.get('/post/:postId', async (req, res) => {
        var postId = req.params.postId
        // console.log('post.route postId:', postId);
        const post = await postService.getPostById(postId)
        console.log('post is---------', post);
        res.json(post);

    })

    // CREATE POST
    app.post('/post', async (req, res) => {
        var post = req.body;
        var currUser = req.session.loggedInUser
        const addedPost = await postService.add(post, currUser)
        res.json(addedPost)
    })
    // like/unlike POST
    app.put('/post/like', async (req, res) => {
        var post = req.body;
        var currUser = req.session.loggedInUser
        console.log(currUser,'currUsercurrUser')
        console.log('start')

        if(currUser){
            if(post.likeBy.length){
                var indexUser = post.likeBy.findIndex(user => user._id === currUser._id)
                    if (indexUser === -1) {
                            console.log('added')
                            post.likeBy.push(currUser)
                            const updatedPost = await postService.update(post);
                            res.json(updatedPost);
                    } else{
                            console.log('removeed')
                            post.likeBy.splice(indexUser,1)
                            const updatedPost = await postService.update(post);
                            res.json(updatedPost);
                    };
            } else{
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
        const updatedPost = await postService.update(post);
        res.json(updatedPost);
    })

    // DELETE POST
    app.delete('/post/:postId', async (req, res) => {
        const postId = req.params.postId;
        console.log('postId::::::::', postId);
        const deletedPost = await postService.removePost(postId)
        res.end()
    })

    // -------------------------- COMMENTS SECTION ---------------------------

    //DELETE COMMENT
    app.delete('/post/:postId/:commentId', async (req, res) => {
        if (req.session.loggedInUser.userName) {
            const params = req.params
            var post = await postService.getPostById(params.postId)
            if (post.creator.userName === req.session.loggedInUser.userName) {
                const deletedComment = await postService.removeComment(params)
                res.end(`comment ${deletedComment} deleted!`)
            }
        }

    })

    // UPADTE COMMENT
    app.put('/post/:postId', async (req, res) => {
        const post = req.body;


        const updatedPost = await postService.updateComment(post);

        res.json(updatedPost);


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