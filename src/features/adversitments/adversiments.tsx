import Container from 'react-bootstrap/Container';
import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectStaticContentHome } from '../content/contactSelectors';

import useRedux from 'hooks/useRedux';

const Ads = () => {
    const { appSelector } = useRedux();

    const adsList:any = appSelector(selectStaticContentHome);

    return (
        <section className="advertises area-padding">
            <Container>
                <Row>
                    {adsList?.adverstiments.map((adsItem:any, index:any) => (
                        <Col key={adsItem.ads_id} lg={3} md={6}>
                            <div className="single-ads-wrap mb-2">
                                <div className="position-relative overflow-hidden rounded">
                                    <img
                                        src={`assets/images/advertisments/${adsItem.ads_image}`}
                                        alt=""
                                        className="img-fluid d-block mx-auto shadow"
                                    />
                                    <div className="advertise-overlay">
                                        <div className="advertise-content">
                                            <a aria-label="Eye-icon" href="/">
                                                <div className="advertise-icon">
                                                    <i>
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-eye "
                                                        >
                                                            <g>
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </g>
                                                        </svg>
                                                    </i>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Ads;
