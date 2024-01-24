import React, { useEffect, useState } from 'react';
import "./Report.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Api } from '../../common/api/ApiSearch';


const Report = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [getStoreId, setGetStoreId] = useState(decodeURIComponent(searchParams.get('storeId')));
    const [getLat, setGetLat] = useState(parseFloat(decodeURIComponent(searchParams.get('mLat'))));
    const [getLng, setGetLng] = useState(parseFloat(decodeURIComponent(searchParams.get('mLng'))));
    // const [reportContent, setreportContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
        const nav = useNavigate();
        const openModal = () => {
            setIsModalOpen(true);
            console.log(isModalOpen)
        };
        const closeModal = () => {
            setIsModalOpen(false);
        };
        const logoutFunction = () => {
            // 로그아웃 로직을 여기에 추가
            console.log('로그아웃되었습니다.');
            closeModal(); // 모달 닫기
            nav('/login')
            // history.push('/'); // 로그아웃 후 이동할 페이지 경로
        };
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const openReportModal = () => {
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };


    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
    };

    const textareaStyle = {
        width: '100%',
        height: '80px',
        margin: '10px 0',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const ReportButtonStyle = {
        padding: '10px',
        margin: '0 5px',
        marginTop: '5px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#e11713', // 기본 배경색
        color: '#fff', // 기본 텍스트색
        border: 'none',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease', // hover 효과
        ':hover': {
            backgroundColor: '#2980b9', // hover 배경색
        },
    };

    const CancelButtonStyle = {
        padding: '10px',
        margin: '0 5px',
        marginTop: '5px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#1e1b1b', // 기본 배경색
        color: '#fff', // 기본 텍스트색
        border: 'none',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease', // hover 효과
        ':hover': {
            backgroundColor: '#2980b9', // hover 배경색
        },
    };


    const ReportModal = ({ closeReportModal, reportSubmit }) => {
        const [reportContent, setreportContent] = useState('');
        const handleReportContentChange = (e) => {
            // setReportData({
            //     ...reportData,
            //     content: e.target.value
            // });
            setreportContent(e.target.value)
        };
        return (
            <div style={modalStyle}>
                <textarea
                    style={textareaStyle}
                    value={reportContent}
                    onChange={handleReportContentChange}
                    placeholder="신고 내용을 입력하세요"
                />
                <button
                    style={{ ...ReportButtonStyle }}
                    onClick={() => {
                        if (reportContent.trim() !== '') {
                            reportSubmit(reportContent);
                            closeReportModal();
                        } else {
                            // 신고 내용이 비어 있을 때 처리
                            alert('신고 내용을 입력하세요.');
                        }
                    }}
                >
                    신고하기
                </button>
                <button
                    style={{ ...CancelButtonStyle }}
                    onClick={closeReportModal}
                >
                    닫기
                </button>
            </div>
        );
    };


    const [triggerEffect, setTriggerEffect] = useState(false);

    const reportSubmit = async (reportContent) => {
        console.log(reportContent, 'test');
        const reportData = {
            content: reportContent,
            lat: getLat,
            lng: getLng
        };

        try {
            const res = await Api(`/api/v1/reports/stores/`
                + getStoreId
                , "POST"
                , reportData
            );
            console.log(res.data);

            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
            // console.log(error.response?.data.errorCode, 132);
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            if (error.response?.data.errorCode === "R003") {
                // 인증 가능 범위가 아닌 경우
                alert("신고하려는 가게와 사용자의 위치가 100m를 초과했습니다.");
            } else if (error.response?.data.errorCode === "R001") {
                alert("이미 신고한 가게입니다.");
            } else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
        }
        setTriggerEffect(prev => !prev);
    }

    const reportCancel = async (reportId) => {
        try {
            const res = await Api(`/api/v1/reports/stores/`
                + reportId
                , "DELETE"
            );
            console.log(res.data);

            // nav(`/main`)
        } catch (error) {
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            if (error.response?.data.errorCode === "S006") {
                // 인증 가능 범위가 아닌 경우
                alert("해당 가게의 신고자가 아닙니다. 본인이 신고한 가게만 신고 취소가 가능합니다.");
            } else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
        }
        setTriggerEffect(prev => !prev);
    }

    const [all, setAll] = useState([]);
    const getAll = async () => {
        try {
            const data = await Api(`/api/v1/reports/stores/storeCheck/`
                + getStoreId
                , "GET"
            );
            setAll(data.results);
        } catch (error) {
            console.log(error.response?.data);
            if (error.response?.data.errorCode === "T004") {
                // alert("로그인시 이용 가능합니다.");
                setIsModalOpen(true);
            }else {
                // 다른 에러 처리
                console.log(error.response?.data);
            }
            console.log(error.response?.data);
        }
    }
    useEffect(() => {
        getAll();
    }, [setGetLat, triggerEffect]);
    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // 각 부분을 원하는 형식으로 조합
        const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

        return formattedDate;
    };
    return (
        <div>
            <div className='ReportBox'>
                <h2 className='ReportH'>해당 가게의 정보가 다르면 신고해 주세요</h2>
                {/* <button onClick={() => reportSubmit()}>신고하기</button> */}
                <button className='reportBoxCss' onClick={openReportModal}>신고하기</button>
            </div>
            {isReportModalOpen && (
                <ReportModal closeReportModal={closeReportModal} reportSubmit={reportSubmit} />
            )}
            <div>
                {/* <h3>신고 리스트</h3> */}
                <div className='reportTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>회원 ID</th>
                                <th>신고 내용</th>
                                <th>신고 시간</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {all.map((position, index) => (
                                <tr key={index}>
                                    <td>{position.member.id}</td>
                                    <td>{position.content}</td>
                                    <td className='reportCreate'>{formatCreatedAt(position.createdAt)}</td>
                                    <td className='cancelReportBox'><button className='reportCancelCss' onClick={() => reportCancel(position.id)}>신고 취소</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="logoutModal">
                    <div className="logoutModal-content">
                        <span className="logoutClose" onClick={closeModal}>&times;</span>
                        <p>게스트는 제한되는 기능입니다. <br></br>로그인을 원하시면 버튼을 눌러주세요.</p>
                        <button onClick={logoutFunction} className='logoutButton'>로그아웃</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;