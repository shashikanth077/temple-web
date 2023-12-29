import React, { useEffect } from 'react';
import {
    Row, Col, Alert,
} from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { Navigate, Link, useLocation } from 'react-router-dom';
import { sendcontactActions } from './contactSlice';
import Loader from 'sharedComponents/loader/loader';
import { Form, FormInput } from 'sharedComponents/inputs';
import Cardboxnew from 'sharedComponents/cards/card1';
import { useRedux } from 'hooks';
// import GMap from 'sharedComponents/Googlemap/googleMap';
import Button from 'sharedComponents/button/button';

type LocationState = {
    from?: Location;
};

type ContactData = {
    name:string;
    email:string;
    subject:string;
    message:string;
}

function Contact() {
    const { dispatch, appSelector } = useRedux();

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            name: yup.string().required('Please enter Name'),
            message: yup.string().required('Please enter Message'),
            subject: yup.string().required('Please enter Subject'),
        }),
    );

    useEffect(() => {
        dispatch(sendcontactActions.resetContact());
    }, [dispatch]);

    const {
        loading, error, data,
    } = appSelector(state => ({
        loading: state.sendcontact.loading,
        error: state.sendcontact.error,
        data: state.sendcontact.success,
    }));

    const onSubmit = (formData: ContactData) => {
        dispatch(sendcontactActions.sendContactInfo(formData));
    };

    // const location = useLocation();
    // let redirectUrl = '/';

    // if (location.state) {
    //     const { from } = location.state as LocationState;
    //     redirectUrl = from ? from.pathname : '/contact';
    // }

    return (

        <section id="contact" className="contact-section p-80px-tb">

            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <div className="section-title text-center mb-4">
                            <h2>Get in Touch </h2>
                        </div>
                    </div>
                </div>
                <Row className="contact-info-area g-4 mb-5">
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage="fas fa-map-marker-alt"
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title="Address"
                            description="49 Park Avenue,Newyork , NY 10016"
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage="fas fa-phone-volume"
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title="Phone number"
                            description="+91 4838383893"
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage="fas fa-envelope"
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title="Email"
                            description="test@gmail.com"
                            imageStatus
                        />
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-12">
                        <div className="contact-form">
                            <h4>Lets Connect</h4>
                            {!loading && data && (
                                <Alert variant="success" className="my-2">
                                    Submitted Successfully
                                </Alert>
                            )}
                            {error && (
                                <Alert variant="danger" className="my-2">
                                    {error}
                                </Alert>
                            )}

                            {loading && <Loader />}

                            <Form<ContactData>
                                onSubmit={onSubmit}
                                resolver={schemaResolver}
                            >
                                <FormInput
                                    label="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    type="email"
                                    name="email"
                                    label="Email address"
                                    placeholder="hello@test.com"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label="Subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Enter Subject"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label="Message"
                                    type="textarea"
                                    name="message"
                                    placeholder="Enter Message"
                                    containerClass="mb-3"
                                />
                                <div className="">
                                    <Button btntype classnames="read-more contact-btn">
                                        Send
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    {/* <div className="col-md-4">
                        <GMap />
                    </div> */}
                </div>
            </div>

        </section>
    );
}

export default Contact;
