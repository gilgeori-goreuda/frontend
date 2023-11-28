import axios from 'axios';

const API_BASE_URL = 'http://3.38.251.85/api/v1/reviews';

const ReviewService = {
    getReviewsByStoreId: (storeId, currentPage, pageSize = 5) => {
        return axios.get(`${API_BASE_URL}/stores/${storeId}`, {
            params: {
                page: currentPage,
                size: pageSize
            }
        });
    },
    getImageUrlsByResourceId: (reviewId) => {
        return axios.get(`${API_BASE_URL}/${reviewId}/images`);
    }
};

export default ReviewService;
