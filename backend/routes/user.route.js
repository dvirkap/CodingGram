const userService = require('../services/user-service.js')

function addUserRoute(app) {

    app.post('/login', (req, res) => {
        const userCredentials = req.body;

        if (req.session.loggedInUser) console.log('req.bodyyyyyyyyyyy', req.body)
        else {
            console.log('ttttttttttttt');
            
            userService.checkLogin(userCredentials)
                .then(user => {
                    req.session.loggedInUser = user;
                    res.json(user)
                })
                .catch(err => {
                    res.status(500).send('Wrong Credentials')
                })
        }
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