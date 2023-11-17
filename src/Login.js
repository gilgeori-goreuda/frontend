const Login = () => {
    const CLIENT_ID = '92c750c4838ccb15f3d0313f33ec5dde'
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback'
    const kakao_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    return (
        <button onClick={() => window.location.href = kakao_URL} />

    )
}
export default Login