import React from 'react';
import {
    Container, Row, Col, Card, CardBody, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'hooks';

const ErrorPage = () => {
    const [loggedInUser] = useUser();
    const navigate = useNavigate();

    const handleEvent = () => {
        if (loggedInUser?.id) {
            navigate('/dashboard', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="account-pages my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md="8" lg="6" xl="5">
                        <Card className="overflow-hidden">
                            <CardBody className="pt-0">
                                <div className="ex-page-content text-center">
                                    <h3 className="">Something went wrong</h3>
                                    <Button onClick={handleEvent} className="btn btn-info mb-4 waves-effect waves-light">Back to Dashboard or Home</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ErrorPage;
