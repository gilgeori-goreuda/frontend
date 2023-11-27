import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MyPagePreferences from "./MyPagePreferences";
import './MyPage.css';
import MyPageReviews from "./MyPageReviews";

const MyPage = () => {
        const navigate = useNavigate();
        const [member, setMember] = useState(null);
        const [activeInfo, setActiveInfo] = useState({});

        const storeId = 16;

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const fakeMember = {
                        memberId: 1,
                        nickname: "붕어빵이좋아",
                        profileImageUrl: "https://example.com/profile.jpg",
                        memberLevel: "길잘알",
                        createdAt: new Date(2023, 5, 30),
                        activeInfo: { // 활동 정보 추가
                            totalWalkingDistance: 150,
                            totalVisitCount: 25,
                            exp: 500
                        }
                    };
                    // const activeInfo = {
                    //     totalWalkingDistance: 150, // 총 걸음 거리
                    //     totalVisitCount: 25,       // 총 방문 횟수
                    //     exp: 500                   // 경험치
                    // };

                    setMember(fakeMember);
                    // setActiveInfo(activeInfo);
                } catch (error) {
                    console.error("Error fetching member data:", error);
                }
            };

            fetchData();
        }, []);

        // useEffect(() => {
        //     const activeInfo = {
        //         totalWalkingDistance: 150, // 총 걸음 거리
        //         totalVisitCount: 25,       // 총 방문 횟수
        //         exp: 500                   // 경험치
        //     };
        //
        //     setMember(fakeMember);
        //     setActiveInfo(activeInfo);
        // }, []);


        return (
            <div className="App">
                <div className="mypage-container">
                    <div className="profile-section">
                        {member && (
                            <div className="profile-content">
                                {/*<img src={member.profileImageUrl} alt="프로필 이미지" className="profile-image"/>*/} {/*서버 연결되면 사용*/}
                                <img
                                    src={'https://t1.daumcdn.net/thumb/R720x0.fgif/?fname=http://t1.daumcdn.net/brunch/service/user/5ac/image/gpsWSnXOQsp0R9Km0GHiRmV6z0c.gif'}
                                    alt="프로필 이미지"
                                    className="profile-image"/>

                                <div className="profile-info">
                                    <h1>{member.nickname}</h1>
                                    <p>{`👑 등급: ${member.memberLevel}`}</p>
                                    <p>{`가입 날짜: ${member.createdAt.toLocaleDateString()}`}</p>
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
            </div>
        );
    }
;

export default MyPage;