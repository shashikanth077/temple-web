import React, { useRef } from 'react';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.css';
import { Prevarrow, Nextarrow } from './Arrows/arrows';

interface SlickProps {
    children:any;
    arrowClassPrev:string;
    arrowClassNext:string;
    NumOfSlide?:number;
    autoPly?:boolean;
    dotsStatus?:boolean;
    autoplaySpeedVal?:number;
}

function SlickSlider(props:SlickProps) {
    const {
        children, arrowClassPrev, arrowClassNext, dotsStatus, autoplaySpeedVal, NumOfSlide, autoPly,
    } = props;

    const sliderRef = useRef<any>();
    const sliderNext = () => {
        sliderRef.current?.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current?.slickPrev();
    };

    const settings = {
        dots: dotsStatus,
        autoplay: autoPly,
        ref: sliderRef,
        autoplaySpeed: autoplaySpeedVal,
        adaptiveHeight: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: NumOfSlide,
        slidesToScroll: 1,
    };
    return (
        /* eslint-disable react/jsx-props-no-spreading */
        <>
            {arrowClassPrev !== 'aboutimages-home-next-pr' ? <Prevarrow classes={arrowClassPrev} onEvent={sliderPrev} />
                : ''}
            <Slick {...settings}>
                {children}
            </Slick>
            {arrowClassPrev !== 'aboutimages-home-next-pr' ? <Nextarrow classes={arrowClassNext} onEvent={sliderNext} />
                : ''}
        </>
    );
}

SlickSlider.defaultProps = {
    NumOfSlide: 1,
    autoPly: true,
    dotsStatus: false,
    autoplaySpeedVal: 1000,
};

export default SlickSlider;
