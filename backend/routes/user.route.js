const userService = require('../services/user-service.js')



function addUserRoute(app) {
    app.post('/signup', async (req,res) => {


        var newUser = req.body
        console.log(newUser,'in routes')

        const addedUser = await userService.addUser(newUser)

        req.session.loggedInUser = addedUser
        res.json(addedUser)
    })

    app.post('/login', (req, res) => {
        const userCredentials = req.body;

        // if (req.session.loggedInUser) res.json(req.session.loggedInUser)
        // else {
            userService.checkLogin(userCredentials)
                .then(user => {
                    req.session.loggedInUser = user;
                    res.json(user)
                })
                .catch(err => {
                    res.status(500).send('Wrong Credentials')
                })
        // }
    })
    app.post('/logout', (req, res) => {
        req.session.loggedInUser = null;
    })

    app.get('/user', async (req, res) => {
        var users = await userService.getUsers()
        return res.json(users)
    })
    app.get('/user/:userId', async (req, res) => {

        const { userId } = req.params;
        var user = await userService.getById(userId)
        return res.json(user)
    })



}

module.exports = addUserRoute;