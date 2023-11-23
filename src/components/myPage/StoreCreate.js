import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import uploadPhoto from "../../img/uploadPhoto.png";

const StoreCreate = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null); // 이미지 파일 하나만 선택하도록 수정

    const [store, setStore] = useState({
        name: "",
        storeType: "",
        businessDates: "",
        openTime: "",
        closeTime: "",
        purchaseType: "현금, 카드, 계좌이체",
        imageUrl: "",
        lat: 87.2187,
        lng: 777.2996,
        streetAddress: "서울특별시 서초구 서초3동",
        foodCategories: {
            foodCategories: []
        }
    });

    const categories = ["붕어빵", "호떡", "타코야끼", "계란빵", "떡볶이", "순대", "오뎅", "와플", "김밥", "꼬치", "땅콩빵", "군고구마", "토스트", "달고나", "군옥수수", "탕후루", "튀김"];
    const daysOfWeek = [
        { eng: "sunday", kor: "일요일" },
        { eng: "monday", kor: "월요일" },
        { eng: "tuesday", kor: "화요일" },
        { eng: "wednesday", kor: "수요일" },
        { eng: "thursday", kor: "목요일" },
        { eng: "friday", kor: "금요일" },
        { eng: "saturday", kor: "토요일" }
    ];

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('images', file);

        try {
            const res = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data.imageNames[0];
        } catch (error) {
            console.error('Image upload error', error);
            return null;
        }
    };

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
    console.log(store)
    const handleBusinessDatesChange = (day) => {
        setStore((prevStore) => {
            const isDayIncluded = prevStore.businessDates.includes(day);
            let updatedBusinessDates;

            if (isDayIncluded) {
                // 요일이 이미 선택된 경우 제거
                updatedBusinessDates = prevStore.businessDates
                    .split(',')
                    .map(d => d.trim())
                    .filter(d => d !== day)
                    .join(',');
            } else {
                // 요일이 선택되지 않은 경우 추가
                updatedBusinessDates = prevStore.businessDates
                    ? `${prevStore.businessDates.trim()}, ${day}`
                    : day;
            }

            // 모든 요일 선택 또는 해제
            const allDaysSelected = daysOfWeek.every(({ kor }) => updatedBusinessDates.includes(kor));
            if (allDaysSelected) {
                updatedBusinessDates = ''; // 모든 요일이 선택된 경우 공백으로 초기화
            } else if (updatedBusinessDates === '') {
                updatedBusinessDates = daysOfWeek.map(({ kor }) => kor).join(', '); // 모든 요일이 해제된 경우 모든 요일 선택
            }

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        const baseImageUrl = "https://dz68kixxhuu4k.cloudfront.net/";

        try {
            let imageUrrl = store.imageUrl;
            if (selectedFile) {
                const uploadedImageUrl = await uploadImage(selectedFile);
                imageUrrl = baseImageUrl + uploadedImageUrl;
            }

            const dataToSend = {
                ...store,
                imageUrl: imageUrrl
            };

            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/stores', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
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
                <div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <img
                            src={uploadPhoto}
                            style={{ width: '80px', height: '80px' }}
                            alt="Upload"
                        />
                    </label>
                </div>
                <div className="image-preview">
                    {selectedFile && (
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                    )}
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
                        <label key={day.eng}>
                            <input
                                type="checkbox"
                                name="businessDates"
                                checked={store.businessDates.includes(day.eng)}
                                onChange={() => handleBusinessDatesChange(day.eng)}
                            />
                            {day.kor}
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