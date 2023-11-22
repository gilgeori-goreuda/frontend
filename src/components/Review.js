
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Review.css';
import starFilled from '../img/star_filled2.png';
import starEmpty from '../img/Star-empty.png';
import thumbsUp from '../img/thumbs_up.png';
import seeMore from '../img/see_more.png'

import './Community.css'
import ReviewService from "./ReviewService";

const Review = () => {
    const nav = useNavigate();
    const [reviews, setReviews] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const storeId = 1;

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                const res = await ReviewService.getReviewsByStoreId(storeId, currentPage, 5); // 페이지 당 5개의 리뷰 요청
                if (currentPage === 0) {
                    setReviews(res.data.reviews); // 첫 페이지인 경우 리뷰 배열을 초기화
                } else {
                    setReviews(prev => [...prev, ...res.data.reviews]); // 추가 페이지인 경우 리뷰 배열에 추가
                }
                setTotalPages(res.data.pageInfo.totalPages);

            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [currentPage]);

    const handleLoadMore = () => {
        setCurrentPage(prev => prev + 1);
    };

    const showLoadMoreButton = currentPage < totalPages;

    const StarRating = ({ rating }) => {
        const totalStars = 5;
        let stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(<img key={i} src={starFilled} alt={`Star ${i}`} />);
            } else {
                stars.push(<img key={i} src={starEmpty} alt={`Star ${i}`} />);
            }
        }
        return <div>{stars}</div>;
    };

    const ReviewInsert = () => {
        nav(`/reviewInsert?`)
    }

    return (<div className='review-bodyBox'>
        <div>
            <h1>리뷰</h1>
        </div>
        <div className="button_container">
            <button onClick={ReviewInsert} className="insertButton">✏️ 리뷰 쓰기</button>
        </div>
        <div className="reviews">
            {Array.isArray(reviews) && reviews.map((review, index) => (
                <div key={review.reviewId + review.memberId} className="review">
                    <div className="review-header">
                        <div key={review.member.memberId}>
                            <div>
                                <img src={review.member.profileImageUrl} alt="Profile Image" />
                            </div>
                        </div>
                        <div key={review.member.memberId}>
                            <div>
                                <p>{review.member.nickname}</p>
                            </div>
                        </div>
                        <div className="review-content">
                            <div className="review-count" style={{ display: 'flex' }}>
                                <img src={thumbsUp} alt="Thumbs up" style={{ marginRight: '10px' }} />
                                <span>{review.likeCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-body">
                        <div className="review-image-content">
                            <div className="ireview-image-slider">
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {review.imageUrls && review.imageUrls.map((imageUrl, idx) => (
                                        <img
                                            key={idx}
                                            src={imageUrl}
                                            alt={`Review Image ${idx}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {review.content}
                        </div>
                    </div>
                </div >
            ))}
        </div >
        {showLoadMoreButton && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    disabled={isLoading}
                    src={seeMore}
                    onClick={handleLoadMore}
                    style={{ width: '25px', height: '25px' }} ></img>
            </div>
        )}
    </div >
    );
};

export default Review;