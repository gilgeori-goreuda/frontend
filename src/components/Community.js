import {useEffect, useState} from "react";
import axios from "axios";
import Center from "./Center";

const Community = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/community/reviews').then((res) => {
            if (res.status == 200) {
                setReviews(res.data.reviews);

            }
        }).catch((err) => {
            console.log(err)
        })

        window.addEventListener('scroll', handleScroll);

        return () => {
            // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handleScroll = () => {
        // 스크롤 위치 계산
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 스크롤이 페이지 하단에 도달
        if (scrollTop + windowHeight + 1 >= documentHeight) {
            setPage(page + 1);

            setTimeout(() => {

                axios.get('http://localhost:8080/api/v1/community/reviews', {
                    params: {
                        size: 5,
                        page: page
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        const newData = res.data.reviews;
                        setReviews(prevData => [...prevData, ...newData])
                    }
                }).catch((err) => {
                    console.log(err)
                })

            }, 500);


        }

    };

    return (
        <Center>
            <div className="community">
                <h1>Community</h1>
                <div className="reviews">
                    {/* reviews가 존재하고 길이가 0보다 클 때만 map을 사용. */}
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <img src={review.user}/>
                                <h2>{review.title}<span>{index}</span></h2>
                                {/* 이미지 슬라이더 구현 예시 */}
                                {review.images && review.images.length > 0 ? (
                                    <div className="image-slider">
                                        {/* 이미지 슬라이더 구현 로직 */}
                                        {/*<img src={item.imgPath} />*/}
                                    </div>
                                ) : (
                                    <p>No images for this review</p>
                                )}
                                <div>
                                    <p>{review.content}</p>
                                    {/*<p>{review.content}</p>*/}
                                </div>

                            </div>
                        ))
                    ) : (
                        <p>No reviews found</p>
                    )}
                </div>
            </div>
        </Center>
    )
}
export default Community;