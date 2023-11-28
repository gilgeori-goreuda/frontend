import { useEffect } from "react";
import axios from "axios";
import './CallBack.css'

const KakaoCallBack = () => {

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
            const res = await axios.post('http://3.38.251.85/login/kakao', {
                code: code
            });
            // 여기서 res로 받은 액세스 토큰 저장
            localStorage.setItem('accessToken', res.data.accessToken)
            console.log(res.data);
            window.location.href = '/main'
        } catch (error) {
            console.error("로그인 오류", error);
        }
    }


    return (
        <div className="LoginHandeler">
            <div className="loding">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>

            </div>
        </div>
    );
}
export default KakaoCallBack