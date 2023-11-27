import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import useGeolocation from "react-hook-geolocation";
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./CenterMap.css";

const { kakao } = window;

const CenterMap = () => {

    useKakaoLoader()
    const [draggable, setDraggable] = useState(true);
    const [zoomable, setZoomable] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const [getLat, setGetLat] = useState(decodeURIComponent(searchParams.get('lat')));
    const [getLng, setGetLng] = useState(decodeURIComponent(searchParams.get('lng')));
    const [addressLat, setaddressLat] = useState(getLat);
    const [addressLng, setaddressLng] = useState(getLng);

    const [nowAddress, setNowAddress] = useState(false);
    const geolocation = useGeolocation({}, () => { }, nowAddress);

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
    const nav = useNavigate();
    const onClickNowAddressHandler = () => {
        nav(`/storeCreate?lat=${chgAdLat}&lng=${chgAdLng}&street_address=${addressName}`)
    }
    useEffect(() => {
        // console.log("addressName이 변경되었습니다.", addressName);
    }, [addressName, state]);
    return (
        <>
            <Map
                id="map"
                center={{
                    lat: addressLat,
                    lng: addressLng,
                }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "65vh",
                }}
                level={3} // 지도의 확대 레벨
                draggable={draggable} // 드래그 사용
                zoomable={zoomable} // 지도 줌 사용
                onDragEnd={(map) => {
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
                    // console.log(addressName);
                    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback); // 
                }
                } // 중심좌표 이동시 이벤트 사용
            >
                <div className='reportLinkButton'>
                    <p className='reportLinkButtonP'>지도를 움직여 제보하려는 가게위치를 맞춰주세요.</p>
                </div>
                {!!state ? (
                    <>
                        <MapMarker
                            position={{ lat: state.center.lat, lng: state.center.lng }}
                            image={{
                                src: "https://cdn-icons-png.flaticon.com/128/3425/3425073.png",
                                size: {
                                    width: 24,
                                    height: 35
                                },
                            }}
                            title="지도의 중심입니다."
                            clickable={true}
                            onClick={() => {
                                // console.log(position.latlng.lat, position.latlng.lng);
                                // onClickInfoHandler("open", index);
                            }}
                        />
                        {/* <div>
                            {addressName && <p>지번 주소: {addressName}</p>}
                            {roadAddressName && <p>도로명 주소: {roadAddressName}</p>}
                        </div>
                        <p>{'지도 레벨은 ' + state.level + ' 이고'}</p>
                        <p>{'중심 좌표는 위도 ' + state.center.lat + ', 경도 ' + state.center.lng + ' 입니다'}</p>
                        <button className='reportButton' onClick={onClickNowAddressHandler}>제보하기</button> */}

                        {addressName === "주소정보가 유효하지 않습니다." ? (
                            <p className='notAddress'>주소정보가 유효하지 않습니다. 지도를 다시 움직여주세요.</p>
                        ) : (
                            <>
                                <div className='reportButtonContainer'>
                                    <button className='reportContainerButton' onClick={onClickNowAddressHandler}>제보하기</button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <MapMarker
                            position={{ lat: addressLat, lng: addressLng }}
                            image={{
                                src: "https://cdn-icons-png.flaticon.com/128/3425/3425073.png",
                                size: {
                                    width: 24,
                                    height: 35
                                },
                            }}
                            title="지도의 중심입니다."
                            clickable={true}
                            onClick={() => {
                            }}
                        />
                    </>
                )}
            </Map >


        </>
    )
};
export default CenterMap; 