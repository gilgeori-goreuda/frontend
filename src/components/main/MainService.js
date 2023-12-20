import axios from 'axios';

const API_BASE_URL = 'https://gilgeorigoreuda.store/api/v1/home';
const MainService = {
    getNewPlace: () => {
        return axios.get(`${API_BASE_URL}/newplace`);
    },
    getHotPlace: () => {
        return axios.get(`${API_BASE_URL}/hotplace`)
    }

}

export default MainService;