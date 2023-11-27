import React, {useEffect, useState} from "react";
import {Api} from "../../common/api/ApiSearch";
import './MyPageReview.css'

const MyPageReviews = () => {
    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api(`/api/v1/members/reviews`, "GET");
                console.log(res.reviews)
                setReviewsList(res.reviews);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="App">
            <div className="reviews-container">
                {/*<h1>{member.nickname ? `${member.nickname}님의 리뷰` : '리뷰 목록'}</h1>*/}
                <ul className="reviews-list">
                    {reviewsList.map((item, index) => (
                        <li key={item.reviewId + " " + index} className="review-item">
                            <p>가게 이름 : {item.storeInfo.storeName}</p>
                            <p>작성한 리뷰 : {item.content}</p>
                            <p>작성 날짜 : {item.createdAt}</p>
                            <p>제 점수는요 : {item.reviewRating}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyPageReviews;
