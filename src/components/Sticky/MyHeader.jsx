import React, { useState } from 'react';
import "./MyHeader.css"
import { Link, useNavigate } from 'react-router-dom';
import useGeolocation from 'react-hook-geolocation';
const MyHeader = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const nav = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const logoutFunction = () => {
        // 로그아웃 로직을 여기에 추가
        console.log('로그아웃되었습니다.');
        closeModal(); // 모달 닫기
        nav('/')
        // history.push('/'); // 로그아웃 후 이동할 페이지 경로
    };
    const [nowAddress, setNowAddress] = useState(true);
    console.log(nowAddress);
    const [getMlat, setGetMlat] = useState('');
    const [getMlng, setGetMlng] = useState('');
    const geolocation = useGeolocation({}, (location) => {
        // console.log(123);
        // console.log(location);
        setGetMlat(location.latitude);
        setGetMlng(location.longitude);
        setNowAddress(false);
        // console.log(nowAddress);
    }, nowAddress);
    const onClickNowAddressHandler = () => {
        setNowAddress(true);
        // nav(`/api/v1/search/address?lat=${getMlat}&lng=${getMlng}`)
        nav(`/api/v1/search/address?lat=${getMlat}&lng=${getMlng}&street_address=&m_lat=&m_lng=`)

        // console.log(nowAddress);
    }
    const createDynamicPath = () => {
        return `/api/v1/search/address?lat=${getMlat}&lng=${getMlng}`;
    };

    return (
        <div>
            <header id='header'>
                <div className='headerBox'>
                    <div className='LinkBox'>
                        <Link className='homeNav' to={`/main`} >Home</Link>
                    </div>
                    <div className='LinkBox'>
                        <button className='mapNav' onClick={onClickNowAddressHandler}>Map</button>
                    </div>
                    <div className='LinkBox'>
                        <button className='logoutNav' onClick={openModal}>Logout</button>
                    </div>
                </div>
            </header >
            {isModalOpen && (
                <div className="logoutModal">
                    <div className="logoutModal-content">
                        <span className="logoutClose" onClick={closeModal}>&times;</span>
                        <p>정말 로그아웃하시겠습니까?</p>
                        <button onClick={logoutFunction} className='logoutButton'>로그아웃</button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default MyHeader;