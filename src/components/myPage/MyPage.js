import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import MyPagePreferences from "./MyPagePreferences";
import './MyPage.css';
import MyPageReviews from "./MyPageReviews";
import {Api} from "../../common/api/ApiSearch";

const MyPage = () => {
        const [member, setMember] = useState(null);
        const [activeInfo, setActiveInfo] = useState({});
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

        useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await Api(`/api/v1/members`, "GET");
            setMember({
                ...res,
                activeInfo: res.memberActiveInfo
            });
            console.log(res)
        } catch (error) {
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            // console.log(error.response?.data);
        }
    };
     
                        
    fetchData();
}, []);
        return (
            <div className="App">
                <div className="mypage-container">
                    <div className="profile-section">
                        {member && (
                            <div className="profile-content">
                                <img
                                    src={member.profileImageUrl}
                                    alt="프로필 이미지"
                                    className="profile-image"/>

                                <div className="profile-info">
                                    <h1>{member.nickname}</h1>
                                    <p>{`👑 레벨: ${member.memberActiveInfo.memberLevel}`}</p>
                                    <p>{`가입 날짜: ${new Date(member.createdAt).toLocaleDateString()}`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="activity-section">                       
                        {member && member.activeInfo && (
                            <div className="activity-content">
                                <div className="activity-item">
                                    <span>레벨: </span>{member.activeInfo.memberLevel}
                                </div>
                                <div className="activity-item">
                                    <span>총 걷기 거리: </span>{member.activeInfo.totalWalkingDistance} km
                                </div>
                                <div className="activity-item">
                                    <span>방문 횟수: </span>{member.activeInfo.totalVisitCount}
                                </div>
                                <div className="activity-item">
                                    <span>경험치: </span>{member.activeInfo.exp}
                                </div>
                            </div>
                        )}
                    </div>                
                    <MyPageReviews/>
                    <MyPagePreferences/>
                </div>
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
    }
;

export default MyPage;