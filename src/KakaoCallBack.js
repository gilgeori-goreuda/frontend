import {login} from "./common/api/ApiGetService";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
const KakaoCallBack = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();
    useEffect(async () =>{
            //     {
            //     await login(code)
            //         .then((response) => response.data.isMember)
            //         .catch((err) => {
            //             console.log("aa");
            //         })
            // }
            try {
                const response = await login(code);
                const isMember = response.data.isMember;
                console.log(response.data)
            } catch (err) {
                console.log("Error:", err);
            }
        }, [code]
    );


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