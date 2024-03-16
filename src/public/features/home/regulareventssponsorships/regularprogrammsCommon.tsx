/* eslint-disable */
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RegularSponsorsCommon = (props: {
    title1: string;
    title2: string;
    url1: string;
    url2: string;
    buttonTitle: string;
}) => {
    const { title1, title2, url1, url2, buttonTitle } = props;

    return (
        <section className="regular-event-sponsors area-padding">
            <Container>
                <Row>
                    <Col
                        lg={6}
                        md={12}
                        className="d-flex flex-column flex-md-row justify-content-between"
                    >
                        <span>{title1}</span>
                        <a href={url1} className="anchor-box btn btn-link">
                            {buttonTitle}
                        </a>
                    </Col>
                    <Col
                        lg={6}
                        md={12}
                        className="d-flex flex-column flex-md-row justify-content-between mt-md-3 mt-md-0"
                    >
                        <span>{title2}</span>
                        <a href={url2} className="anchor-box btn btn-link">
                            {buttonTitle}
                        </a>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default RegularSponsorsCommon;
