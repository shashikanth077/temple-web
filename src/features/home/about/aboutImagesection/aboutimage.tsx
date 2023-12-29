import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { selectAboutList } from 'features/home/about/aboutSelectors';
import { AboutsActions } from 'features/home/about/aboutSlice';
import SlickSlider from 'sharedComponents/carosel/carosel';
import useRedux from 'hooks/useRedux';

/* eslint max-len: ["error", { "code": 400 }] */
export default function AboutImage() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(AboutsActions.fetchAboutList());
    }, [dispatch]);

    const aboutList = appSelector(selectAboutList);

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
                            {aboutList?.aboutImages?.map((aboutImage:any, index:number) => (
                                <div key={aboutImage.id}>
                                    <div className="slider-item">
                                        <img className={index % 2 === 0 ? 'evenabout-image' : 'oddabout-image'} alt={aboutImage.caption} src={`assets/images/about/${aboutImage.about_image}`} />
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
