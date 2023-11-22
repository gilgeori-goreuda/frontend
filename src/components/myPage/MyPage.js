import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Center from "./Center";
import axios from 'axios';
// import '../../styles/styles.css';

const MyPage = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState(null);

    const storeId = 10;
    const memberId = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fakeMember = {
                    memberId: 1,
                    nickname: "테스트유저",
                    profileImageUrl: "https://example.com/profile.jpg",
                    memberLevel: "길잘알",
                    createdAt: new Date(2023, 5, 30),
                    // 다른 필요한 데이터 추가
                };
                setMember(fakeMember);
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        };

        fetchData();
    }, [memberId]);

    const MyPageSelect = () => {
        navigate(`/myPageSelect`);
    };

    return (
        <div className="App">
            <Center>
                <div>
                    <div>
                        <h1>{member ? `안녕하세요, ${member.nickname}님!` : ''}</h1>
                        {member && (
                            <div>
                                <img src={member.profileImageUrl} alt="프로필 이미지" />
                                <p>{`등급: ${member.memberLevel}`}</p>
                                <p>{`가입 날짜: ${member.createdAt.toLocaleDateString()}`}</p>
                            </div>
                        )}
                    </div>
                    <div className="button_container">
                        {/* 필요한 버튼 추가 */}
                        <button onClick={MyPageSelect} className="selectButton">조회</button>
                    </div>
                </div>
            </Center>
        </div>
    );
};

export default MyPage;