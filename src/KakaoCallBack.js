import {login} from "./common/api/ApiGetService";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const KakaoCallBack = () => {
    // const code = new URL(window.location.href).searchParams.get("code");
    // const navigate = useNavigate();

    useEffect(() => {
        // URL에서 code 파라미터 추출
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get("code");

        if (authorizationCode) {
            sendAuthorizationCode(authorizationCode);
        }
    }, [])

    const sendAuthorizationCode = async (code) => {
        try {
            const res = await axios.post('http://localhost:8080/login/kakao', {
                code: code
            });
            // 여기서 res로 받은 액세스 토큰 저장
            localStorage.setItem('accessToken', res.data.accessToken)
            console.log(res.data);
            window.location.href = '/community'
        } catch (error) {
            console.error("로그인 오류", error);
        }
    }


    return (
        <div className="LoginHandeler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>
    );
}
export default KakaoCallBack