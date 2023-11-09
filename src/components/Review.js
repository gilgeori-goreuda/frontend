import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Center from "./Center";
import './Review.css';

const Review = () => {
    const nav = useNavigate();
    const [review, setReview] = useState()

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/review').then((res) => {
            setReview(res.data.content)
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    const ReviewInsert = () => {
        nav(`/reviewInsert?`)
    }


    return (
        <div className="App">
            <Center>
                <div>

                    <div>
                        <h1>사진</h1>
                    </div>
                </div>
                <div>
                    <h1>리뷰</h1>
                </div>
                <div className="button_container">
                    <button onClick={ReviewInsert} className="insertButton">후기 남기기</button>
                </div>
            </Center>
        </div>
    );
};

export default Review;