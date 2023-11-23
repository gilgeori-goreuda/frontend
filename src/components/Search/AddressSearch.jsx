import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AddressSearch.css';
import useGeolocation from 'react-hook-geolocation';

const { kakao } = window;


const AddressSearch = () => {

    const [InputText, setInputText] = useState('')
    const [searchPlace, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
    }
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState([]);

    const [nowAddress, setNowAddress] = useState(false);
    // const onClickNowAddressHandler = () => {
    //     setNowAddress(true);
    //     console.log(nowAddress);
    // }
    const [getMlat, setGetMlat] = useState('');
    const [getMlng, setGetMlng] = useState('');
    const geolocation = useGeolocation({}, (location) => {
        // console.log(123);
        // console.log(location);
        setGetMlat(location.latitude);
        setGetMlng(location.longitude);
        setNowAddress(false);
        // console.log(nowAddress);
    }, nowAddress);
    const onClickNowAddressHandler = () => {
        setNowAddress(true);
        // console.log(nowAddress);
    }

    const createDynamicPath = (item) => {
        return `/api/v1/search/address?lat=${item.y}&lng=${item.x}&street_address=${item.address_name}&m_lat=${getMlat}&m_lng=${getMlng}`;
    };

    useEffect(() => {
        if (!searchPlace) {
            return;
        }
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        const ps = new kakao.maps.services.Places();
        const placesSearchCB = (data, status, pagination) => {
            // console.log("데이터 : ", data, "상태 : ", status, "페이지 : ", pagination, { searchPlace });
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                displayPagination(pagination);
                setPlaces(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 없습니다.');
                setPlaces([]);
                let paginationEl = document.getElementById('pagination'),
                    fragment = document.createDocumentFragment(),
                    i;
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild(paginationEl.lastChild);
                }

            }
        };
        const options = {
            page: 1,  // 페이지 번호
            size: 15  // 한 페이지에 보여질 결과 수
        };

        ps.keywordSearch(searchPlace, placesSearchCB, options);


        // 검색결과 목록 하단에 페이지 번호 표시
        const displayPagination = (pagination) => {
            let paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                const el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = ((i) => () => {
                        pagination.gotoPage(i);
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        };

    }, [searchPlace]);

    return (
        <div>
            <div className='searchList'>
                {/* <div className='headerBar'> */}
                <div className='searchbar'>
                    <div className="searchbar-left">
                        <a href="#" className="btn-back">
                        </a>
                    </div>
                    <form className="searchInputForm" onSubmit={handleSubmit}>
                        <input autoFocus className='searchInputText' placeholder="구, 동, 건물명, 역 등으로 검색" title="예시: 건대입구역" onChange={onChange} value={InputText} />
                        <button className='searchButton' onClick={() => onClickNowAddressHandler()} type="submit">검색</button>
                    </form>
                </div>
                {/* </div> */}
                <div id="result-list">
                    {Places.length != 0 ? Places.map((item, i) => (
                        // <Link className='decoRemove' key={i}
                        //     to={`/api/v1/search/address?lat=${item.y}&lng=${item.x}&street_address=${item.address_name}`}>
                        <Link className='decoRemove' to={createDynamicPath(item)} key={i}>
                            <div className="result-item">
                                <h5 style={{ textDecoration: 'none' }}>{item.place_name}</h5>
                                {item.road_address_name ? (
                                    <div>
                                        <span><b className='road_address'>도로명</b> {item.road_address_name}</span>
                                        <span><b className='just_address'>지번</b> {item.address_name}</span>
                                        {/* <span>경도: {item.x}</span><br /> */}
                                        {/* <span>위도: {item.y}</span> */}
                                    </div>
                                ) : (
                                    <span><b className='just_address'>지번</b>{item.address_name}</span>
                                )}
                            </div>
                        </Link>
                    )) : <p className='notContentsText'>검색어를 입력해 주세요.</p>}
                    <div id="pagination"></div>
                </div>
            </div>
        </div >
    );
};

export default AddressSearch;
