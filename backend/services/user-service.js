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

function addUser(newUser) {
    
    var userToAdd = {
            displayName : "yossi", 
            userName : newUser.userName, 
            fullName : "yossi ben yossi", 
            isAdmin : false, 
            password : newUser.password, 
            bio : "Aspiring creative writer. I like spicy food and good people.", 
            phone : "444-555-2222", 
            email : newUser.email, 
            job : "Network Engineer", 
            birthday : "12/11/1986", 
            img : "https://www.designskilz.com/random-users/images/imageM28.jpg", 
            address : "4123 New Street Oakland", 
            createdAt : Date.now() ,
            followers : [], 
            following : [], 
            likedpost: []
        }
        
        console.log(userToAdd);
        return mongoService.connect()
        .then(db => db.collection('users').insertOne(userToAdd))
        .then(res => {
            userToAdd._id = res.insertedId
            return userToAdd
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
    getById,
    addUser
}



