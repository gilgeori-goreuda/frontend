import login from './img/kakao_login.png'
import {useEffect} from "react";
import axios from "axios";

const Login = () => {
    const CLIENT_ID = 'dd83fb5281e50c8508ffc20b8dc07799'
    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao'
    const kakao_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    // const fetchProtectedData = async () => {
    //     try {
    //         const accessToken = localStorage.getItem('accessToken');
    //         const res = await axios.get({kakao_URL});
    //         // 받은 데이터 처리
    //         console.log(res.data);
    //     } catch (error) {
    //         console.error("데이터 요청 오류", error);
    //         // 토큰 만료나 인증 오류 처리
    //     }
    // }


    return (
        <div>
            <img src={login} onClick={() => window.location.href = kakao_URL}/>
        </div>
    )
}
export default Login