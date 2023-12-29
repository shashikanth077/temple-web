import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { selectAboutList } from './aboutSelectors';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { useRedux } from 'hooks';

/* eslint max-len: ["error", { "code": 400 }] */
export default function Homeabout() {
    const { appSelector } = useRedux();
    const aboutHome = appSelector(selectAboutList);

    return (
        <section className="home-about area-padding">
            <Container>
                <Row className="justify-content-between gy-4">
                    <Col xs={12} md={6} lg={6}>
                        <img alt="about" src={`assets/images/about/${aboutHome.homeaboutDescription.image}`} />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="">
                        <p className="about-description">
                            {aboutHome.homeaboutDescription.description}
                        </p>
                        <ViewMore classnames="home-about-readmore" title="View More" />
                    </Col>
                </Row>

            </Container>
        </section>
    );
}
