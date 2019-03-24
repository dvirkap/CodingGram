const postService = require('../services/post-service');

function addPostRoute(app) {
    //Post rest:

    //LIST of posts
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


    //One Post BY ID
    app.get('/post/:postId', async (req, res)=> {
        var postId = req.params.postId
        // console.log('post.route postId:', postId);
        const post = await postService.getPostById(postId)
        console.log('post is---------',post);
        res.json(post);
         
    })


    // create comment 
    app.post('/post', (req, res) => {
        const post = req.body;
        console.log('post from route',post);
        postService.addPost(post)
            .then(post => {
                res.json(post)
            })
    })

    //delete
    app.delete('/post/:commentId', (req, res) => {
        // console.log('delete:  req ',req, 'res ', res)
        const commentId = req.params.commentId
        console.log('req.params.commentId', commentId)
        postService.remove(commentId)
            .then(() => res.end(`comment ${commentId} deleted!`))
        // console.log(commentId)
    })

    //update
    // app.put('/post', (req, res) => {
        //     console.log(req, res)
        //     const comment = req.vody;
        //     commentsService.update(comment)
        //         .then(comment => res.json(comment))
        // })
        
}

module.exports = addPostRoute;