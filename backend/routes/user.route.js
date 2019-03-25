const userService = require('../services/user-service.js')

function addUserRoute(app) {
    app.post('/login', (req, res) => {
        const userCredentials = req.body;

        // in mongo i extract the user the it truthy by username
        
        userService.checkLogin(userCredentials)
            .then(user => {
                req.session.loggedInUser = user;
                res.json(user)
            })
            .catch(err => {
                console.log('BACKEND service ERROR', err);
                res.status(500).send('Wrong Credentials')
            })
    })

    app.get('/user', async (req, res) => {
        var users = await userService.getUsers()
        return res.json(users)
    })
    app.get('/user/:userId', async (req, res) => {
        
        const { userId } = req.params;
        console.log ('ddddddddddddd');
        var user = await userService.getById(userId)
        return res.json(user)
    })



}

module.exports = addUserRoute;