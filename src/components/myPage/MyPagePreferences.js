import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Api} from "../../common/api/ApiSearch";
import './MyPagePreferences.css'

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './myPageSwiperStyle.css';

// import required modules
import {EffectCards} from 'swiper/modules';

// 총 몇개 찜했는지도 보여주고 싶다.
// 카테고리별로 나눠도 좋을 거 같음(푸드트럭/포장마차)
const MyPagePreferences = ({}) => {
    const navigate = useNavigate();
    const [member, setMember] = useState({});
    const [preferencesList, setPreferencesList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api(`/api/v1/members/preferences`, "GET");
                console.log(res.preferences)
                setPreferencesList(res.preferences);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchData();
    }, []);

    function formatCategories(categories) {
        if (!categories || categories.length === 0) return '카테고리 없음';

        const displayedCategories = categories.slice(0, 3).map(cat => `#${cat}`).join(' ');
        return categories.length > 3 ? `${displayedCategories} ...` : displayedCategories;
    }

    return (
        <div className="App">
            <div className='myPage-container'>
                <div>
                    <h2 style={{textAlign: 'center'}}>나의 찜 ❤️</h2>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="myPageSwiper"
                    >
                        {preferencesList.map((item, index) => (
                            <>
                                <SwiperSlide key={index}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: `url(${item.preferredStoreInfo.storeImageUrl})`,
                                        backgroundSize: 'cover',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: "black"
                                    }}>
                                        <div className="store-name-box">
                                            {item.preferredStoreInfo.storeName}
                                        </div>

                                        <div style={{margin: '20px'}}></div>

                                        <div style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '10px',
                                            padding: '5px',

                                        }}>
                                            <div style={{
                                                fontSize: '15px',
                                                marginTop: '10px',
                                                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                                                textAlign: 'center',
                                            }}>
                                                가게 평점: {item.preferredStoreInfo.averageRating}
                                            </div>
                                            <div style={{
                                                fontSize: '15px',
                                                marginTop: '10px',
                                                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                                                textAlign: 'center'
                                            }}>
                                                {formatCategories(item.preferredStoreInfo.categories)}
                                            </div>
                                            <div style={{
                                                fontSize: '10px',
                                                marginTop: '10px',
                                                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
                                                textAlign: 'center'
                                            }}>
                                                찜한 날: {item.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MyPagePreferences;