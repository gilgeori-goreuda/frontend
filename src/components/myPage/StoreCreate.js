import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import uploadPhoto from "../../img/uploadPhoto.png";
import './StoreCreate.css';

const StoreCreate = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [getStreet_address, setGetStreet_address] = useState(decodeURIComponent(searchParams.get('street_address')));
    const [getLat, setGetLat] = useState(parseFloat(decodeURIComponent(searchParams.get('lat'))));
    const [getLng, setGetLng] = useState(parseFloat(decodeURIComponent(searchParams.get('lng'))));

    // console.log(getStreet_address, getLat, getLng);


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");
        const streetAddress = searchParams.get("street_address");

        console.log("좌표:", lat, lng);
        console.log("주소:", streetAddress);

        // 받은 좌표 및 주소로 상태 업데이트
        setStore((prevStore) => ({
            ...prevStore,
            lat: lat || '',
            lng: lng || '',
            streetAddress: streetAddress || '',
        }));
    }, [location.search]);


    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null); // 이미지 파일 하나만 선택하도록 수정

    const [store, setStore] = useState({
        detailLocation: "",
        name: "",
        storeType: "",
        businessDates: "",
        openTime: "",
        closeTime: "",
        purchaseType: "현금, 카드, 계좌이체",
        imageUrl: "",
        lat: 0,
        lng: 0,
        streetAddress: "",
        foodCategories: {
            foodCategories: []
        }
    });
    // console.log(getStreet_address, getLat, getLng);

    useEffect(() => {
        setStore((prevStore) => ({
            ...prevStore,
            streetAddress: getStreet_address,
        }));
        setStore((prevStore) => ({
            ...prevStore,
            lat: getLat,
        }));
        setStore((prevStore) => ({
            ...prevStore,
            lng: getLng,
        }));
    }, [getStreet_address]); // getStreet_address가 변경될 때만 실행



    const categories = ["붕어빵", "호떡", "와플", "김밥", "순대", "오뎅", "타코야끼", "떡볶이", "꼬치", "땅콩빵", "군고구마", "토스트", "달고나", "군옥수수", "탕후루", "튀김"];
    const daysOfWeek = [
        { eng: "sunday", kor: "일" },
        { eng: "monday", kor: "월" },
        { eng: "tuesday", kor: "화" },
        { eng: "wednesday", kor: "수" },
        { eng: "thursday", kor: "목" },
        { eng: "friday", kor: "금" },
        { eng: "saturday", kor: "토" }
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
    const makeBusinessDate = (isDayIncluded, prevStore, day) => {
        return isDayIncluded ? prevStore.businessDates
            .split(',')
            .map(d => d.trim())
            .filter(d => d !== day)
            .join(',') : prevStore.businessDates
            ? `${prevStore.businessDates.trim()}, ${day}`
            : day;
    }
    const handleBusinessDatesChange = (day) => {
        setStore((prevStore) => {
            const isDayIncluded = prevStore.businessDates.includes(day);
            let updatedBusinessDates = makeBusinessDate(isDayIncluded, prevStore, day);
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
            let imageUrl = store.imageUrl;
            if (selectedFile) {
                const uploadedImageUrl = await uploadImage(selectedFile);
                imageUrl = baseImageUrl + uploadedImageUrl;
            }

            const dataToSend = {
                ...store,
                imageUrl: imageUrl,
                lat: store.lat,
                lng: store.lng,
                streetAddress: store.streetAddress,
            };

            const sendLocationToServer = async (lat, lng, streetAddress) => {
                try {
                    // 서버로 전송할 데이터 구성
                    const locationData = {
                        lat: lat,
                        lng: lng,
                        streetAddress: streetAddress,
                    };

                    // 서버에 데이터 전송
                    const response = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/location', locationData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log("위치 데이터 전송 성공:", response.data);
                } catch (error) {
                    console.error("위치 데이터 전송 실패:", error);
                }
            };

            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('http://ec2-43-201-35-43.ap-northeast-2.compute.amazonaws.com:8080/api/v1/stores', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if(response.headers['location']) {
                const headerLocation = response.headers['location'];
                const lastSlashIndex = headerLocation.lastIndexOf('/');
                const parsedValue = headerLocation.substring(lastSlashIndex + 1);
                console.log(parsedValue);
                navigate(`/StoreDetail/${parsedValue}`);
            }
            console.log("Store 등록 성공:", response.data);

        } catch (error) {
            console.error("Store 등록 실패:", error);
        }
    };

    return (
        <div className="container">
            <h1>가게등록</h1>
            <form>
                <div className="input-wrap">
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

                <div className="input-wrap block">
                    <label>가게형태</label>
                    <div className="input-radio mgt-10">
                        <input
                            type="radio"
                            name="storeType"
                            value="푸드트럭"
                            checked={store.storeType === "푸드트럭"}
                            onChange={handleStoreTypeChange}
                        />
                        <div>푸드트럭
                            <input type="radio"
                                name="storeType"
                                value="포장마차"
                                checked={store.storeType === "포장마차"}
                                onChange={handleStoreTypeChange}
                            />
                            포장마차
                        </div>
                    </div>
                </div>

                <div className="input-wrap block">
                    <label>출몰시기(선택)</label>
                    <div className="input-radio">
                        {daysOfWeek.map((day) => (
                            <div key={day.eng}>
                                <input
                                    type="checkbox"
                                    name="businessDates"
                                    checked={store.businessDates.includes(day.eng)}
                                    onChange={() => handleBusinessDatesChange(day.eng)}
                                />
                                {day.kor}
                            </div>

                        ))}

                    </div>
                </div>

                <div className="input-wrap">
                    <label>영업 시작 시간</label>
                    <input
                        type="time"
                        name="openTime"
                        value={store.openTime}
                        onChange={handleOpenTimeChange}
                    />
                </div>

                <div className="input-wrap">
                    <label>영업 종료 시간</label>
                    <input
                        type="time"
                        name="closeTime"
                        value={store.closeTime}
                        onChange={handleCloseTimeChange}
                    />
                </div>

                <div className="input-wrap block">
                    <label>결제방식</label>
                    <div className="input-radio">
                        <input
                            type="radio"
                            name="purchaseType"
                            value="현금"
                            checked={store.purchaseType === "현금"}
                            onChange={handlePaymentMethodChange}
                        />
                        현금

                        <input
                            type="radio"
                            name="purchaseType"
                            value="카드"
                            checked={store.purchaseType === "카드"}
                            onChange={handlePaymentMethodChange}
                        />
                        카드

                        <input
                            type="radio"
                            name="purchaseType"
                            value="계좌이체"
                            checked={store.purchaseType === "계좌이체"}
                            onChange={handlePaymentMethodChange}
                        />
                        계좌이체
                    </div>
                </div>

                <div className="input-checkbox block">
                    <label>음식 카테고리</label>
                    <div className="food-category-group">
                        {categories.slice(0, 4).map((category, index) => (
                            <div key={category}>
                                <input
                                    type="checkbox"
                                    name="foodCategories"
                                    checked={store.foodCategories.foodCategories.includes(category)}
                                    onChange={() => handleFoodCategoriesChange(category)}
                                />
                                {category}
                            </div>
                        ))}
                    </div>
                    <div className="food-category-group">
                        {categories.slice(4, 8).map((category, index) => (
                            <div key={category}>
                                <input
                                    type="checkbox"
                                    name="foodCategories"
                                    checked={store.foodCategories.foodCategories.includes(category)}
                                    onChange={() => handleFoodCategoriesChange(category)}
                                />
                                {category}
                            </div>
                        ))}
                    </div>
                    <div className="food-category-group">
                        {categories.slice(8, 12).map((category, index) => (
                            <div key={category}>
                                <input
                                    type="checkbox"
                                    name="foodCategories"
                                    checked={store.foodCategories.foodCategories.includes(category)}
                                    onChange={() => handleFoodCategoriesChange(category)}
                                />
                                {category}
                            </div>
                        ))}
                    </div>
                    <div className="food-category-group">
                        {categories.slice(12, 17).map((category, index) => (
                            <div key={category}>
                                <input
                                    type="checkbox"
                                    name="foodCategories"
                                    checked={store.foodCategories.foodCategories.includes(category)}
                                    onChange={() => handleFoodCategoriesChange(category)}
                                />
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                <button type="button" onClick={handleSubmit}>가게 등록</button>
            </form>
        </div>
    );
};

export default StoreCreate;