import React, { useEffect } from 'react';
import {
    Row, Col, Alert,
} from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    useNavigate,
} from 'react-router-dom';
import Swal from 'sweetalert2';
// import { Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendcontactActions } from './contactSlice';
import Loader from 'sharedComponents/loader/loader';
import { Form, FormInput } from 'sharedComponents/inputs';
import Cardboxnew from 'sharedComponents/cards/card1';
import { useRedux } from 'hooks';
// import GMap from 'sharedComponents/Googlemap/googleMap';
import { clearState } from 'storeConfig/api/apiSlice';
import Button from 'sharedComponents/button/button';
import { selectContactformDetails, selectContactDetails } from 'features/content/contactSelectors';

type ContactData = {
    name:string;
    email:string;
    subject:string;
    message:string;
}

function Contact() {
    const { dispatch, appSelector } = useRedux();

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const ContactFormStatic:any = appSelector(selectContactformDetails);
    const Contacttatic:any = appSelector(selectContactDetails);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(ContactFormStatic?.email).email(ContactFormStatic?.validEmail),
            name: yup.string().required(ContactFormStatic?.name),
            message: yup.string().required(ContactFormStatic?.message),
            subject: yup.string().required(ContactFormStatic?.subject),
        }),
    );

    const onSubmit = (formData: ContactData) => {
        dispatch(sendcontactActions.sendContactInfo(formData));
    };

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                dispatch(clearState());
            });
            navigate('/');
        }
    }, [successMessage, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            }).then(() => {
                dispatch(clearState());
            });
        }
    }, [error, dispatch]);

    return (

        <section id="contact" className="contact-section p-80px-tb">

            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <div className="section-title text-center mb-4">
                            <h2>{ContactFormStatic?.GetInTouchTitle}</h2>
                        </div>
                    </div>
                </div>
                <Row className="contact-info-area g-4 mb-5">
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={Contacttatic?.AddressIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={Contacttatic?.addressTitle}
                            description={Contacttatic?.Address}
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={Contacttatic?.PhoneIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={Contacttatic?.phoneTitle}
                            description={Contacttatic?.Phonenumber}
                            imageStatus
                        />
                    </Col>
                    <Col className="Col" lg={3} md={6}>
                        <Cardboxnew
                            CardImage={Contacttatic?.EmailIcon}
                            imageType="icon"
                            cardClass="contact-box"
                            buttonStatus={false}
                            title={Contacttatic?.emailTitle}
                            description={Contacttatic?.Emailaddress}
                            imageStatus
                        />
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-12">
                        <div className="contact-form">
                            <h4>{ContactFormStatic?.heading}</h4>

                            {loading && <Loader />}

                            <Form<ContactData>
                                onSubmit={onSubmit}
                                resolver={schemaResolver}
                            >
                                <FormInput
                                    label={ContactFormStatic?.formLabels?.name}
                                    type="text"
                                    name="name"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    type="email"
                                    name="email"
                                    label={ContactFormStatic?.formLabels?.email}
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label={ContactFormStatic?.formLabels?.subject}
                                    type="text"
                                    name="subject"
                                    containerClass="mb-3"
                                />

                                <FormInput
                                    label={ContactFormStatic?.formLabels?.message}
                                    type="textarea"
                                    name="message"
                                    containerClass="mb-3"
                                />
                                <div className="">
                                    <Button disabled={loading} btntype classnames="read-more contact-btn">
                                        {ContactFormStatic?.btnName}
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
