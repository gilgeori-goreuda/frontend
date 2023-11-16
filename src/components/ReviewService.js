import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/reviews';
const storeId = 1;
const reviewId = 1;

const ReviewService = {
    getReviewsByStoreId: (storeId) => {
        return axios.get(`${API_BASE_URL}/stores/${storeId}`);
    },
    getImageUrlsByResourceId: (reviewId) => {
        return axios.get(`${API_BASE_URL}/${reviewId}/images`);
    }
};

export default ReviewService;
