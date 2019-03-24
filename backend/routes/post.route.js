const postService = require('../services/post-service');

function addPostRoute(app) {
    //Post rest:

    //GET LIST OF POSTS
    {
        app.get('/post', async (req, res) => {
            // console.log('post.route.js REQ.QUERY:', req.query)
            var posts = await postService.query()
            // console.log(posts);
            res.json(posts)
            // var x = await sendtoAsyncFunc(posts)
            // var y = await sendtosecFunc(x)
        })
    }


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
        const post = req.body;
        const addedPost = await postService.add(post)
        console.log('Post Created and back from DB:', addedPost);
        res.json(addedPost)
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
        console.log(req.params);
        const params= req.params
        console.log(params);
        
        const deletedComment = await postService.removeComment(params)
        res.end(`comment ${deletedComment} deleted!`)
        // console.log(commentId)
    })

    // UPADTE COMMENT
    app.put('/post/:postId', async (req, res) => {
        const post = req.body;
        console.log('post.route update, before post-service:', post);
        const updatedPost = await postService.updateComment(post);
        console.log('updatedPost', updatedPost);

        res.json(updatedPost);


    })

}

module.exports = addPostRoute;