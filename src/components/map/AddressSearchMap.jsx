import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import useGeolocation from "react-hook-geolocation";
import { ApiNoToken } from '../../common/api/ApiSearch';
import { Link, useSearchParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./AddressSearchMap.css"

const { kakao } = window;


const AddressSearchMap = () => {

    const EventMarkerContainer = ({ position, content }) => {
        const map = useMap()
        const [isVisible, setIsVisible] = useState(false)

        return (
            <MapMarker
                position={position} // 마커를 표시할 위치
                // @ts-ignore
                onClick={(marker) => map.panTo(marker.getPosition())}
                onMouseOver={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
            >
                {isVisible && content}
            </MapMarker>
        )
    }
    useKakaoLoader()
    const [draggable, setDraggable] = useState(true);
    const [zoomable, setZoomable] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const [getLat, setGetLat] = useState(decodeURIComponent(searchParams.get('lat')));
    const [getLng, setGetLng] = useState(decodeURIComponent(searchParams.get('lng')));
    const [getMlat, setGetMlat] = useState(decodeURIComponent(searchParams.get('m_lat')));
    const [getMlng, setGetMlng] = useState(decodeURIComponent(searchParams.get('m_lng')));
    const [getStreet_address, setGetStreet_address] = useState(decodeURIComponent(searchParams.get('street_address')));

    const [addressLat, setaddressLat] = useState(getLat);
    const [addressLng, setaddressLng] = useState(getLng);
    // 37.46617739234813, 126.88947364725837 독산역


    // const geolocation = useGeolocation(); // 현재 위치 좌표
    // const geolocation = useGeolocation({}, () => { }, true);
    const [nowAddress, setNowAddress] = useState(false);
    const geolocation = useGeolocation({}, (location) => {
        // console.log(location);
        setaddressLat(location.latitude);
        setaddressLng(location.longitude);
        setGetMlat(location.latitude);
        setGetMlng(location.longitude);
        setNowAddress(false);
    }, nowAddress);

    const onClickNowAddressHandler = () => {
        setNowAddress(true);
        console.log(nowAddress);
    }
    const [category, setCategory] = useState({
        '': "전체",
        붕어빵: "붕어빵",
        호떡: "호떡",
        타코야끼: "타코야끼",
        계란빵: "계란빵",
        떡볶이: "떡볶이",
        순대: "순대",
        오뎅: "오뎅",
        와플: "와플",
        김밥: "김밥",
        꼬치: "꼬치",
        땅콩빵: "땅콩빵",
        군고구마: "군고구마",
        토스트: "토스트",
        달고나: "달고나",
        군옥수수: "군옥수수",
        탕후루: "탕후루",
        튀김: "튀김"
    });
    // console.log(Object.keys(category));
    // console.log(Object.values(category));
    const [searchCategory, setSearchCategory] = useState('');
    const [msg, setMsg] = useState('');
    const onClickSearchCategoryHandler = (categoryName) => {
        if (categoryName === '전체') {
            setSearchCategory('');
        } else {
            setSearchCategory(categoryName);
        }
    };

    const [all, setAll] = useState([]);
    const getAll = async () => {
        try {
            const data = await ApiNoToken(`/api/v1/search/address`
                + `?m_lat=${getMlat}&m_lng=${getMlng}&r_lat=${addressLat}&r_lng=${addressLng}&street_address=${getStreet_address}&food_type=${searchCategory}`
                , "GET"
            );

            setMsg(data)
            setAll(data.results);
            setGetLat('');
            setGetLng('');
            setGetStreet_address('');
        } catch (error) {
            setMsg(error.response)
            console.log(error.response?.data);
        }
    }
    useEffect(() => {
        getAll();
    }, [addressLat, addressLng, nowAddress, searchCategory]);

    const [isOpen, setIsOpen] = useState(false); // 마커 정보
    const [markerIdx, setMarkerIdx] = useState(); // 마커인덱스 정보
    const onClickInfoHandler = (state, index) => {
        setMarkerIdx(index);
        if (state == "open") {
            setIsOpen("true")
        } else if (state == "open") {
            setIsOpen("false")
        }
    }


    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    const [addressName, setAddressName] = useState(""); // 지번 주소
    const [roadAddressName, setRoadAddressName] = useState(""); // 도로명 주소
    const [chgAdLat, setChgAdLat] = useState(); // 중심좌표 이동시 
    const [chgAdLng, setChgAdLng] = useState();
    const coord = new kakao.maps.LatLng(chgAdLat, chgAdLng);
    // 이전 화살표 컴포넌트
    const CustomPrevArrow = (props) => {
        return <button {...props} type="button" className="slick-prev">Previous</button>;
    };

    // 다음 화살표 컴포넌트
    const CustomNextArrow = (props) => {
        return <button {...props} type="button" className="slick-next">Next</button>;
    };

    const settings = {
        initialSlide: 0, // 처음 보여질 슬라이드 번호
        // slide: 'div',		//슬라이드 되어야 할 태그 ex) div, li 
        infinite: true, 	//무한 반복 옵션	 
        slidesToShow: 3,		// 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 6,		//스크롤 한번에 움직일 컨텐츠 개수
        speed: 200,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        arrows: true, 		// 옆으로 이동하는 화살표 표시 여부
        dots: false, 		// 스크롤바 아래 점으로 페이지네이션 여부      
        // prevArrow: <CustomPrevArrow />,  // 이전 화살표 컴포넌트 설정
        // nextArrow: <CustomNextArrow />,
        pauseOnHover: true,		// 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
        vertical: false,		// 세로 방향 슬라이드 옵션        
        dotsClass: "slick-dots", 	//아래 나오는 페이지네이션(점) css class 지정
        draggable: true, 	//드래그 가능 여부 

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <>
            <div className='searchMapBody'>
                {/* <h1>{addressLat}</h1>
            <h1>{addressLng}</h1> */}
                <div>
                    <button id='nowAddress' onClick={() => onClickNowAddressHandler()}></button>
                </div>
                <Link to={`/addressSearch`} className='searchLinkButtonDiv'>
                    <p className='searchLink'>
                        <button className='searchLinkButton'>
                            검색
                        </button>
                    </p>

                </Link>
                {/* {geolocation.latitude && geolocation.longitude ? (
                <>
                    <ul>
                        <li>Latitude: {geolocation.latitude}</li>
                        <li>Longitude: {geolocation.longitude}</li>
                    </ul>
                </>
            ) : null} */}
                {/* 현재위치 버튼 클릭했을때만 나타나게 하려고 */}
                {/* <div>
                {searchCategory}
            </div> */}

                <Slider {...settings} className='categoryBar'>
                    {Object.entries(category).map(([key, value]) => (
                        <div className='categoryButton' key={key}>
                            <p className={`pointerAdd ${searchCategory === key ? 'category-choice' : ''}`}
                                onClick={() => onClickSearchCategoryHandler(key)}>
                                {value}
                            </p>
                        </div>
                    ))}
                </Slider>



                <Map    // 지도를 표시할 Container
                    id="map"
                    center={{
                        // 지도의 중심좌표
                        // lat: 37.54054639529186,
                        // lng: 127.06899088709292,
                        lat: addressLat,
                        lng: addressLng,
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "85vh",
                    }}
                    level={3} // 지도의 확대 레벨
                    draggable={draggable} // 드래그 사용
                    zoomable={zoomable} // 지도 줌 사용
                    onDragEnd={(map) => {
                        // console.log("Center Changed: ", map.getCenter().getLat(), map.getCenter().getLng());
                        // console.log(map);
                        setaddressLat(map.getCenter().getLat());
                        setaddressLng(map.getCenter().getLng());

                        // 좌표 주소로 변환
                        setChgAdLat(map.getCenter().getLat());
                        setChgAdLng(map.getCenter().getLng());
                        const callback = (result, status) => {
                            if (status === kakao.maps.services.Status.OK) {
                                const arr = { ...result };
                                // const _arr = arr[0].address.region_2depth_name;
                                // console.log(arr[0].address.address_name);  // 지번 주소
                                // console.log(arr[0].road_address.address_name);  // 도로명 주소
                                setAddressName(arr[0].address.address_name);
                                setRoadAddressName(!!arr[0].road_address ? arr[0].road_address.address_name : "");
                            } else {
                                setAddressName("주소정보가 유효하지 않습니다.");
                                setRoadAddressName("주소정보가 유효하지 않습니다.");
                            }
                        }
                        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback); // 
                    }
                    } // 중심좌표 이동시 이벤트 사용
                >



                    {geolocation.latitude && geolocation.longitude ? (
                        <>
                            <MapMarker
                                // key={`${position.title}-${position.latlng}`}
                                // position={position.latlng} // 마커를 표시할 위치
                                position={{ lat: geolocation.latitude, lng: geolocation.longitude }} // 위와 같은코드
                                image={{
                                    src: "https://cdn-icons-png.flaticon.com/128/10875/10875653.png", // 마커 이미지의 주소입니다.
                                    size: {
                                        width: 24,
                                        height: 35
                                    }, // 마커 이미지의 크기입니다
                                }}
                                title="지도의 중심입니다." // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                                onClick={() => {
                                    // console.log(position.latlng.lat, position.latlng.lng);
                                    // onClickInfoHandler("open", index);
                                }}
                            ></MapMarker>
                        </>
                    ) : null}
                    {/* 현재위치 버튼 클릭했을때만 나타나게 하려고 */}

                    {console.log(all)}

                    {all.map((position, index) => {
                        // console.log(position);
                        let imgType = "";
                        if (position.storeType == "FOOD_STALL") {
                            imgType = "https://cdn-icons-png.flaticon.com/128/5977/5977373.png";
                        } else {
                            imgType = "https://cdn-icons-png.flaticon.com/128/7566/7566122.png";
                        }
                        return (
                            <MapMarker
                                key={index}
                                // position={position.latlng} // 마커를 표시할 위치
                                position={{ lat: position.lat, lng: position.lng }} // 위와 같은코드

                                image={{
                                    src: imgType,
                                    size: {
                                        width: 25,  // 뷰포트 너비의 10%
                                        height: 25, // 뷰포트 높이의 10%
                                    },
                                }}
                                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                                onClick={() => {
                                    // console.log(position.lat, position.lng);
                                    onClickInfoHandler("open", index);
                                }}
                            >
                                {isOpen && markerIdx == index && (
                                    <div style={{ minWidth: "150px" }}>
                                        <img
                                            alt="close"
                                            width="14"
                                            height="13"
                                            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                                            style={{
                                                position: "absolute",
                                                right: "5px",
                                                top: "5px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setIsOpen(false)}
                                        />
                                        <div style={{ padding: "5px", color: "#000" }}> {position.name}</div>
                                    </div>
                                )
                                }
                            </MapMarker>
                        );
                    })}
                </Map >

            </div>
        </>
    )
};
export default AddressSearchMap; 