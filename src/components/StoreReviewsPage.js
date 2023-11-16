import React from 'react';
import ReviewList from '../components/ReviewList';

const StoreReviewsPage = () => {
  // 가정: storeId는 상위 컴포넌트나 Context API, Redux 등으로부터 받아온다
  const storeId = 1;

  return (
    <div>
      <h1>Store Reviews</h1>
      <ReviewList storeId={storeId} />
    </div>
  );
};

export default StoreReviewsPage;
