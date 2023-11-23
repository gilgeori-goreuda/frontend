import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// 총 몇개 찜했는지도 보여주고 싶다.
// 카테고리별로 나눠도 좋을 거 같음(푸드트럭/포장마차)
const MyPagePreferences = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState({});
    const [preferencesList, setPreferencesList] = useState([]);

    const storeId = 2;
    const memberId = 2;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const preferencesResponse = await axios.get(`http://localhost:8080/api/v1/members/${memberId}/preferences`);
                setPreferencesList(preferencesResponse.data.preferences);
                console.log("dd", preferencesResponse.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [memberId]);

    const handleGoBack = () => {
        navigate('/myPage'); // 이전 페이지로 이동
    };

    return (
        <div className="App">
                <div className="container">
                    <h1>{member.nickname ? `${member.nickname}님!` : ''}</h1>
                    <ul>
                        <li>{member.memberId}</li>
                    </ul>
                    <div>
                        <h1>나의 찜</h1>
                        <ul>
                            {preferencesList.map((item, index) => (
                                <li key={item.preferenceId + " " + index}>
                                    <div>
                                        <p>가게 이름: {item.preferredStoreInfo.storeName}</p>
                                        <p>가게 타입: {item.preferredStoreInfo.storeType}</p>
                                        <p>가게 이미지: {item.preferredStoreInfo.storeImageUrl}</p>
                                        <p>가게 평점: {item.preferredStoreInfo.storeRating}</p>
                                        <p>찜한 날짜: {item.preferredStoreInfo.createdAt}</p>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="button-container">
                        <button onClick={handleGoBack} className="goBackButton">
                            <span className="goBackIcon">&lt;</span>
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default MyPagePreferences;