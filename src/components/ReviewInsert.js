import {useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import './ReviewInsert.css'
import {useNavigate} from "react-router-dom";

const ReviewInsert = () => {
    const nav = useNavigate();
    const [reviewRating, setRating] = useState(0);
    // const [hover, setHover] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // 파일 상태 업데이트
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const storeId = 10; // 예시 스토어 아이디
        const memberId = 1; // 예시 멤버 아이디

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify({
            reviewRating: reviewRating,
            content: reviewContent
        })], {
            type: "application/json"
        }));

        // 선택된 모든 이미지 파일을 formData에 추가
        Array.from(selectedFiles).forEach(file => {
            formData.append('files', file);
        });
        console.log(reviewRating)
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/reviews/stores/${storeId}/members/${memberId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setRating(0);
            setReviewContent('');
            nav('/review')
        } catch (err) {
            // console.error('There was an error!', err);
        }
    }

    return (
        <div className="review-box">
            <form onSubmit={handleSubmit}>
                <div className="rating">
            <div style={{paddingRight: '0', margin: '0 auto'}}></div>
            <div>
                <div><h1>리뷰</h1></div>
            </div>
            <div>
                <div><h3>사진추가</h3></div>
            </div>
            <div>
                <input type="file" multiple onChange={handleFileChange} />
            </div>
            <div style={{margin: '80px'}}></div>
                    <div>평점</div>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= reviewRating ? 'star gold' : 'star'}
                                onClick={() => setRating(index)}
                            >
                                <FontAwesomeIcon icon={index <= reviewRating ? fasStar : farStar}/>
                            </button>
                        );
                    })}
                </div>
                <div style={{margin: '30px'}}></div>
                <div> 가게를 방문한 후기를 남겨주세요 💕</div>
                <div>
                <textarea
                    rows="16"
                    style={{width: '100%'}}
                    placeholder="리뷰를 입력하세요"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                />
                </div>
                <button type="submit">리뷰 남기기</button>
            </form>
        </div>
    )
}

export default ReviewInsert;