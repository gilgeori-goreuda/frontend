import axios from 'axios';

const API_BASE_URL = 'http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/reviews';

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
