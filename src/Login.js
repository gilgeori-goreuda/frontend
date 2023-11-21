import login from './img/kakao_login.png'

const Login = () => {
    const CLIENT_ID = 'dd83fb5281e50c8508ffc20b8dc07799'
    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao'
    const kakao_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`


    return (
        <div>
            <img src={login} onClick={() => window.location.href = kakao_URL}/>
        </div>
    )
}
export default Login