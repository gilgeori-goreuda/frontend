import React, { useState } from 'react';
import "./Visit.css";
import { useSearchParams } from 'react-router-dom';
import { Api } from '../../common/api/ApiSearch';
const Visit = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [getStoreId, setGetStoreId] = useState(decodeURIComponent(searchParams.get('storeId')));
    const [getLat, setGetLat] = useState(decodeURIComponent(searchParams.get('mLat')));
    const [getLng, setGetLng] = useState(decodeURIComponent(searchParams.get('mLng')));

    const visitSubmit = async () => {
        const visitData = {
            lat: getLat,
            lng: getLng
        };

        try {
            const res = await Api(`/api/v1/visit/stores/`
                + getStoreId
                , "POST",
                visitData
            );
            console.log(res.data);

            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    const certifySubmit = async () => {
        const certifyData = {
            lat: getLat,
            lng: getLng
        };

        try {
            const res = await Api(`/api/v1/visit/verification/stores/`
                + getStoreId
                , "POST",
                certifyData
            );
            console.log(res.data);

            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
            // console.log(error.response?.data.errorCode, 132);
            if (error.response?.data.errorCode === "S007") {
                // 인증 가능 범위가 아닌 경우
                alert("방문인증이 가능한 거리가 아닙니다.");
            } else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
        }
    }





    return (
        <div>
            <div className='visitBox'>
                <h2 className='visitH'>방문하기 버튼을 누르고 사용자 근처의<br />가게를 방문 인증하기를 할 수 있어요</h2>
                <button onClick={() => visitSubmit()}>방문하기</button>
                <button onClick={() => certifySubmit()}>방문 인증하기</button>
            </div>
        </div>
    );

};

export default Visit