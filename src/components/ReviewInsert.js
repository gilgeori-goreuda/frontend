import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import './ReviewInsert.css'
import { useNavigate } from "react-router-dom";
import uploadPhoto from '../img/uploadPhoto.png'
import {Api} from "../common/api/ApiSearch";

const ReviewInsert = () => {
    const nav = useNavigate();
    const [reviewRating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const uploadImages = async (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        try {
            const res = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data.imageNames;
        } catch (error) {
            console.error('Image upload error', error);
            return [];
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).slice(0, 5);
        setSelectedFiles(files); // 파일 상태 업데이트

        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // 이미지 업로드 후 URL 받기
        const imageUrls = await uploadImages(Array.from(selectedFiles));

        const baseImageUrl = "https://dz68kixxhuu4k.cloudfront.net/";
        const newImageUrls = imageUrls.map(filename => baseImageUrl + filename);


        const storeId = 1; // 예시 스토어 아이디

        // 리뷰 데이터 준비
        const reviewData = {
            reviewRating: reviewRating,
            content: reviewContent,
            imageUrls: newImageUrls  // 이미지 URL 포함
        };

        try {
            const res = await Api(`/api/v1/reviews/stores/`
                + `${storeId}`
                , "POST",
                reviewData
            );
            console.log(res.data);
                setRating(0);
                setReviewContent('');
                setSelectedFiles([]);
                nav('/review')
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    return (<div className='reviewInsert-header'>
        <div className="reviewInsert-box">
            <form onSubmit={handleSubmit}>
                <div className="rating">
                    <div style={{ paddingRight: '0', margin: '0 auto' }}></div>
                    <div style={{ margin: '10px' }}>
                        <div><h1>리뷰</h1></div>
                    </div>
                    <div style={{ margin: '30px' }}></div>
                    <div style={{ margin: '10px' }}>
                        <h5>사진추가</h5>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileChange} />
                        <label
                            htmlFor="fileInput">
                            <img
                                src={uploadPhoto}
                                style={{ width: '80px', height: '80px' }}
                            />
                        </label>
                    </div>
                    <div className="image-preview">
                        {previewImages.map((image, index) => (
                            <img key={index} src={image} alt="Preview" />
                        ))}
                    </div>

                    <div style={{ margin: '30px' }}></div>
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
                                <FontAwesomeIcon icon={index <= reviewRating ? fasStar : farStar} />
                            </button>
                        );
                    })}
                </div>
                <div style={{ margin: '30px' }}></div>
                <div> 가게를 방문한 후기를 남겨주세요 💕</div>
                <div>
                    <textarea
                        rows="16"
                        style={{ width: '100%' }}
                        placeholder="리뷰를 입력하세요"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </div>
                <div className="riveiwInsert-button-container">
                    <button type="submit" class="reviewInsert-custom-button">리뷰 남기기 ❤️</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ReviewInsert;