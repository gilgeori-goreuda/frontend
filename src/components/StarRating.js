import React from 'react';
import starFilled from "../img/star_filled2.png";
import starEmpty from "../img/Star-empty.png";

const StarRating = ({rating}) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars.push(<img key={i} src={starFilled} alt={`Star ${i}`}/>);
        } else {
            stars.push(<img key={i} src={starEmpty} alt={`Star ${i}`}/>);
        }
    }
    return <div>{stars}</div>;

}
export default StarRating;
