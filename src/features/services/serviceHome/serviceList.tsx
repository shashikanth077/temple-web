import React, { useEffect } from 'react';
import {
    Col, Container, Row,
} from 'react-bootstrap';
import { selectServiceList } from '../serviceSelector';
import { serviceActions } from '../serviceSlice';
import useRedux from 'hooks/useRedux';
import CardBox from 'sharedComponents/cards/card';
import SlickSlider from 'sharedComponents/carosel/carosel';
import { getStaticContent } from 'utils/contentUtil';
import { selectStaticContentServices } from 'features/content/contactSelectors';

export default function Services() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(serviceActions.fetchServiceList());
    }, [dispatch]);

    const serviceList = appSelector(selectServiceList);
    const staticContent = appSelector(selectStaticContentServices);

    return (
        <section data-test-id="6457775" className="services-home area-padding">
            <Container>
                <Row className="justify-content-right">

                    <Col lg={7}>
                        <div className="text-right mb-3">
                            <h2 className="">{getStaticContent(staticContent?.homeServiceheading)}</h2>
                        </div>
                    </Col>

                </Row>

                <Row>
                    <div className="slider-area">
                        <SlickSlider
                            arrowClassPrev="service-home-next-pr"
                            arrowClassNext="service-home-prev-ar"
                            NumOfSlide={4}
                            autoPly
                            autoplaySpeedVal={5000}
                        >
                            {serviceList.map((service, index) => (
                                <div key={service.id}>
                                    <div className="slider-item">
                                        <CardBox
                                            buttonStatus={false}
                                            imageStatus={false}
                                            cardClass="service-box"
                                            description={service.service_description}
                                            title="Services"
                                            buttontitle="Read More"
                                            buttonClass="read-wtbtn-more float-right"
                                        />
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
