import axios from 'axios'
const baseUrl = '/api/players'

// let token = null

// const setToken = newToken => {
//     token = `Bearer ${newToken}`
// }


const getAll = (token) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const req = axios.get(baseUrl, config)
    return req.then(res => (res.data))
}

const getPlayer = (id, token) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const req = axios.get(`${baseUrl}/${id}`, config)
    return req.then(res => res.data)
}

const create = (newObject, token) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const req = axios.post(baseUrl, newObject, config)
    return req.then(res => res.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

export default { getAll, create, update, getPlayer }