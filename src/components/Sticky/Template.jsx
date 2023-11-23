import React from 'react';
import "./MyHeader.css"
import { Link, Outlet } from 'react-router-dom';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
const Template = () => {
    return (
        <>
            <MyHeader />
            <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <Outlet />
            </div>
            <MyFooter />
        </>
    );
};

export default Template;