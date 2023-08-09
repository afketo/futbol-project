import axios from 'axios'
const baseUrl = '/api/players'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}
const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (newObject) => {
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

export default { getAll, create, update, setToken }