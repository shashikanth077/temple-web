import React, { useEffect, useState } from 'react';
import {
    Row, Col,
} from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    useNavigate,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { sendcontactActions } from './contactSlice';
import Loader from 'sharedComponents/loader/loader';
import { FormInput } from 'sharedComponents/inputs';
import Cardboxnew from 'sharedComponents/cards/card1';
import Heading from 'sharedComponents/heading/heading';
import { useRedux } from 'hooks';
// import GMap from 'sharedComponents/Googlemap/googleMap';
import { clearState } from 'storeConfig/api/apiSlice';
import Button from 'sharedComponents/button/button';
import { selectContactformDetails, selectContactDetails } from 'features/content/contactSelectors';
import { EnquiryMessageLimit } from 'constants/General';

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
    const [enquiry, setEnquiry] = useState<string>('');

    const ContactFormStatic:any = appSelector(selectContactformDetails);
    const Contacttatic:any = appSelector(selectContactDetails);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(ContactFormStatic?.email).email(ContactFormStatic?.validEmail),
            name: yup.string().required(ContactFormStatic?.name).min(2, 'Enter minimum 2 letter'),
            message: yup.string().required(ContactFormStatic?.message).max(400, 'Exceeded character limit'),
            subject: yup.string().required(ContactFormStatic?.subject).min(10, 'Enter minimum 10 letter'),
        }),
    );

    const methods = useForm<ContactData>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

    const onSubmit = handleSubmit((data:any) => {
        dispatch(sendcontactActions.sendContactInfo(data));
    });

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                dispatch(clearState());
            });
            reset();
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

    const maxCharacters = EnquiryMessageLimit; // Set your desired character limit

    const handleEnquiryChange = (event: any) => {
        const inputValue = event.target.value;

        // Check if the input value exceeds the character limit
        if (inputValue.length <= maxCharacters) {
            setEnquiry(inputValue);
        }
    };

    return (

        <section id="contact" className="contact-section p-80px-tb">

            <div className="container">
                <Heading
                    headingWrapClass="contactform-head-wrap"
                    title={ContactFormStatic?.GetInTouchTitle}
                    classes="text-center mt-3"
                    align="text-center"
                />
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

                            <form name="contact-enquiry-form" id="contact-enquiry-form" onSubmit={onSubmit}>
                                <FormInput
                                    label={ContactFormStatic?.formLabels?.name}
                                    register={register}
                                    key="name"
                                    errors={errors}
                                    control={control}
                                    type="input"
                                    containerClass="mb-3"
                                    id="name"
                                    name="name"
                                />

                                <FormInput
                                    label={ContactFormStatic?.formLabels?.email}
                                    register={register}
                                    key="email"
                                    errors={errors}
                                    control={control}
                                    type="input"
                                    containerClass="mb-3"
                                    id="email"
                                    name="email"
                                />

                                <FormInput
                                    label={ContactFormStatic?.formLabels?.subject}
                                    register={register}
                                    key="subject"
                                    errors={errors}
                                    control={control}
                                    type="input"
                                    containerClass="mb-3"
                                    id="subject"
                                    name="subject"
                                />

                                <FormInput
                                    label={ContactFormStatic?.formLabels?.message}
                                    register={register}
                                    key="message"
                                    value={enquiry}
                                    onChange={handleEnquiryChange}
                                    errors={errors}
                                    control={control}
                                    type="input"
                                    containerClass="mb-3"
                                    id="message"
                                    name="message"
                                />
                                <p>
                                    <b>Characters remaining: {maxCharacters - enquiry.length}</b>
                                </p>
                                <div className="">
                                    <Button disabled={loading} btntype classnames="read-more contact-btn">
                                        {ContactFormStatic?.btnName}
                                    </Button>
                                </div>
                            </form>
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
