import MainService from "./MainService";
import StaticService from "./StaticService";
import React, {useEffect, useState} from "react";
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css'
import {Link} from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './swiperStyle.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Main = () => {

    const settings = {
        dots: false,
        arrow: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 10
    };

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
            <h2> 오늘의 신규 장소 </h2>
            <div className={"place"}>
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    {newPlaces && newPlaces.map((newPlace, index) => (
                        <div key={index}>
                            <SwiperSlide>
                                <div style={{display : 'flex', alignItems: 'center', flexDirection : 'column', gap : '20px', width: '100%'}}>
                                    <div style={{width: '90%', height: '35vh'}}>
                                        <Link to={`http://localhost:3000/storeDetail/${newPlace.id}`}>
                                            <img style={{borderRadius: '10px'}} src={newPlace.imageUrl} alt={newPlace.name}/>
                                        </Link>
                                    </div>
                                    <div className="main-details" style={{width: '50vh', display: 'flex', flexDirection:'column', gap: '5px'}}>
                                        <p style={{margin : '0', padding: '0', fontSize: '15px'}}>가게 이름 : {newPlace.name}</p>
                                        <p style={{margin : '0', padding: '0', fontSize: '15px'}}>주소 : {newPlace.streetAddress}</p>
                                        <p style={{margin : '0', padding: '0', fontSize: '15px'}}>영업시간 : {newPlace.openTime} - {newPlace.closeTime}</p>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </div>
                    ))}
                </Swiper>
                <Slider {...settings}>
                    {newPlaces && newPlaces.map((newPlace, index) => (
                        <div key={index}>
                            <div className="main-image">
                                <Link to={`http://localhost:3000/storeDetail/${newPlace.id}`}>
                                    <img src={newPlace.imageUrl} alt={newPlace.name}/>
                                </Link>
                            </div>
                            <div className="main-details">
                                <h3>상세정보</h3>
                                <div style={{margin: '20px'}}></div>
                                <div>가게 이름 : {newPlace.name}</div>
                                <div style={{margin: '20px'}}></div>
                                <div>주소 : {newPlace.streetAddress}</div>
                                <div style={{margin: '20px'}}></div>
                                <div>영업시간 : {newPlace.openTime} - {newPlace.closeTime}</div>
                                <div style={{margin: '20px'}}></div>
                            </div>
                        </div>
                    ))}

                </Slider>
            </div>

            <h2> 오늘의 인기 장소 </h2>
            <div className={"place"}>
                <Slider {...settings}>
                    {hotPlaces && hotPlaces.map((hotPlace, index) => (
                        <div key={index}>
                            <Link to={`http://localhost:3000/storeDetail/${hotPlace.id}`}>
                                <img src={hotPlace.imageUrl} alt={hotPlace.name}/>
                            </Link>
                            <div>{hotPlace.name}</div>
                            <div>{hotPlace.openTime} ~ {hotPlace.closeTime}</div>
                            <p>streetAddr: {hotPlace.streetAddress}</p>
                            <p>detailAddr: {hotPlace.detailLocation}</p>
                        </div>
                    ))}
                </Slider>
            </div>

            <h2> 실시간 인기 장소 </h2>
            <div className={"top10"}>
                {topPlaces && topPlaces.map((topPlace, index) => (
                    <div key={index}>
                        <Link to={"/addressSearch"} state={{search: topPlace.name}}>
                            <li>{index + 1} {topPlace.name}</li>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Main;