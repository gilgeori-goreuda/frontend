import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import useGeolocation from "react-hook-geolocation";

const { kakao } = window;

const MainMap = () => {
    const data = [
        {
            content: <div style={{ color: "#000" }}>카카오</div>,
            latlng: { lat: 33.450705, lng: 126.570677 },
        },
        {
            content: <div style={{ color: "#000" }}>생태연못</div>,
            latlng: { lat: 33.450936, lng: 126.569477 },
        },
        {
            content: <div style={{ color: "#000" }}>텃밭</div>,
            latlng: { lat: 33.450879, lng: 126.56994 },
        },
        {
            content: <div style={{ color: "#000" }}>근린공원</div>,
            latlng: { lat: 33.451393, lng: 126.570738 },
        },
    ]

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
    const [addressLat, setaddressLat] = useState(37.46617739234813);
    const [addressLng, setaddressLng] = useState(126.88947364725837);
    // 37.46617739234813, 126.88947364725837 독산역
    const onClickAddressHandler = (address, lat, lng) => {
        if (address == "konkuk") {
            // setLat(37.54054639529186);
            // setlng(127.06899088709292);
            setaddressLat(lat);
            setaddressLng(lng);
        } else if (address == "doksan") {
            // setLat(37.46617739234813);
            // setlng(126.88947364725837);
            setaddressLat(lat);
            setaddressLng(lng);
        }
    }

    // const geolocation = useGeolocation(); // 현재 위치 좌표
    // const geolocation = useGeolocation({}, () => { }, true);
    const [nowAddress, setNowAddress] = useState(false);
    const geolocation = useGeolocation({}, () => { }, nowAddress);
    const onClickNowAddressHandler = () => {
        setNowAddress(true);
        // console.log(geolocation.latitude, geolocation.longitude)
        setaddressLat(geolocation.latitude);
        setaddressLng(geolocation.longitude);
        // 현재위치로 지도 이동
    }
    // const getAll = async () => {
    //     try {
    //         const data = await gatherApiNoToken(`/api/v1/gathers` +
    //             `?page=${page}&size=${size}`, "GET");
    //         console.log(data)
    //         setAll(data);


    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // }
    // useEffect(() => {
    //     getAll();
    // }, [page, size]);
    useEffect(() => {

    }, [addressLat, addressLng]);
    const positions = [
        {
            title: "파리바게뜨",
            image: "https://cdn-icons-png.flaticon.com/128/7566/7566122.png",
            latlng: { lat: 37.466538060166506, lng: 126.88975571415195 },
        },
        {
            title: "독산역",
            image: "https://cdn-icons-png.flaticon.com/128/8786/8786996.png",
            latlng: { lat: 37.46615937744199, lng: 126.88947932570773 },
        },
        {
            title: "기업은행",
            image: "https://cdn-icons-png.flaticon.com/128/8652/8652598.png",
            latlng: { lat: 37.46718058612362, lng: 126.88795178089542 },
        },
    ]
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
    const [state, setState] = useState();

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    const [addressName, setAddressName] = useState(""); // 지번 주소
    const [roadAddressName, setRoadAddressName] = useState(""); // 도로명 주소
    const [chgAdLat, setChgAdLat] = useState(); // 중심좌표 이동시 
    const [chgAdLng, setChgAdLng] = useState();
    const coord = new kakao.maps.LatLng(chgAdLat, chgAdLng);


    return (
        <>
            <button onClick={() => onClickAddressHandler('konkuk', 37.54054639529186, 127.06899088709292)}>건대역</button>
            <button onClick={() => onClickAddressHandler('doksan', 37.46617739234813, 126.88947364725837)}>독산역</button>
            {/* 위 부분이 목록으로 나오면 될듯 map돌려서 */}
            <button onClick={() => onClickNowAddressHandler()}>현재위치</button>
            {geolocation.latitude && geolocation.longitude ? (
                <>
                    <ul>
                        <li>Latitude: {geolocation.latitude}</li>
                        <li>Longitude: {geolocation.longitude}</li>
                    </ul>
                </>
            ) : null}
            {/* 현재위치 버튼 클릭했을때만 나타나게 하려고 */}

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
                    width: "80%",
                    height: "350px",
                }}
                level={3} // 지도의 확대 레벨
                draggable={draggable} // 드래그 사용
                zoomable={zoomable} // 지도 줌 사용
                onCenterChanged={(map) => {
                    // console.log("Center Changed: ", map.getCenter().getLat(), map.getCenter().getLng());
                    // console.log(map);
                    setState({
                        level: map.getLevel(),
                        center: {
                            lat: map.getCenter().getLat(),
                            lng: map.getCenter().getLng(),
                        }
                    });
                    // 좌표 주소로 변환
                    setChgAdLat(map.getCenter().getLat());
                    setChgAdLng(map.getCenter().getLng());
                    const callback = (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            const arr = { ...result };
                            const _arr = arr[0].address.region_2depth_name;
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

                {!!state && (
                    <>
                        <MapMarker
                            // key={`${position.title}-${position.latlng}`}
                            // position={position.latlng} // 마커를 표시할 위치
                            position={{ lat: state.center.lat, lng: state.center.lng }} // 위와 같은코드
                            image={{
                                src: "https://cdn-icons-png.flaticon.com/128/3425/3425073.png", // 마커 이미지의 주소입니다.
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
                        >
                            <div>
                                중심좌표
                                {addressName && <p>지번 주소: {addressName}</p>}
                                {roadAddressName && <p>도로명 주소: {roadAddressName}</p>}
                            </div>
                        </MapMarker>

                        <p>{'지도 레벨은 ' + state.level + ' 이고'}</p>
                        <p>{'중심 좌표는 위도 ' + state.center.lat + ', 경도 ' + state.center.lng + ' 입니다'}</p>
                    </>
                )}

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
                        >현재좌표</MapMarker>
                    </>
                ) : null}
                {/* 현재위치 버튼 클릭했을때만 나타나게 하려고 */}

                {positions.map((position, index) => {
                    // console.log(position);
                    return (
                        <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            // position={position.latlng} // 마커를 표시할 위치
                            position={{ lat: position.latlng.lat, lng: position.latlng.lng }} // 위와 같은코드
                            image={{
                                src: position.image, // 마커 이미지의 주소입니다.
                                size: {
                                    width: 24,
                                    height: 35
                                }, // 마커 이미지의 크기입니다
                            }}
                            title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                            onClick={() => {
                                console.log(position.latlng.lat, position.latlng.lng);
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
                                    <div style={{ padding: "5px", color: "#000" }}> {position.title}{index}</div>
                                </div>
                            )
                            }
                        </MapMarker>
                    );
                })}
            </Map >


        </>
    )
};
export default MainMap; 