import {useEffect, useState} from "react";
import axios from "axios";
import Center from "./Center";
import './Community.css'
import thumbsUp from "../img/like_heart.png";
import comment from '../img/comment.png'
import close from '../img/close.png'
import './Modal.css'
import Modal from "./Modal";



const Community = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentInputs, setCommentInputs] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    const openModal = async (reviewId) => {
        setSelectedReviewId(reviewId);
        const res = await axios.get(`http://localhost:8080/api/v1/reviews/${reviewId}/comments`);
        setSelectedComments(res.data.reviewComments);

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/community/reviews', {}).then((res) => {
            if (res.status == 200) {
                setTotalPage(res.data.pageInfo.totalSize / 5)
            }
        }).catch((err) => {
        })
        getPageData()
    }, [])

    useEffect(() => {
        console.log({page, totalPage})
        if (page < totalPage) {
            getPageData(page)

        } else {
            // getPageData(page)
        }
    }, [page])

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/community/reviews', {}).then((res) => {
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

    const getPageData = (page) => {
        setIsLoading(true);
        axios.get('http://localhost:8080/api/v1/community/reviews', {
            params: {
                size: 5,
                page: page
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
        setCommentInputs(prev => ({...prev, [reviewId]: value}));

    }

    const submitComment = async (reviewId) => {
        if (!newComment.trim()) {
            console.log("Comment is empty");
            return; // 빈 댓글은 제출하지 않음
        }

        try {
            const memberId = 1;  // 예시 memberId, 실제로는 로그인한 사용자의 ID를 사용
            const res = await
                axios.post(`http://localhost:8080/api/v1/reviews/${selectedReviewId}/members/${memberId}/comments`,
                    newComment
                    , {
                        headers:
                            {"Content-Type": "application/json;charset=utf-8"}
                    });
            if (res.status === 200) {
                console.log("Comment posted successfully");
                setNewComment("");
                fetchComments(selectedReviewId); //댓글 목록 다시 불러오기
            }
        } catch (error) {
            console.error("Error posting comment", error);
        }
        handleCommentChange(reviewId, "");
    }

    // 댓글 데이터를 불러오는 함수
    const fetchComments = async (reviewId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/reviews/${reviewId}/comments`);
            console.log(res.data)
            if (res.status === 200) {

                setComments(prev => ({...prev, [reviewId]: res.data.reviewComments}));
            }
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

// 각 리뷰에 대한 댓글 불러오기
    useEffect(() => {
        reviews.forEach(review => {
            fetchComments(review.reviewId);
        });
    }, [reviews]);

    return (
        <Center>
            <div className="community">
                <h1>Community</h1>
                <div className="reviews">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
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
                                </div>
                                <div className="review-body">
                                    <div className="review-content">
                                        {review.imageUrls && review.imageUrls.length > 0 ?
                                            <div className="image-slider">
                                                <div style={{display: 'flex'}}>
                                                    {review.imageUrls.map((item, idx) => (
                                                        <img
                                                            style={{display: idx < 4 ? 'block' : 'none'}}
                                                            key={idx}
                                                            src={item}
                                                            alt={`Review Image ${index}`}
                                                            className="review-image"/>
                                                    ))}
                                                </div>
                                            </div>
                                            : <p></p>}
                                        <p>{review.content}</p>
                                    </div>

                                </div>
                                <div className="review-content">
                                    <div className="review-count" style={{display: 'flex'}}>
                                        <img src={thumbsUp} alt="Thumbs up" style={{marginRight: '10px'}}/>
                                        <span>{review.likeCount}</span>

                                        <div className="comment-button">
                                            <img src={comment}
                                                 onClick={() => openModal(review.reviewId)}
                                                 View Comments/>
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
                    setNewComment={setNewComment}/>
            </div>
        </Center>
    )
}
export default Community;