import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MyPageReviews = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState({
        memberId: 1, nickname: '하나'
    });
    const [reviewsList, setReviewsList] = useState([]);

    const storeId = 10;
    const memberId = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await axios.get(`http://localhost:8080/api/v1/members/${memberId}/reviews`);
                setReviewsList(reviewResponse.data.reviews);
                console.log("ㅇㅇ", reviewResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [memberId]);

    const handleGoBack = () => {
        navigate('/myPage');
    };

    return (
        <div className="App">
            <div className="container">
                <h1>{member.nickname ? `${member.nickname}님!` : ''}</h1>
                <ul>
                    <li>{member.memberId}</li>
                </ul>
                <div>
                    <h1>리뷰 목록</h1>
                    <ul>
                        {reviewsList.map((item, index) => (
                            <li key={item.reviewId + " " + index}>
                                <div>
                                    <p>가게 이름: {item.storeInfo.storeName}</p>
                                    <p>작성한 리뷰: {item.content}</p>
                                    <p>작성 날짜: {item.createdAt}</p>
                                    <p>좋아요: {item.likeCount}</p>
                                    <p>싫어요: {item.hateCount}</p>
                                    <p>{item.imageUrl}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="button_container">
                    <button onClick={handleGoBack} className="goBackButton">
                        <span className="goBackIcon">&lt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPageReviews;
