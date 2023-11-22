import login from './img/kakao_login.png'
import logo from './img/logo.png'
import loginBorder from './img/loginBorder3.jpg';

const Login = () => {
    const CLIENT_ID = 'dd83fb5281e50c8508ffc20b8dc07799'
    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao'
    const kakao_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`


    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // 전체 화면 높이
                border: '8px solid transparent', // 테두리 크기 설정
                backgroundImage: `url(${loginBorder})`, // 테두리 이미지 설정
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            }}>
                <div style={{background: '#fff', width: '80%', height: '70%', position: 'absolute', top : '50%', left: '50%', transform: 'translate(-50%, -55%)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div>
                        <div>
                            <img src={logo} style={{width: '200px', height: 'auto'}}/>
                        </div>
                        <div style={{margin: '30px'}}></div>
                        <div>
                            <img src={login} onClick={() => window.location.href = kakao_URL}/>
                        </div>
                        <div style={{margin: '30px'}}></div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Login