import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Review from "../Review";
import {Api} from "../../common/api/ApiSearch";
import './StoreDetail.css'
import storeImage from './storeImg/fishBread.jpeg'
const StoreDetail = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    // const storeId = 1;
    const memberId = 1;
    const param = useParams();
    useEffect(() => {
        console.log(param)
        const fetchData = async () => {
            try {
                const storeResponse = await Api(`/api/v1/stores/`
                    + `${param.storeId}?lat=37.123123&lng=127.123123`
                    , "GET"
                );
                setStore(storeResponse);
            } catch (error) {
                console.log(error.response?.data);
            }
        };
        if (param.storeId)
            fetchData();
    }, [param]);
    const StoreImage = ({imageUrl}) => {
        const defaultImageUrl = storeImage;
        const backgroundImageUrl = imageUrl || defaultImageUrl;
        return (
            <div
                className="store-image"
                style={{backgroundImage: `url(${backgroundImageUrl})`, height: '200px'}}>
            </div>
        );
    };
    const StoreInfo = ({name, categories, reviewCount, rating}) => (
        <div className="store-info">
            <h1>{name}</h1>
            <div className="review-and-rating">
                <div className="review-count">
                    제보자: {store.owner && store.owner.nickname}
                </div>
            </div>
            <div style={{ margin: '30px' }}></div>
            <div className="review-and-rating">
                <div>
                    카테고리: {store.storeType}
                </div>
                <div className="review-count">
                    리뷰: {reviewCount}
                </div>
                <div className="rating">
                    평점: {rating}
                </div>
            </div>
        </div>
    );
    const StoreDetails = ({address, openingHours}) => (
        <div className="store-details">
            <h3 >상세정보</h3>
            <div style={{ margin: '30px' }}></div>
            <div>주소: {address}</div>
            <div style={{ margin: '30px' }}></div>
            <div>영업시간: {openingHours}</div>
            <div style={{ margin: '30px' }}></div>
        </div>
    );
    return (
        <div className="App">
            <div className="container">
                <StoreImage imageUrl={store.imageUrl}/>
                <StoreInfo
                    name={store.name}
                    categories={store.foodCategories || []}
                    reviewCount={store.totalVisitCount}
                    rating={store.averageRating}
                />
                <StoreDetails
                    address={store.streetAddress}
                    openingHours={store.openTime + ' - ' + store.closeTime}
                />
                <ul>
                    <li>{store.businessDates}</li>
                    <li>{store.createdAt}</li>
                    <li>{store.detailLocation}</li>
                    <li>{store.foodCategories && store.foodCategories.join(', ')}</li>
                    <li>{store.lastModifiedMemberNickname}</li>
                    <li>{store.lat}</li>
                    <li>{store.lng}</li>
                    <li>{store.owner && store.owner.nickname}</li>
                    <li>{store.purchaseType}</li>
                    <li>{store.totalVisitCount}</li>
                </ul>
            </div>
            <Review storeId={param.storeId}/>
        </div>
    );
};
export default StoreDetail;