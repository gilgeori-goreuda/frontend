import axios from 'axios'

export const ApiNoToken = async (url, method, data) => {
    const body = await axios({
        url, method, data
    })
    return body.data
}

export const Api = async (url, method, data) => {
    const token = localStorage.getItem('accessToken')
    const body = await axios({
        url, method, data,
        headers: { "Authorization": `Bearer ${token}` }
    })
    return body.data
}


axios.defaults.baseURL = 'http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080';
// axios.defaults.baseURL = 'http://192.168.0.8:8080';