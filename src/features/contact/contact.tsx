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
import { selectContactformDetails, selectContactDetails } from 'features/content/contactSelectors';

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

    const ContactformStatic = appSelector(selectContactformDetails);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(ContactformStatic?.formValidation?.email).email(ContactformStatic?.formValidation?.validEmail),
            name: yup.string().required(ContactformStatic?.formValidation?.name),
            message: yup.string().required(ContactformStatic?.formValidation?.message),
            subject: yup.string().required(ContactformStatic?.formValidation?.subject),
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

    const ContactStaticDetails = appSelector(selectContactDetails);
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
                            <h2>{ContactformStatic?.GetInTouchTitle}</h2>
                        </div>
                    </div>
                </div>
                <Row className="contact-info-area g-4 mb-5">
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={ContactStaticDetails?.AddressIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={ContactStaticDetails?.addressTitle}
                            description={ContactStaticDetails?.Address}
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={ContactStaticDetails?.PhoneIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={ContactStaticDetails?.phoneTitle}
                            description={ContactStaticDetails?.Phonenumber}
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={ContactStaticDetails?.EmailIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={ContactStaticDetails?.emailTitle}
                            description={ContactStaticDetails?.Emailaddress}
                            imageStatus
                        />
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-12">
                        <div className="contact-form">
                            <h4>{ContactformStatic?.heading}</h4>
                            {!loading && data && (
                                <Alert variant="success" className="my-2">
                                    {ContactformStatic?.SuccessMessage}
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
                                    label={ContactformStatic?.formLabels?.name}
                                    type="text"
                                    name="name"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    type="email"
                                    name="email"
                                    label={ContactformStatic?.formLabels?.email}
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label={ContactformStatic?.formLabels?.subject}
                                    type="text"
                                    name="subject"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label={ContactformStatic?.formLabels?.message}
                                    type="textarea"
                                    name="message"
                                    containerClass="mb-3"
                                />
                                <div className="">
                                    <Button btntype classnames="read-more contact-btn">
                                        {ContactformStatic?.btnName}
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
