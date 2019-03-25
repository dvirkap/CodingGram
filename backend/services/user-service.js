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


// function checkLogin(userCredentials) {

// }

module.exports = {
    // checkLogin,
    getUsers,
    getById
}



