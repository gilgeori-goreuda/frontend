import login from './img/kakao_login.png'
import logo from './img/logo.png'
import loginBorder from './img/loginBorder3.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const CLIENT_ID = 'dd83fb5281e50c8508ffc20b8dc07799'
    // const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao'
    const REDIRECT_URI = 'https://gilgeorigoreuda.site/oauth2/callback/kakao'
    const kakao_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`


    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '95vh', // 전체 화면 높이
                border: '8px solid transparent', // 테두리 크기 설정
                backgroundImage: `url(${loginBorder})`, // 테두리 이미지 설정
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            }}>
                <div style={{
                    background: '#fff',
                    width: '80%',
                    height: '70%',
                    position: 'absolute',
                    top : '50%',
                    left: '50%',
                    transform: 'translate(-50%, -55%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <img src={logo} style={{width: '200px', height: 'auto'}}/>
                        </div>
                        <div style={{margin: '70px'}}></div>
                        <div>
                            <img src={login} onClick={() => window.location.href = kakao_URL} style={{ cursor: 'pointer' }}/>
                            <div>
                            <Link to={`/main`} style={{textDecoration: "none"}}>
                                <p className='guest' style={{
                                    border: "1px solid lightgray",
                                    borderRadius:"5px",
                                    cursor: "pointer",
                                    width: "68%",
                                    height: "38px",
                                    marginLeft: "15%",
                                    backgroundColor: "lightgray",
                                    color:"black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    fontWeight: "600"                                    
                                }}>게스트 입장</p>
                                </Link>
                                <p className='guestEx' style={{
                                    // border: "1px solid lightgray",
                                    borderRadius:"5px",
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "38px",
                                    // marginLeft: "25%",
                                    // backgroundColor: "lightgray",
                                    // display: "flex",
                                    // alignItems: "center",
                                    // justifyContent: "center",
                                    color: "gray",
                                    fontSize: "13px",
                                    fontWeight: "600"                                    
                                }}>(게스트 입장은 일부 기능 사용이 제한됩니다.)</p>
                            </div>
                        </div>
                        <div style={{margin: '30px'}}></div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Login