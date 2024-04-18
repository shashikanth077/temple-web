import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { selectStaticAbout } from 'contents/content/contactSelectors';
import SlickSlider from 'sharedComponents/carosel/carosel';
import useRedux from 'hooks/useRedux';

/* eslint max-len: ["error", { "code": 400 }] */
export default function AboutImage() {
    const { appSelector } = useRedux();
    /* eslint-disable */
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [slideOnPage, setSlideOnPage] = useState(1);
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        if (screenWidth < 768) {
            setSlideOnPage(1);
        } else {
            setSlideOnPage(3);
        }
      }, [screenWidth]);
      
    const aboutList = appSelector(selectStaticAbout);

    return (
        <section className="home-about area-padding">
            <Container>
                <Row>
                    <div className="home-slider-images">
                        <SlickSlider
                            arrowClassPrev="aboutimages-home-next-pr"
                            arrowClassNext="aboutimages-home-prev-ar"
                            NumOfSlide={slideOnPage}
                            autoPly
                            autoplaySpeedVal={2000}
                        >
                            {aboutList?.AboutImages?.map((aboutImage:any, index:number) => (
                                <div key={aboutImage.id}>
                                    <div className="slider-item">
                                        <img className={index % 2 === 0 ? 'evenabout-image' : 'oddabout-image'} alt={aboutImage.caption} src={`assets/images/about/${aboutImage.Image}`} />
                                    </div>
                                </div>
                            ))}
                        </SlickSlider>
                    </div>
                </Row>
            </Container>
        </section>
    );
}
