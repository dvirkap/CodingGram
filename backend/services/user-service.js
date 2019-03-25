const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

function getUsers() {
    return mongoService.connect()
        .then(db => db.collection('users').find({})
            .toArray())
}

function getById(userId) {
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ _id: new ObjectId(userId) }))
        .then(post => {
            return post
        })
}


function checkLogin(userCredentials) {
    console.log(userCredentials);
    var username = userCredentials.userName
    var pass = userCredentials.password
    console.log(username, pass);
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ $and: [{ userName: username }, { password: pass }] }))
        .then(user => {
            console.log('USER FROM DB:::::::', user);
            if (user) {
                var userToreturn = { ...user };
                return Promise.resolve(userToreturn);
            }
            else {
                console.log('about to send an error')
                return Promise.reject(new Error("bad usernameor password"))
            }
        })
}

module.exports = {
    checkLogin,
    getUsers,
    getById
}



