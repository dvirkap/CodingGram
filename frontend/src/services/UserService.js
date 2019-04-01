import Axios from "axios";

export default {
query,
login,
signup,
logout,
getLoggedInUser,
getById,
remove,
checkLoggedInUser
}

const axios = Axios.create({
    withCredentials: true
})

const _URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : 'http://localhost:3000';
var users = [];


async function checkLoggedInUser() {
    var user = JSON.parse(localStorage.getItem('loggedInUser'))
    if(user) {
        var userCredentials = {
            userName: user.userName,
            password: user.password
          }
        login(userCredentials)
     return user;
    } else return null
    // return  JSON.parse(localStorage.getItem('loggedInUser'))
    // var user = await axios.post(`${_URL}/login`)
    // return loggedInUser
}

async function query() {
var loadedUsers = await axios.get(`${_URL}/user`)
users = loadedUsers
return users
}   

async function login(userCredentials) {
    
    var loggedInUser = await axios.post(`${_URL}/login`, userCredentials)
    console.log(loggedInUser.data,'in serviceee');
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser.data))
        // localStorage.setItem('loggedInUser', loggedInUser.data)
        // return  JSON.parse(localStorage.getItem('loggedInUser'))
    return loggedInUser.data
}

// async function signup(newUserCredentials) {
//     var user = await axios.post(`${_URL}/signup`, newUserCredentials)

//     return user
// }

function signup(newUserCredentials) {
    return axios.post(`${_URL}/signup`, newUserCredentials).then(res=> {
        localStorage.setItem('loggedInUser', JSON.stringify(res.data))
        return res.data
    })
}

async function logout() {
    localStorage.removeItem('loggedInUser')
    var userLoggedOut = await axios.post(`${_URL}/logout`)
    // localStorage.removeItem('loggedInUser')
    console.log('LOG OUT');
    
    // loggedInUser = null
}

function getLoggedInUser() {
    return  JSON.parse(localStorage.getItem('loggedInUser'))
    // loggedInUser = localStorage.getItem('loggedInUser')
    // return loggedInUser;
}
 
async function getById(userId) {
    console.log(userId);
var user = await axios.get(`${_URL}/user/${userId}`)
// var user = await axios.get(`api/user/${userId}`)
// console.log('USER:::::::', user.data);

return user.data
}

async function remove(userId) {
    var userDeleted = await axios.delete(`${_URL}/user/${userId}`)
    const idx = users.findIndex(user => user._id === userId);
    if (idx !== -1) users.splice(idx, 1);
    return userDeleted
}