import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Api} from "../../common/api/ApiSearch";
import MyPagePreferences from "./MyPagePreferences";

const MyPage = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await Api(`/api/v1/members`, "GET");
    //             setMember(res.data);
    //             console.log(res.data)
    //         } catch (error) {
    //             console.log(error.response?.data);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);



    const MyPageSelect = () => {
        navigate(`/myPageSelect`);
    };

    return (
        <div className="App">
                <div>
                    {/*<div>*/}
                    {/*    <h1>{member ? `안녕하세요, ${member.nickname}님!` : ''}</h1>*/}
                    {/*    {member && (*/}
                    {/*        <div>*/}
                    {/*            <img src={member.profileImageUrl} alt="프로필 이미지" />*/}
                    {/*            <p>{`등급: ${member.memberLevel}`}</p>*/}
                    {/*            <p>{`가입 날짜: ${member.createdAt.toLocaleDateString()}`}</p>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    {/*<div className="button_container">*/}
                    {/*    /!* 필요한 버튼 추가 *!/*/}
                    {/*    <button onClick={MyPageSelect} className="selectButton">조회</button>*/}
                    {/*</div>*/}
                </div>
            <MyPagePreferences/>
        </div>
    );
};

export default MyPage;