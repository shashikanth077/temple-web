import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => (
    <footer className="footer">
        <Container fluid>
            <Row className="row">
                <div className="col-12 text-center">
                    {new Date().getFullYear()} © Sri Sathya narayana temple -
                    developed by <b>NorthGaze.com</b>
                </div>
            </Row>
        </Container>
    </footer>
);

export default Footer;
