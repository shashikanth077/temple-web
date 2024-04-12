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
import GMap from 'sharedComponents/Googlemap/googleMap';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import Button from 'sharedComponents/button/button';
import { selectContactformDetails, selectContactDetails } from 'contents/content/contactSelectors';
import { EnquiryMessageLimit } from 'constants/general';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

type ContactData = {
    name:string;
    email:string;
    subject:string;
    message:string;
}
/* eslint-disable */
function Contact() {
    const { dispatch, appSelector } = useRedux();

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);
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
    <div className="cs-section__heading cs-style1 text-center">
        <h2 className="cs-section__title"><Heading
        headingWrapClass="contactform-head-wrap"
        title={ContactFormStatic?.GetInTouchTitle}
        classes="text-center mt-3"
    /></h2>
        <div className="cs-height__25 cs-height__lg__15"></div>
        <div className="cs-section__subtitle">{ContactFormStatic?.heading}</div>
        {loading && <Loader />}
    </div>
    <div className="cs-height__70 cs-height__lg__50"></div>
    <div className="row">
        <div className="col-lg-6">
            <div className="cs-vertical__middle">
                <div className="cs-vertical__middle__in">
                    <div className="cs-icon__box cs-style7">
                        <div className="cs-icon__box__icon cs-center cs-accent__bg"><i className="fas fa-map-marker-alt"></i></div>
                        <div className="cs-icon__box__right">
                            <h2 className="cs-icon__box__title">{Contacttatic?.addressTitle}:</h2>
                            <div className="cs-icon__box__subtitle">{Contacttatic?.Address}</div>
                        </div>
                    </div>
                    <div className="cs-height__40 cs-height__lg__30"></div>
                    <div className="cs-icon__box cs-style7">
                        <div className="cs-icon__box__icon cs-center cs-green__bg"><i className="fas fa-envelope"></i></div>
                        <div className="cs-icon__box__right">
                            <h2 className="cs-icon__box__title">{Contacttatic?.emailTitle}:</h2>
                            <div className="cs-icon__box__subtitle">{Contacttatic?.Emailaddress}</div>
                        </div>
                    </div>
                    <div className="cs-height__40 cs-height__lg__30"></div>
                    <div className="cs-icon__box cs-style7">
                        <div className="cs-icon__box__icon cs-center cs-yellow__bg"><i className="fas fa-mobile-alt"></i></div>
                        <div className="cs-icon__box__right">
                            <h2 className="cs-icon__box__title">{Contacttatic?.phoneTitle}:</h2>
                            <div className="cs-icon__box__subtitle">{Contacttatic?.Phonenumber}</div>
                        </div>
                    </div>
                    <div className="cs-height__0 cs-height__lg__60"></div>
                </div>
            </div>
        </div>
        <div className="col-lg-6">
                <form name="contact-enquiry-form" className="cs-form cs-style2" id="contact-enquiry-form" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                    <FormInput
                                register={register}
                                key="name"
                                errors={errors}
                                control={control}
                                type="input"
                                containerClass="mb-3"
                                id="name"
                                name="name"
                                placeholder="First Name"
                                className="cs-form__field"
                            />
                        <div className="cs-height__25 cs-height__lg__25"></div>
                    </div>
                    <div className="col-sm-6">
                    <FormInput
                                register={register}
                                key="email"
                                errors={errors}
                                control={control}
                                type="input"
                                containerClass="mb-3"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className="cs-form__field"
                            />
                        <div className="cs-height__25 cs-height__lg__25"></div>
                    </div>
                    <div className="col-sm-12">
                        <FormInput
                                register={register}
                                key="subject"
                                errors={errors}
                                control={control}
                                type="input"
                                containerClass="mb-3"
                                id="subject"
                                name="subject"
                                placeholder="Subject"
                                className="cs-form__field"
                            />
                        <div className="cs-height__25 cs-height__lg__25"></div>
                    </div>
                    <div className="col-sm-12">
                        <FormInput
                                register={register}
                                key="message"
                                value={enquiry}
                                onChange={handleEnquiryChange}
                                errors={errors}
                                control={control}
                                type="textarea"
                                containerClass="mb-3"
                                id="message"
                                name="message"
                                placeholder="Write Comment"
                                className="cs-form__field"
                            />
                        <div className="cs-height__25 cs-height__lg__25"></div>
                        <p>
                            <b>Characters remaining: {maxCharacters - enquiry.length}</b>
                        </p>
                    </div>
                    <div className="col-lg-12">
                        <Button disabled={loading} btntype classnames="read-more contact-btn cs-btn cs-style1 cs-color1 cs-primary__font w-100">
                            {ContactFormStatic?.btnName}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div className="cs-height__130 cs-height__lg__80"></div>
    <div className="cs-google__map">
    <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.42249355747!2d-79.63516962407788!3d43.6393774711028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b38bec6f58465%3A0x72c06d94d0a7fedd!2sSri%20Siva%20Satyanarayana%20Swamy%20Temple!5e0!3m2!1sen!2sin!4v1712847786442!5m2!1sen!2sin"
  allowFullScreen
/>
    </div>
    <div className="cs-height__130 cs-height__lg__80"></div>
</div>
</section>
    );
}

export default Contact;