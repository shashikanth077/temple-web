import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Grandprogram from '../home/grandprogramms/grandprogramHomeOne';
import Ads from '../adversitments/adversiments';
import Anchor from '../../sharedComponents/button/anchor';
import RegularSponsorsOne from 'features/home/regulareventssponsorships/regularprogrammtwo';
import { useRedux } from 'hooks';
import AboutImage from 'features/home/about/aboutImagesection/aboutimage';
import { selectStaticAbout } from 'features/content/contactSelectors';
import Heading from 'sharedComponents/heading/heading';

export default function About() {
    const { appSelector } = useRedux();
    const aboutList = appSelector(selectStaticAbout);

    return (
        <section className="about area-padding">
            <Container>
                <div className="col-lg-12">
                    <div className="title-box text-center">
                        <Heading
                            headingWrapClass="heading-head-wrap"
                            title="About"
                            classes="text-center mt-3"
                            align="text-center"
                        />
                    </div>
                </div>
                <Row className="justify-content-between gy-4">
                    <Col md={6} lg={6}>
                        <img
                            alt="about"
                            className="about-image"
                            src={`assets/images/about/${aboutList.AboutMainSection?.AboutSection?.aboutImage}`}
                        />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {
                                aboutList.AboutMainSection?.AboutSection
                                    ?.aboutDescription
                            }
                        </p>
                        <div className="message-box">
                            <p>
                                {' '}
                                <i className="fas fa-quote-left" />
                                {
                                    aboutList?.AboutMainSection?.AboutSection
                                        ?.personQuote
                                }
                                . <i className="fas fa-quote-right" />
                            </p>
                            <div className="author-info">
                                <h5 className="title">
                                    {
                                        aboutList?.AboutMainSection
                                            ?.AboutSection?.authorName
                                    }
                                </h5>
                                <span>
                                    {
                                        aboutList.AboutMainSection?.AboutSection
                                            ?.authorDesignation
                                    }
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Col md={6} lg={6}>
                        <img
                            alt="about"
                            className="about-image"
                            src={`assets/images/about/${aboutList.AboutMainSection?.AboutBooking.aboutBookingImage}`}
                        />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {
                                aboutList.AboutMainSection?.AboutBooking
                                    ?.aboutBookingDescription
                            }
                        </p>
                        <div>
                            <Anchor classnames="" title="Bookings" />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-2 gy-4">
                    <Col md={6} lg={6}>
                        <img
                            alt="about"
                            className="about-image"
                            src={`assets/images/about/${aboutList?.AboutMainSection?.AboutService?.aboutserviceImage}`}
                        />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {
                                aboutList.AboutMainSection?.AboutService
                                    ?.aboutServiceDescription
                            }
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
                            <img
                                alt="about"
                                className="about-image"
                                src={`assets/images/about/${aboutList.AboutMainSection?.AboutOthers?.contactUsImage}`}
                            />
                            <div>
                                <Anchor classnames="" title="Contact Us" />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={6}>
                        <div className="temple-picture">
                            <img
                                alt="about"
                                className="about-image"
                                src={`assets/images/about/${aboutList.AboutMainSection?.AboutOthers?.serviceImage}`}
                            />
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
