import React from 'react';
import "./MyHeader.css"
import { Link } from 'react-router-dom';
const MyHeader = () => {
    return (
        <div>
            <header id='header'>
                <div className='headerBox'>
                    {/* 헤더 */}
                    <Link className='homeNav' to={'/'} >Home</Link>
                    {/* <Link className='mapNav' to={'/'} >Map</Link> */}
                    {/* <Link className='logoutNav' to={'/'} >Logout</Link> */}
                </div>
            </header>
        </div>
    );
};

export default MyHeader;