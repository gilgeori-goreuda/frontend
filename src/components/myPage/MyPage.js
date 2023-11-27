import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MyPagePreferences from "./MyPagePreferences";
import './MyPage.css';
import MyPageReviews from "./MyPageReviews";
import {Api} from "../../common/api/ApiSearch";

const MyPage = () => {
        const [member, setMember] = useState(null);
        const [activeInfo, setActiveInfo] = useState({});

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
            </div>
        );
    }
;

export default MyPage;