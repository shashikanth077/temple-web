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
            <div className="col-md-6">
                <div className="d-flex flex-column align-items-center">
                <span>{title1}</span>
                <a href={url1} className="anchor-box btn btn-link">{buttonTitle}</a>
                </div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-column align-items-center">
                <span>{title2}</span>
                <a href={url2} className="anchor-box btn btn-link">{buttonTitle}</a>
                </div>
            </div>
            </Row>
        </Container>
        </section>

    );
};

export default RegularSponsorsCommon;
