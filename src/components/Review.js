import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Center from "./Center";
import './Review.css';
import starFilled from '../img/star_filled2.png';
import starEmpty from '../img/Star-empty.png';
import thumbsUp from '../img/thumbs_up.png';

import './Community.css'
import ReviewService from "./ReviewService";

const Review = () => {
    const nav = useNavigate();
    const [reviews, setreviews] = useState([])


    const storeId = 1;


    useEffect(() => {
        const fetchreviews = async () => {
            try {
                const res = await ReviewService.getReviewsByStoreId(storeId);

                setreviews(res.data.reviews);
                console.log(res.data.reviews)

            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
            }
        };

        fetchreviews();
    }, [storeId]);

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

    return (
        <div className="App">
            <Center>
                <div>
                    <h1>리뷰</h1>
                </div>
                <div className="button_container">
                    <button onClick={ReviewInsert} className="insertButton">리뷰 쓰기</button>
                </div>
                <div className="reviews">
                    {Array.isArray(reviews) && reviews.map((review, index) => (
                    <div key={review.reviewId + review.memberId} className="review">
                        <div className="review-header">
                            <div key={review.member.memberId}>
                                <div>
                                    <img src={review.member.profileImageUrl} alt="Profile Image"/>
                                </div>
                            </div>
                            <div key={review.member.memberId}>
                                <div>
                                    <p>{review.member.nickname}</p>
                                </div>
                            </div>
                            <div className="review-rating">
                                <StarRating rating={review.reviewRating} />
                            </div>
                        </div>
                        <div className="review-body">
                            {review.imageUrls && review.imageUrls.map((imageUrl, idx) => (
                                <img key={idx} src={imageUrl} alt={`Review Image ${idx}`} />
                            ))}
                            <div>{review.content}</div>
                        </div>
                        <div className="review-content">
                            <div className="review-count" style={{ display: 'flex' }}>
                                <img src={thumbsUp} alt="Thumbs up" style={{ marginRight: '10px' }} />
                                <span>{review.likeCount}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

            </Center>
        </div>
    );
};

export default Review;