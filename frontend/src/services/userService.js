export default {
    getById,

}

const USER_URL = 

function getById(toyId) {
    console.log(`${USER_URL}/:${USERId}`)
    return axios.get(`${USER_URL}/${USERId}`)
        .then(res => {
            console.log('query toy (ToyService)',res.data);
            return res.data
        })
}