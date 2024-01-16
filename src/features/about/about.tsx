import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Grandprogram from '../home/grandprogramms/grandprogramHomeOne';
import Ads from '../adversitments/adversiments';
import Anchor from '../../sharedComponents/button/anchor';
import RegularSponsorsOne from 'features/home/regulareventssponsorships/regularprogrammtwo';
import { useRedux } from 'hooks';
import AboutImage from 'features/home/about/aboutImagesection/aboutimage';
import { AboutsActions } from 'features/home/about/aboutSlice';
import { selectAboutList } from 'features/home/about/aboutSelectors';

export default function About() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(AboutsActions.fetchAboutList());
    }, [dispatch]);

    const aboutList = appSelector(selectAboutList);

    return (
        <section className="about area-padding">
            <Container>
                <Row className="justify-content-between gy-4">
                    <Col md={6} lg={6}>
                        <img alt="about" className="about-image" src={`assets/images/about/${aboutList.aboutMainSection?.aboutSection?.aboutImage}`} />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {aboutList.aboutMainSection?.aboutSection?.aboutDescription}
                        </p>
                        <div className="message-box">
                            <p> <i className="fas fa-quote-left" />{aboutList?.aboutMainSection?.aboutSection?.personQuote}. <i className="fas fa-quote-right" />
                            </p>
                            <div className="author-info">
                                <h5 className="title">{aboutList?.aboutMainSection?.aboutSection?.authorName}</h5>
                                <span>{aboutList.aboutMainSection?.aboutSection?.authorDesignation}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Col md={6} lg={6}>
                        <img alt="about" className="about-image" src={`assets/images/about/${aboutList.aboutMainSection?.aboutBooking.aboutBookingImage}`} />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {aboutList.aboutMainSection?.aboutBooking?.aboutBookingDescription}
                        </p>
                        <div>
                            <Anchor classnames="" title="Bookings" />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Col md={6} lg={6}>
                        <img alt="about" className="about-image" src={`assets/images/about/${aboutList.aboutMainSection?.aboutService.aboutserviceImage}`} />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {aboutList.aboutMainSection?.aboutService.aboutServiceDescription}
                        </p>
                        <div>
                            <Anchor classnames="" title="Service" />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Grandprogram />
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Col md={6} lg={6}>
                        <div className="temple-picture">
                            <img alt="about" className="about-image" src={`assets/images/about/${aboutList.aboutMainSection?.aboutOthers.contactUsImage}`} />
                            <div>
                                <Anchor classnames="" title="Contact Us" />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={6}>
                        <div className="temple-picture">
                            <img alt="about" className="about-image" src={`assets/images/about/${aboutList.aboutMainSection?.aboutOthers.serviceImage}`} />
                            <div>
                                <Anchor classnames="" title="Service" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <RegularSponsorsOne />
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Ads />
                </Row>
                <AboutImage />
            </Container>
        </section>
    );
}
