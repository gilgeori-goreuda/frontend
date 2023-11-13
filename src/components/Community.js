import {useEffect, useState} from "react";
import axios from "axios";
import Center from "./Center";
import './Community.css'

const Community = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/community/reviews', {
        }).then((res) => {
            if (res.status == 200) {
                setTotalPage(res.data.pageInfo.totalSize / 5)


            }
        }).catch((err) => {
        })
        getPageData()
    },[])

    useEffect(()=>{
        console.log({page, totalPage})
        if( page < totalPage ){
            getPageData(page)

        }else{
            // getPageData(page)
        }
    },[page])

    const handleScroll =  () => {
        // 스크롤 위치 계산
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 스크롤이 페이지 하단에 도달
        if (scrollTop + windowHeight >= documentHeight * 0.8) {
            // setTimeout을 사용하여 1초 후에 setPage를 호출
            window.removeEventListener('scroll', handleScroll);
            setPage(prevState => prevState +1);
        }
    };

    const getPageData = (page)=>{
        setIsLoading(true);
        axios.get('http://localhost:8080/api/v1/community/reviews', {
            params: {
                size: 5,
                page: page
            }
        }).then((res) => {
            if (res.status == 200) {
                if(totalPage===0)
                    setTotalPage(res.data.pageInfo.totalPages)
                const newData = res.data.reviews;
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

    return (
        <Center>
            <div className="community">
                <h1>Community</h1>
                <div className="reviews">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={review.reviewId+ review.memberId} className="review">
                                {/*<img src={review.profilePicture} alt="User" className="user-profile-picture"/>*/}
                                {/*<div className="user-name">{review.nickname}</div>*/}
                                {/*<h2>{review.title}/!*<span>{index}</span>*!/</h2>*/}
                                <div className="review-content">
                                    {review.imageUrls && review.imageUrls.length > 0 ?
                                        <div className="image-slider">
                                            <div style={{display : 'flex'}}>
                                                {review.imageUrls.map((item, idx) => (
                                                        <img
                                                            style={{display : idx < 4 ? 'block' : 'none'}}
                                                            key={review.reviewId+" "+idx}
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