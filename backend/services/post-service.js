const mongoService = require('./mongo-service')

const objectId = require('mongodb').objectId;

function query() {
    console.log('post-service query:', query);
    return mongoService.connect()
    .then(db => db.collection('posts').find({})
    .toArray())
}

module.exports = {
    query
}