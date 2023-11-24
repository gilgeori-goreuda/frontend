import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Api} from "../../common/api/ApiSearch";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './swiperStyle.css';

// import required modules
import {EffectCards} from 'swiper/modules';

// 총 몇개 찜했는지도 보여주고 싶다.
// 카테고리별로 나눠도 좋을 거 같음(푸드트럭/포장마차)
const MyPagePreferences = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState({});
    const [preferencesList, setPreferencesList] = useState([]);

    const storeId = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api(`/api/v1/members/preferences`, "GET");

                console.log(res.preferences)
                setPreferencesList(res.preferences);

                // const data = [...res.preferences, ...res.preferences, ...res.preferences, ...res.preferences, ...res.preferences, ...res.preferences]
                // setPreferencesList(data);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchData();
    }, []);


    const handleGoBack = () => {
        navigate('/myPage'); // 이전 페이지로 이동
    };

    function formatCategories(categories) {
        if (!categories || categories.length === 0) return '카테고리 없음';

        const displayedCategories = categories.slice(0, 3).map(cat => `#${cat}`).join(' ');
        return categories.length > 3 ? `${displayedCategories} ...` : displayedCategories;
    }

    return (
        <div className="App">
            <div className="container">
                {/*<h1>{member.nickname ? `${member.nickname}님!` : ''}</h1>*/}
                {/*<ul>*/}
                {/*    <li>{member.memberId}</li>*/}
                {/*</ul>*/}
                <div>

                </div>
                <div>
                    <h1 style={{textAlign: 'center'}}>나의 찜 ❤️</h1>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {preferencesList.map((item, index) => (
                            <>
                                <SwiperSlide key={index}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: "url('https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OJAELNI7CFLYRLVK6CK76SVEPU.jpg')",
                                        backgroundSize: 'cover',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            fontSize: '35px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '10px',
                                            padding: '5px',
                                            textShadow: '3px 3px 2px rgba(0, 0, 0, 0.8)'}}>
                                            {item.preferredStoreInfo.storeName}
                                        </div>

                                        <div style={{margin: '20px'}}></div>

                                        <div style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '10px',
                                            padding: '5px',

                                        }}>
                                        <div style={{
                                            fontSize: '20px',
                                            marginTop: '10px',
                                            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
                                            textAlign: 'center'
                                        }}>
                                            가게 평점: {item.preferredStoreInfo.averageRating}
                                        </div>
                                        <div style={{
                                            fontSize: '20px',
                                            marginTop: '10px',
                                            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
                                            textAlign: 'center'
                                        }}>
                                            {formatCategories(item.preferredStoreInfo.categories)}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            marginTop: '30px',
                                            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
                                            textAlign: 'center'
                                        }}>
                                            찜한 날: {item.preferredStoreInfo.createdAt}
                                        </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper>
                </div>
                <div className="button-container">
                    <button onClick={handleGoBack} className="goBackButton">
                        <span className="goBackIcon">&lt;</span>
                    </button>
                </div>
            </div>
        </div>
    )
        ;
};

export default MyPagePreferences;