import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const StoreDetail = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    const storeId = 1;
    const memberId = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await axios.get(`http://localhost:8080/api/v1/stores/${storeId}`);
                setStore(storeResponse.data);
                console.log("ㅇㅇ", storeResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [memberId]);

    return (
        <div className="App">
            <div className="container">
                <h1>{store.name ? `${store.name}님!` : ''}</h1>
                <ul>
                    <li>{store.id}</li>
                    <li>{store.averageRating}</li>
                    <li>{store.businessDates}</li>
                    <li>{store.closeTime}</li>
                    <li>{store.createdAt}</li>
                    <li>{store.detailLocation}</li>
                    <li>{store.foodCategories && store.foodCategories.join(', ')}</li>
                    <li>{store.imageUrl}</li>
                    <li>{store.lastModifiedMemberNickname}</li>
                    <li>{store.lat}</li>
                    <li>{store.lng}</li>
                    <li>{store.openTime}</li>
                    <li>{store.owner && store.owner.nickname}</li>
                    <li>{store.purchaseType}</li>
                    <li>{store.storeType}</li>
                    <li>{store.streetAddress}</li>
                    <li>{store.totalVisitCount}</li>
                    <li>{store.distanceFromMember}</li>
                </ul>
            </div>
            <Review/>
        </div>
    );
};

export default StoreDetail;