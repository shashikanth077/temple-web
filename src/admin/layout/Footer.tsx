import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row>
                    <Col sm={6}>
                        {currentYear} &copy;Temple  by <Link to="##">Temple</Link>
                    </Col>

                    <Col sm={6}>
                        <div className="text-sm-end footer-links d-none d-sm-block">
                            <Link to="/about">About Us</Link>
                            <Link to="/contactus">Contact Us</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
