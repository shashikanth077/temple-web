import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { selectStaticAbout } from 'contents/content/contactSelectors';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { useRedux } from 'hooks';

export default function Homeabout() {
    const { appSelector } = useRedux();
    const aboutHome = appSelector(selectStaticAbout);

    return (
        <section className="home-about area-padding">
            <Container>
                <Row className="justify-content-between gy-4">
                    <Col md={6} lg={6}>
                        <img
                            alt="about"
                            src={`assets/images/about/${aboutHome?.HomeaboutDescription?.image}`}
                        />
                    </Col>
                    <Col md={6} lg={6} className="">
                        <p className="about-description">
                            {aboutHome?.HomeaboutDescription?.description}
                        </p>
                        <ViewMore
                            classnames="home-about-readmore"
                            title="View More"
                            url="/about"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
