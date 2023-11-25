import React, { useState } from 'react';
import './MyFooter.css'
import Community from './../Community';
import { Link, useNavigate } from 'react-router-dom';
import useGeolocation from 'react-hook-geolocation';

const MyFooter = () => {
    const nav = useNavigate();
    const [nowAddress, setNowAddress] = useState(true);
    console.log(nowAddress);
    const [getMlat, setGetMlat] = useState('');
    const [getMlng, setGetMlng] = useState('');
    const geolocation = useGeolocation({}, (location) => {
        // console.log(123);
        console.log(location);
        setGetMlat(location.latitude);
        setGetMlng(location.longitude);
        setNowAddress(false);
        // console.log(nowAddress);
    }, nowAddress);
    const onClickNowAddressHandler = () => {
        setNowAddress(true);
        // nav(`/api/v1/search/address?lat=${getMlat}&lng=${getMlng}`)
        nav(`/centerMap?lat=${getMlat}&lng=${getMlng}&street_address=&m_lat=&m_lng=`)

        // console.log(nowAddress);
    }

    return (
        <div>
            <footer id='footer'>
                <div className='FooterBox'>
                    <div className='LinkBox'>
                        <Link className='SearchNav' to={`/addressSearch`} >Search</Link>
                    </div>
                    <div className='LinkBox'>
                        <Link className='CommunityNav' to={'/'} >Community</Link>
                    </div>
                    <div className='LinkBox'>
                        <button className='AddStoreNav' onClick={onClickNowAddressHandler}>AddStore</button>
                    </div>
                    {/* <div className='LinkBox'>
                        <Link className='AddStoreNav' to={'/centerMap'} >AddStore</Link>
                    </div> */}
                    <div className='LinkBox'>
                        <Link className='MyPageNav' to={'/myPage'} >MyPage</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MyFooter;