import MainService from "./MainService";
import StaticService from "./StaticService";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

import './Main.css'
import 'swiper/css';
import 'swiper/css/pagination';
import './mainSwiperStyle.css';
import 'swiper/css/effect-cube';

import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

const Main = () => {

    const [newPlaces, setNewPlaces] = useState([]);
    const [hotPlaces, setHotPlaces] = useState([]);
    const [topPlaces, setTopPlaces] = useState([]);

    useEffect(() => {
        const fetchNewPlace = async () => {
            try {
                const res = await MainService.getNewPlace();

                setNewPlaces(res.data.recommendPlace);
                console.log(res.data.recommendPlace)

            } catch (error) {
                console.error('Error fetching newPlace:', error);
            } finally {
            }
        };

        fetchNewPlace();
    }, []);

    useEffect(() => {
        const fetchHotPlace = async () => {
            try {
                const res = await MainService.getHotPlace();

                setHotPlaces(res.data.recommendPlace);
                console.log(res.data.recommendPlace)

            } catch (error) {
                console.error('Error fetching hotPlace:', error);
            } finally {
            }
        };

        fetchHotPlace();
    }, []);

    useEffect(() => {
        const fetchTopPlace = async () => {
            try {
                const res = await StaticService.getTop10Place();

                setTopPlaces(res.data.hotPlaceResponses);
                console.log(res.data.hotPlaceResponses)

            } catch (error) {
                console.error('Error fetching topPlaces:', error);
            } finally {
            }
        };

        fetchTopPlace();
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}> 오늘의 신규 가게 </h2>
            <div className={"place"}>
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, EffectCube, Pagination]}
                    className="mainSwiper"
                >
                    {newPlaces && newPlaces.map((newPlace, index) => (
                        <SwiperSlide key={index}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                                width: '100%'
                            }}>
                                <div style={{ width: '90%', height: '35vh' }}>
                                    {/* <Link to={`http://localhost:3000/storeDetail/${newPlace.id}`}> */}
                                    <Link to={`https://gilgeorigoreuda.site/storeDetail/${newPlace.id}`}>
                                        <img style={{ borderRadius: '10px' }} src={newPlace.imageUrl}
                                            alt={newPlace.name} />
                                    </Link>
                                </div>
                                <div className="main-details"
                                    style={{ width: '50vh', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <Link to={`https://gilgeorigoreuda.site/storeDetail/${newPlace.id}`}>
                                    <p style={{ margin: '0', padding: '0', fontSize: 'large' , textDecoration: 'underline',color: 'black'}}>{newPlace.name}</p>
                                    </Link>
                                    <p style={{ margin: '0', padding: '0', fontSize: '15px' }}>주소
                                        : {newPlace.streetAddress}</p>
                                    <p style={{ margin: '0', padding: '0', fontSize: '15px' }}>영업시간
                                        : {newPlace.openTime.substr(0, 5)} ~ {newPlace.closeTime.substr(0, 5)}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <h2 style={{ textAlign: "center" }}> 오늘의 인기 가게 </h2>
            <div className={"place"}>
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, EffectCube, Pagination]}
                    className="mainSwiper"
                >
                    {hotPlaces && hotPlaces.map((hotPlace, index) => (
                        <SwiperSlide key={index}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                                width: '100%'
                            }}>
                                <div style={{ width: '90%', height: '35vh' }}>
                                    {/* <Link to={`http://localhost:3000/storeDetail/${hotPlace.id}`}> */}
                                    <Link to={`https://gilgeorigoreuda.site/storeDetail/${hotPlace.id}`}>
                                        <img style={{ borderRadius: '10px' }} src={hotPlace.imageUrl}
                                            alt={hotPlace.name} />
                                    </Link>
                                </div>
                                <div className="main-details"
                                    style={{ width: '50vh', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <Link to={`https://gilgeorigoreuda.site/storeDetail/${hotPlace.id}`}>
                                    <p style={{ margin: '0', padding: '0', fontSize: 'large' , textDecoration: 'underline',color: 'black' }}>{hotPlace.name}</p>
                                    </Link>
                                    <p style={{ margin: '0', padding: '0', fontSize: '15px' }}>주소
                                        : {hotPlace.streetAddress}</p>
                                    <p style={{ margin: '0', padding: '0', fontSize: '15px' }}>영업시간
                                        : {hotPlace.openTime.substr(0, 5)} ~ {hotPlace.closeTime.substr(0, 5)}</p>
                                        
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <h2 style={{textAlign : "center"}}> 실시간 인기 장소 </h2>
            <div className="top10">

                {topPlaces && topPlaces.map((topPlace, index) => (
                    <div key={index}>
                        <Link to={`/addressSearch?topPlaceName=${topPlace.name}`} state={{ search: topPlace.name }}>
                            <li><span className="rankNum">{index + 1}</span> {topPlace.name}</li>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Main;