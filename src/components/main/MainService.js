import axios from 'axios';

const API_BASE_URL = 'http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/home';
const MainService = {
    getNewPlace:() => {
        return axios.get(`${API_BASE_URL}/newplace`);
    },
    getHotPlace:() => {
        return axios.get(`${API_BASE_URL}/hotplace`)
    }

}

export default MainService;