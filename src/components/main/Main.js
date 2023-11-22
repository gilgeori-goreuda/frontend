import MainService from "./MainService";
import StaticService from "./StaticService";
import {useEffect, useState} from "react";
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css'

const Main = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 10
    };

    const [newPlaces, setNewPlaces] = useState([]);
    const [hotPlaces, setHotPlaces] = useState([]);
    const [topPlaces, setTopPlaces] = useState([]);

    useEffect(() => {
        const fetchNewPlace = async () => {
            try {
                const res = await MainService.getNewPlace();

                setNewPlaces(res.data.recommendPlace);
                console.log(res.data.recommendPlace)

            } catch (error) {
                console.error('Error fetching newPlace:', error);
            } finally {
            }
        };

        fetchNewPlace();
    }, []);

    useEffect(() => {
        const fetchHotPlace = async () => {
            try {
                const res = await MainService.getHotPlace();

                setHotPlaces(res.data.recommendPlace);
                console.log(res.data.recommendPlace)

            } catch (error) {
                console.error('Error fetching hotPlace:', error);
            } finally {
            }
        };

        fetchHotPlace();
    }, []);

    useEffect(() => {
        const fetchTopPlace = async () => {
            try {
                const res = await StaticService.getTop10Place();

                setTopPlaces(res.data.hotPlaceResponses);
                console.log(res.data.hotPlaceResponses)

            } catch (error) {
                console.error('Error fetching topPlaces:', error);
            } finally {
            }
        };

        fetchTopPlace();
    }, []);

    return (
        <div className={"main"}>

            <h2> 오늘의 신규 장소 </h2>
            <div className={"place"}>
                <Slider {...settings}>
                    {newPlaces && newPlaces.map((newPlace, index) => (
                        <div key={index}>
                            <div><img src={newPlace.imageUrl}/></div>
                            <div>{newPlace.name}</div>
                            <div>{newPlace.openTime} ~ {newPlace.closeTime}</div>
                            <p>streetAddr: {newPlace.streetAddress}</p>
                            <p>detailAddr: {newPlace.detailLocation}</p>
                        </div>
                    ))}
                </Slider>
            </div>
            
            <h2> 오늘의 인기 장소 </h2>
            <div className={"place"}>
                <Slider {...settings}>
                    {hotPlaces && hotPlaces.map((hotPlace, index) => (
                        <div key={index}>
                            <div><img src={hotPlace.imageUrl}/></div>
                            <div>{hotPlace.name}</div>
                            <div>{hotPlace.openTime} ~ {hotPlace.closeTime}</div>
                            <p>streetAddr: {hotPlace.streetAddress}</p>
                            <p>detailAddr: {hotPlace.detailLocation}</p>
                        </div>
                    ))}
                </Slider>
            </div>

            <h2> 실시간 인기 장소 </h2>
            <div className={"top10"}>
                {topPlaces && topPlaces.map((topPlace, index) => (
                    <div key={index}>
                        <li>{index + 1} {topPlace.name}</li>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Main;