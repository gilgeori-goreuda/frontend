import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const StoreCreate = () => {
    const navigate = useNavigate();

    const [store, setStore] = useState({
        name: "",
        storeType: "",
        businessDates: "",
        openTime: "",
        closeTime: "",
        purchaseType: "현금, 카드, 계좌이체",
        // imageUrl: "",
        lat: 90.2121,
        lng: 74.6262,
        streetAddress: "서울특별시 서초구 서초3동",
        foodCategories: {
            foodCategories: []
        }
    });

    const categories = ["붕어빵", "호떡", "타코야끼", "계란빵", "떡볶이", "순대", "오뎅", "와플", "김밥", "꼬치", "땅콩빵", "군고구마", "토스트", "달고나", "군옥수수", "탕후루", "튀김"];
    const daysOfWeek = ["일","월","화","수","목","금","토"];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStore({
            ...store,
            [name]: value,
        });
    };

    const handleStoreTypeChange = (event) => {
        const selectedStoreType = event.target.value;
        setStore({
            ...store,
            storeType: selectedStoreType,
        });
    };

    const handlePaymentMethodChange = (event) => {
        const { value } = event.target;

        setStore((prevStore) => {
            return {
                ...prevStore,
                purchaseType: value,
            };
        });
    };

    const handleBusinessDatesChange = (day) => {
        // 요일을 체크하거나 언체크할 때 호출
        setStore((prevStore) => {
            const isDayIncluded = prevStore.businessDates.includes(day);

            const updatedBusinessDates = isDayIncluded
                ? prevStore.businessDates.split(', ').filter(d => d !== day).join(', ') // 요일이 포함되어 있다면 해당 요일을 제거
                : `${prevStore.businessDates}, ${day}`; // 요일이 포함되어 있지 않다면 추가

            console.log(day);

            return {
                ...prevStore,
                businessDates: updatedBusinessDates,
            };
        });
    };

    const handleOpenTimeChange = (event) => {
        const { name, value } = event.target;
        setStore({
            ...store,
            [name]: value,
        });
    };

    const handleCloseTimeChange = (event) => {
        const { name, value } = event.target;
        setStore({
            ...store,
            [name]: value,
        });
    };

    const handleFoodCategoriesChange = (category) => {
        setStore((prevStore) => {
            const updatedFoodCategories = prevStore.foodCategories.foodCategories.includes(category)
                ? prevStore.foodCategories.foodCategories.filter((cat) => cat !== category)
                : [...prevStore.foodCategories.foodCategories, category];

            return {
                ...prevStore,
                foodCategories: {
                    ...prevStore.foodCategories,
                    foodCategories: updatedFoodCategories,
                },
            };
        });
    };

    const handleSubmit = async () => {
        try {
            // 주소 정보 합치기
            // const fullAddress = `${store.largeAddress} ${store.mediumAddress} ${store.smallAddress}`;
            const fullAddress = "ehesddddddd123";
            const dataToSend = {
                ...store,
                fullAddress: fullAddress,
            };

            const response = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/stores', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Store 등록 성공:", response.data);
            // navigate('/success'); // 예시: 등록 성공 시 success 페이지로 이동
        } catch (error) {
            console.error("Store 등록 실패:", error);
        }
    };

    return (
        <div className="container">
            <h1>가게등록</h1>
            <form>
                <div className="input-group">
                    <label>가게명</label>
                    <input type="text" name="name" value={store.name} onChange={handleInputChange} placeholder="예시: 가게 이름" />
                </div>
                <div className="input-group">
                    <label>가게형태</label>
                    <label>
                        <input
                            type="radio"
                            name="storeType"
                            value="푸드트럭"
                            checked={store.storeType === "푸드트럭"}
                            onChange={handleStoreTypeChange}
                        />
                        푸드트럭
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="storeType"
                            value="포장마차"
                            checked={store.storeType === "포장마차"}
                            onChange={handleStoreTypeChange}
                        />
                        포장마차
                    </label>
                </div>
                <div className="input-group">
                    <label>출몰시기(선택)</label>
                    {daysOfWeek.map((day) => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                name="businessDates"
                                checked={store.businessDates.includes(day)}
                                onChange={() => handleBusinessDatesChange(day)}
                            />
                            {day}
                        </label>
                    ))}
                </div>

                <div className="input-group">
                    <label>영업 시작 시간</label>
                    <input
                        type="time"
                        name="openTime"
                        value={store.openTime}
                        onChange={handleOpenTimeChange}
                    />
                </div>

                <div className="input-group">
                    <label>영업 종료 시간</label>
                    <input
                        type="time"
                        name="closeTime"
                        value={store.closeTime}
                        onChange={handleCloseTimeChange}
                    />
                </div>

                <div className="input-group">
                    <label>결제방식</label>
                    <label>
                        <input
                            type="radio"
                            name="purchaseType"
                            value="현금"
                            checked={store.purchaseType === "현금"}
                            onChange={handlePaymentMethodChange}
                        />
                        현금
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purchaseType"
                            value="카드"
                            checked={store.purchaseType === "카드"}
                            onChange={handlePaymentMethodChange}
                        />
                        카드
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="purchaseType"
                            value="계좌이체"
                            checked={store.purchaseType === "계좌이체"}
                            onChange={handlePaymentMethodChange}
                        />
                        계좌이체
                    </label>
                </div>

                <div className="input-group">
                    <label>음식 카테고리</label>
                    {categories.map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                name="foodCategories"
                                checked={store.foodCategories.foodCategories.includes(category)}
                                onChange={() => handleFoodCategoriesChange(category)}
                            />
                            {category}
                        </label>

                    ))}
                </div>

                <button type="button" onClick={handleSubmit}>가게 등록</button>
            </form>
        </div>
    );
};

export default StoreCreate;
