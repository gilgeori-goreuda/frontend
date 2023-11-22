import axios from 'axios'

export const ApiNoToken = async (url, method, data) => {
    const body = await axios({
        url, method, data
    })
    return body.data
}

export const Api = async (url, method, data) => {
    const token = localStorage.getItem('token')
    const body = await axios({
        url, method, data,
        headers: { "Authorization": `Bearer ${token}` }
    })
    return body.data
}


axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.baseURL = 'http://192.168.0.8:8080';