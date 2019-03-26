const postService = require('../services/post-service');

function checkLoggedInUser(req, res, next) {
    console.log('INSIDE MIDDLEWARE: ', req.session.userName);
    console.log('INSIDE MIDDLEWARE: ', req.session.user.isAdmin);

    if (!req.session.user || !req.session.user.isAdmin) {
        console.log('INSIDE');
       return  res.status(401).end('Unauthorized');
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


        
        console.log(post, 'postpostpost')
        const addedPost = await postService.add(post,currUser)
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
    app.delete('/post/:postId/:commentId',  async (req, res) => {
        if(req.session.loggedInUser.userName) {
            const params = req.params

            var post = await postService.getPostById(params.postId)
            // console.log(post.creator.userName,'post.creator.userName')
            
            // console.log(req.session.loggedInUser.userName,'req.session.loggedInUser.userName')
    
            
            if(post.creator.userName === req.session.loggedInUser.userName){
                // console.log(params,'sdfsdfsdf');
                
                const deletedComment = await postService.removeComment(params)
                res.end(`comment ${deletedComment} deleted!`)
            }
        }
      
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