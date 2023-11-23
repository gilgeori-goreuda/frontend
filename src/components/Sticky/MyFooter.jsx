import React from 'react';
import './MyFooter.css'
import Community from './../Community';
import { Link } from 'react-router-dom';

const MyFooter = () => {
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
                        <Link className='AddStoreNav' to={'/'} >AddStore</Link>
                    </div>
                    <div className='LinkBox'>
                        <Link className='MyPageNav' to={'/'} >MyPage</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MyFooter;