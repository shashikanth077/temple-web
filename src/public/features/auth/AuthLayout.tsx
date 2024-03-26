import React, { useEffect } from 'react';
import {
    Container, Row, Col, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

type AccountLayoutProps = {
    hasLogo?: boolean;
    bottomLinks?: any;
    children?: React.ReactNode;
};

const AuthLayout = ({ hasLogo, bottomLinks, children }: AccountLayoutProps) => {
    useEffect(() => {
        if (document.body) {
            document.body.classList.add('authentication-bg');
        }
        return () => {
            if (document.body) {
                document.body.classList.remove('authentication-bg');
            }
        };
    }, []);

    return (
        <div className="account-pages my-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4} sm={3}>
                        {hasLogo && (
                            <div className="text-center">
                                <div className="auth-logo mb-3">
                                    <Link to="/" className="logo logo-dark text-center">
                                        <span className="auth-logo-lg">
                                            <img src="assets/images/logo/logo.jpg" alt="" height="90" />
                                        </span>
                                    </Link>

                                </div>

                            </div>
                        )}
                        <Card>
                            <Card.Body className="p-4">{children}</Card.Body>
                        </Card>

                        {/* bottom links */}
                        {bottomLinks}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

AuthLayout.defaultProps = {
    hasLogo: true,
};

export default AuthLayout;
