import { useEffect, useState } from "react";
import axios from "axios";
import './Community.css'
import thumbsUp from "../img/like_heart.png";
import comment from '../img/comment.png'
import thumbsDoun from '../img/thumbsDoun.png'
import Modal from "./Modal";
import StarRating from "./StarRating";


const Community = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [commentInputs, setCommentInputs] = useState({});
    const [sortOption, setSortOption] = useState('createdAt');

    const [showModal, setShowModal] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(null);


    const openModal = async (reviewId) => {
        setSelectedReviewId(reviewId);
        const res = await axios.get(
            `http://3.38.251.85/api/v1/reviews/${reviewId}/comments`);
        setSelectedComments(res.data.reviewComments);

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    // 정렬 옵션 변경 핸들러
    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setPage(0); // 페이지를 초기화
        setReviews([]); // 기존 리뷰 데이터 초기화
        getPageData(0, newSortOption); // 변경된 정렬 옵션으로 데이터 가져오기
    };

    const handleLikeOrHateClick = async (reviewId, preferenceType) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const url = `http://3.38.251.85/api/v1/preferences/reviews/${reviewId}/${preferenceType}`;
            const res = await axios.post(url, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            if (res.status === 200) {
                const selectedReview = reviews.find(review => review.reviewId === reviewId);
                const currentPreference = selectedReview.userPreference;
                const newPreference = currentPreference === preferenceType.toUpperCase() ? 'NONE' : preferenceType.toUpperCase();
                // updateReviewPreferenceOnServer(reviewId, newPreference);
                updateReviewPreference(reviewId, newPreference);
                saveUserActionLocally(reviewId, newPreference);

            }
        } catch (error) {
            console.error(`${preferenceType} 오류`, error);
        }
    };

    const updateReviewPreference = async (reviewId, newPreference) => {
        setReviews(reviews.map(review => {
            if (review.reviewId === reviewId) {
                let newLikeCount = review.likeCount;
                let newHateCount = review.hateCount;

                if (newPreference === 'LIKE') {
                    newLikeCount = review.userPreference === 'HATE' ? review.likeCount + 1 : (review.userPreference === 'LIKE' ? review.likeCount - 1 : review.likeCount + 1);
                    newHateCount = review.userPreference === 'HATE' ? review.hateCount - 1 : review.hateCount;
                } else if (newPreference === 'HATE') {
                    newLikeCount = review.userPreference === 'LIKE' ? review.likeCount - 1 : review.likeCount;
                    newHateCount = review.userPreference === 'LIKE' ? review.hateCount + 1 : (review.userPreference === 'HATE' ? review.hateCount - 1 : review.hateCount + 1);
                } else { // newPreference === 'NONE'
                    newLikeCount = review.userPreference === 'LIKE' ? review.likeCount - 1 : review.likeCount;
                    newHateCount = review.userPreference === 'HATE' ? review.hateCount - 1 : review.hateCount;
                }

                return { ...review, likeCount: newLikeCount, hateCount: newHateCount, userPreference: newPreference };
            }
            return review;
        }));
    };

    const saveUserActionLocally = (reviewId, preferenceType) => {
        //  로컬 저장소에 사용자의 좋아요/싫어요 액션을 저장하는 로직
        const actions = JSON.parse(localStorage.getItem('userActions')) || [];
        actions.push({ reviewId, preferenceType });
        localStorage.setItem('userActions', JSON.stringify(actions));
    };


    useEffect(() => {
        console.log({ page, totalPage })
        if (page < totalPage) {
            getPageData(page)

        } else {
            // getPageData(page)
        }
    }, [page])

    useEffect(() => {
        axios.get('http://3.38.251.85/api/v1/community/reviews', {
            headers:
            {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {
            if (res.status == 200) {
                setTotalPage(res.data.pageInfo.totalSize / 5)
            }
        }).catch((err) => {
        })
        getPageData()
    }, [])

    const handleScroll = () => {
        // 스크롤 위치 계산
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 스크롤이 페이지 하단에 도달
        if (scrollTop + windowHeight >= documentHeight * 0.8) {
            // setTimeout을 사용하여 1초 후에 setPage를 호출
            window.removeEventListener('scroll', handleScroll);
            setPage(prevState => prevState + 1);
        }
    };

    const getPageData = (page, sort = sortOption) => {
        setIsLoading(true);
        axios.get('http://3.38.251.85/api/v1/community/reviews', {
            params: {
                size: 5,
                page: page,
                sort: sort
            }
        }).then((res) => {
            if (res.status == 200) {
                if (totalPage === 0)
                    setTotalPage(res.data.pageInfo.totalPages)
                const newData = res.data.reviews;
                console.log(res.data.reviews);
                setReviews(prevData => [...prevData, ...newData])

            }
        }).catch((err) => {
            // console.log(err)
            console.log("error here")
        }).finally(() => {

            window.addEventListener('scroll', handleScroll);
            setIsLoading(false); // 로딩 종료
        });
    }

    // 댓글 입력 처리
    const handleCommentChange = (reviewId, value) => {
        setCommentInputs(prev => ({ ...prev, [reviewId]: value }));

    }

    const submitComment = async (reviewId) => {
        if (!newComment.trim()) {
            console.log("Comment is empty");
            return; // 빈 댓글은 제출하지 않음
        }

        try {
            const res = await
                axios.post(`http://3.38.251.85/api/v1/reviews/${selectedReviewId}/comments`,
                    newComment
                    , {
                        headers:
                        {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    });
            if (res.status === 200) {
                console.log("Comment posted successfully");
                setNewComment("");

                //댓글 목록 다시 불러오기
                axios.get(`http://3.38.251.85/api/v1/reviews/${selectedReviewId}/comments`).then((res) => {

                    // res.data.reviewComments
                    setSelectedComments(res.data.reviewComments);

                }).catch((err) => {

                })
            }
        } catch (error) {
            console.error("Error posting comment", error);
        }
        handleCommentChange(reviewId, "");
    }


    return (
        <div className="community">
            <h1>Community</h1>
            <div className="reviews">
                <div>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="createdAt">최신순</option>
                        <option value="likeCount">좋아요 많은 순</option>
                    </select>
                </div>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review">
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
                                <div className="review-rating">
                                    <StarRating rating={review.reviewRating} />
                                </div>
                            </div>
                            <div className="community-review-body" style={{ justifyContent: 'center' }}>
                                <div className="community-image-slider" style={{ justifyContent: 'center' }}>
                                    {review.imageUrls && review.imageUrls.length > 0 ?
                                        <div style={{ display: 'flex' }}>
                                            {review.imageUrls.map((item, idx) => (
                                                <img
                                                    style={{ display: idx < 4 ? 'block' : 'none' }}
                                                    key={idx}
                                                    src={item}
                                                    alt={`Review Image ${index}`}
                                                    className="community-review-image" />
                                            ))}
                                        </div>
                                        : <p></p>}
                                </div>
                            </div>
                            <div>{review.content}</div>
                            <div>
                                <div className="review-count" style={{ display: 'flex' }}>
                                    <div><img src={thumbsUp}
                                        alt="Thumbs up"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handleLikeOrHateClick(review.reviewId, 'like')} />
                                        <span>{review.likeCount}</span>
                                    </div>
                                    <div className="review-hate">
                                        <img src={thumbsDoun}
                                            alt="Thumbs doun"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleLikeOrHateClick(review.reviewId, 'hate')} />
                                        <span>{review.hateCount}</span>
                                    </div>

                                    <div className="comment-button">
                                        <img src={comment}
                                            onClick={() => openModal(review.reviewId)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews found</p>
                )}
            </div>
            <Modal
                show={showModal}
                onClose={closeModal}
                comments={selectedComments}
                submitComment={submitComment}
                newComment={newComment}
                setNewComment={setNewComment} />
        </div>
    )
}
export default Community;