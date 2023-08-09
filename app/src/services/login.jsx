import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginObject) => {
    const { data } = await axios.post(baseUrl, loginObject)
    // return req.then(res => res.data)
    return data
}

export default { login }