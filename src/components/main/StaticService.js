import axios from 'axios';

const API_BASE_URL = 'https://gilgeorigoreuda.store/api/v1/hotplaces';
const StaticService = {
    getTop10Place: () => {
        return axios.get(`${API_BASE_URL}`);
    }
}

export default StaticService;