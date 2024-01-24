import React, { useState } from 'react';
import "./Visit.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Api } from '../../common/api/ApiSearch';
const Visit = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [getStoreId, setGetStoreId] = useState(decodeURIComponent(searchParams.get('storeId')));
    const [getLat, setGetLat] = useState(decodeURIComponent(searchParams.get('mLat')));
    const [getLng, setGetLng] = useState(decodeURIComponent(searchParams.get('mLng')));

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
            nav('/login')
            // history.push('/'); // 로그아웃 후 이동할 페이지 경로
        };


    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    const openVisitModal = () => {
        setIsVisitModalOpen(true);
    };

    const closeVisitModal = () => {
        setIsVisitModalOpen(false);
    };
    const [isCertifyModalOpen, setIsCertifyModalOpen] = useState(false);

    const openCertifyModal = () => {
        setIsCertifyModalOpen(true);
    };

    const closeCertifyModal = () => {
        setIsCertifyModalOpen(false);
    };

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
            openVisitModal();
            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "V001") {
                alert("인증 가능 범위가 아닙니다.");
            } else if(error.response?.data.errorCode === "V002"){
                alert("존재하지 않는 가게 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V003"){
                alert("인증 시간이 초과되었습니다. 2시간이 지난 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V004"){
                alert("방문하기에 너무 먼 거리에 있습니다. 근처에 가서 다시 시도해주세요.");
            } else if(error.response?.data.errorCode === "V005"){
                alert("인증되지 않은 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V006"){
                alert("이미 인증된 방문 기록입니다.");
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
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
            openCertifyModal();
            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "V001") {
                alert("인증 가능 범위가 아닙니다.");
            } else if(error.response?.data.errorCode === "V002"){
                alert("존재하지 않는 가게 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V003"){
                alert("인증 시간이 초과되었습니다. 2시간이 지난 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V004"){
                alert("방문하기에 너무 먼 거리에 있습니다. 근처에 가서 다시 시도해주세요.");
            } else if(error.response?.data.errorCode === "V005"){
                alert("인증되지 않은 방문 기록입니다.");
            } else if(error.response?.data.errorCode === "V006"){
                alert("이미 인증된 방문 기록입니다.");
            }else {
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
            {isVisitModalOpen && (
                <div className="visit-modal">
                    <div className="visit-modal-content">
                        <span className="visit-close" onClick={() => closeVisitModal()}>&times;</span>
                        <p className='visitText'>
                            <img className='smileImg' src='https://cdn-icons-png.flaticon.com/128/3404/3404134.png' />
                            &nbsp;
                            방문하기가 완료 되었습니다.
                            &nbsp;
                            <img className='smileImg' src='https://cdn-icons-png.flaticon.com/128/3404/3404134.png' />
                            <br></br>가게 근처에 가서 방문 인증하기를 해보세요.
                        </p>
                    </div>
                </div>
            )}
            {isCertifyModalOpen && (
                <div className="visit-modal">
                    <div className="visit-modal-content">
                        <span className="visit-close" onClick={() => closeCertifyModal()}>&times;</span>
                        <p className='visitText'>
                            <img className='smileImg' src='https://cdn-icons-png.flaticon.com/128/3404/3404134.png' />
                            &nbsp;
                            방문 인증이 완료되었습니다.
                            &nbsp;
                            <img className='smileImg' src='https://cdn-icons-png.flaticon.com/128/3404/3404134.png' />
                            <br></br>가게 리뷰를 남겨보세요
                        </p>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="logoutModal">
                    <div className="logoutModal-content">
                        <span className="logoutClose" onClick={closeModal}>&times;</span>
                        <p>게스트는 제한되는 기능입니다. <br></br>로그인을 원하시면 버튼을 눌러주세요.</p>
                        <button onClick={logoutFunction} className='logoutButton'>로그아웃</button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Visit