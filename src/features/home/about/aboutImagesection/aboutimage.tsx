import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { selectStaticAbout } from 'features/content/contactSelectors';
import SlickSlider from 'sharedComponents/carosel/carosel';
import useRedux from 'hooks/useRedux';

/* eslint max-len: ["error", { "code": 400 }] */
export default function AboutImage() {
    const { appSelector } = useRedux();

    const aboutList = appSelector(selectStaticAbout);
    console.table(aboutList);

    return (
        <section className="home-about area-padding">
            <Container>
                <Row>
                    <div className="home-slider-images">
                        <SlickSlider
                            arrowClassPrev="aboutimages-home-next-pr"
                            arrowClassNext="aboutimages-home-prev-ar"
                            NumOfSlide={3}
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
