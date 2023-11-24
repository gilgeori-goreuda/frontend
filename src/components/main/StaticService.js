import axios from 'axios';

const API_BASE_URL = 'http://15.164.97.112/api/v1/hotplaces';
const StaticService = {
    getTop10Place:() => {
        return axios.get(`${API_BASE_URL}`);
    }
}

export default StaticService;