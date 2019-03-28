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
    console.log(newUser,'in routes service')

    
    var userToAdd = {
            displayName : "", 
            userName : newUser.userName, 
            fullName : "", 
            isAdmin : false, 
            password : newUser.password, 
            bio : "Aspiring creative writer. I like spicy food and good people.", 
            phone : "444-555-2222", 
            email : newUser.email, 
            job : "Network Engineer", 
            birthday : "12/11/1986", 
            img : "https://www.designskilz.com/random-users/images/imageM27.jpg", 
            address : "4123 New Street Oakland", 
            createdAt : Date.now() ,
            followers : [], 
            following : [], 
            likedpost: []
        }
        return mongoService.connect()
        .then(db => db.collection('users').insertOne(userToAdd))
        .then(res => {
            console.log(res,'resssssss')
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
                return Promise.reject(new Error("bad username or password"))
            }
        })
}

module.exports = {
    checkLogin,
    getUsers,
    getById,
    addUser,
    // update
}



