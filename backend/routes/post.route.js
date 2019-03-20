const postService = require('../services/post-service');

function addPostRoute(app) {
    //Post rest:

    //LIST of posts
    {
        app.get('/post', async (req, res) => {
            console.log('post.route.js REQ.QUERY:', req.query)
            var posts = await postService.query()
            console.log(posts);
            
            res.json(posts)
            // var x = await sendtoAsyncFunc(posts)
            // var y = await sendtosecFunc(x)
        })
    }
}

module.exports = addPostRoute;