import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Grandprogram = (props:{title:string, url:string}) => {
    const { title, url } = props;

    return (
        <section className="area-padding grand-program">
            <Container>
                <Row className="justify-content-between align-items-center gy-4">
                    <Col md={9} lg={10}>
                        <div className="grand-program-section">
                            <div className="grand-item">
                                {title}
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={2}>
                        <a href={url} className="anchor-box">Donate Now</a>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Grandprogram;
