import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Review from "../Review";
import {Api} from "../../common/api/ApiSearch";
import './StoreDetail.css'
import storeImage from './storeImg/fishBread.jpeg'

const StoreDetail = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");
    const param = useParams();
    const storeId = param.storeId; // 스토어 ID 얻기

    useEffect(() => {
        console.log("Current storeId:", storeId);
    }, [storeId]);

    const translateDay = (day) => {
        const days = {
            sunday: "일",
            monday: "월",
            tuesday: "화",
            wednesday: "수",
            thursday: "목",
            friday: "금",
            saturday: "토"
        };
        return days[day.toLowerCase()] || day;
    };
    const getKoreanDays = (daysString) => {
        return daysString.split(',').map(day => translateDay(day.trim())).join(', ');
    };

    const translateStoreType = (storeType) => {
        const types = {
            FOOD_TRUCK: "푸드트럭",
            FOOD_STALL: "포장마차"
        };
        return types[storeType] || storeType;
    };

    const translatePurchaseType = (purchaseType) => {
        const types = {
            CARD: "카드",
            CASH: "현금",
            ACCOUNT_TRANSFER: "계좌이체"
        };
        return types[purchaseType] || purchaseType;
    };

    useEffect(() => {
        console.log(param)
        const fetchData = async () => {
            try {
                const storeResponse = await Api(`/api/v1/stores/`
                    + `${param.storeId}?lat=37.123123&lng=127.123123`
                    , "GET"
                );
                setStore(storeResponse);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setMsg(error.response.data.message)
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
            <div className="store-data-sort">
                <div className="review-count">
                    <h4>제보자: {store.owner && store.owner.nickname}</h4>
                </div>
            </div>
            <div style={{margin: '15px'}}></div>
            <div className="store-data-sort">
                <div>
                    카테고리: {translateStoreType(store.storeType)}
                </div>
            </div>
            <div style={{margin: '30px'}}></div>
            <div className="store-data-sort">
                <div className="review-count">
                    리뷰: {reviewCount}
                </div>
                <div className="rating">
                    평점: {rating}
                </div>
                <div className="review-count">
                    방문일: {store.totalVisitCount}
                </div>
            </div>
            <div style={{margin: '20px'}}></div>
        </div>
    );
    const StoreDetails = ({address, openingHours}) => (
        <div className="store-details">
            <h3>상세정보</h3>
            <div style={{margin: '20px'}}></div>
            <div>주소 : {address}</div>
            <div style={{margin: '20px'}}></div>
            <div>영업시간 : {openingHours}</div>
            <div style={{margin: '20px'}}></div>
            <div>영업일 : {getKoreanDays(store.businessDates)}</div>
            <div style={{margin: '20px'}}></div>
            <div>결제방식 : {translatePurchaseType(store.purchaseType)}</div>
            <div style={{margin: '20px'}}></div>
        </div>
    );

    const MenuComponent = ({categories}) => {
        if (!categories || categories.length === 0) {
            return <div className='menu-box'>
                <p style={{textAlign: "center"}}>메뉴 정보가 없습니다.</p>
            </div>;
        }

        return (
            <div className='menu-box'>
                    <h3> 메 뉴 </h3>
                <div className="menu-items">
                    {categories.map((category, index) => (
                        <div key={index}> {category}</div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            <div className="container">
                {loading && <h1>로딩중</h1>}
                {msg && <h1>{msg}</h1>}{!msg && !loading && <>
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

                <MenuComponent
                    categories={store.foodCategories}
                />
                <Review storeId={param.storeId}/></>}</div>
        </div>
    );
};
export default StoreDetail;