import axios from "axios";

export default {
query,
login,
signup,
logout,
getLoggedInUser,
getById,
remove
}
const _URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : 'http://localhost:3000';
var users = [];
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

async function query() {
var loadedUsers = await axios.get(`${_URL}/user`)
users = loadedUsers
return users
}   

async function login(userCredentials) {
    console.log(userCredentials);
    
    var loggedInUser = await axios.post(`${_URL}/login`, userCredentials)
    console.log('loggedInUser::::::', loggedInUser.data);
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    return loggedInUser
}

async function signup(newUserCredentials) {
    var user = await axios.post(`${_URL}/signup`, newUserCredentials)
    return user
}

async function logout() {
    var userLoggedOut = await axios.get(`${_URL}/logout`)
    localStorage.removeItem('loggedInUser')
    loggedInUser = null
}

function getLoggedInUser() {
    return loggedInUser;
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