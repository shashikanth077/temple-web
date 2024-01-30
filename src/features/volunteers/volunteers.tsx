import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    useNavigate,
} from 'react-router-dom';
import { volunteerActions } from './volunteersSlice';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Voluteers } from 'models';
import Loader from 'sharedComponents/loader/loader';
import Heading from 'sharedComponents/heading/heading';

/* eslint-disable */
const AddBooking = () => {
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector(
        (state: any) => state.apiState,
    );
     
    const [whatsappOption, setWhatsappOption] = useState("yes");
    const [liveOption, setLiveOption] = useState("yes");
    const [vegOption, setVegOption] = useState("yes");
    const [templeVolOption, setTempleVolOption] = useState("yes");

    const navigate = useNavigate();


    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required("Please enter the email address").email("Please enter valid email address"),
            name: yup
                .string()
                .required("Please enter first and last name together")
                .min(
                    2,
                    "This value is too short. It should have 2 characters or more.",
                ),
            phone: yup
            .number()
            .required("Please enter the phone number")
            .min(
                8,
                "This value is too short. It should have 8 characters or more.",
            ),
            description: yup
                .string()
                .required("Please enter description")
                .min(
                    2,
                    "This value is too short. It should have 2 characters or more.",
                )
        }),
    );

    const methods = useForm<Voluteers>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {
       dispatch(volunteerActions.storeVolunteers(data));
    });

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                dispatch(clearState());
                navigate('/');
            });
            reset()
        }

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            }).then(() => {
                dispatch(clearState());
            });
        }
    }, [successMessage, error, navigate, dispatch]);

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
        <>
            {loading && <Loader />}

            <section className="volunteer-section" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-box text-center">
                                <Heading title="Volunteer" classes='text-center mt-3'/>
                                <p className="text-muted f-17 mt-3">
                                The Sri Sathya Narayana Temple has always relied on the power of volunteer efforts to help deliver all of the amazingly successful programs for our community. Volunteering also means meeting incredible, new people who share strong, spiritual values. To join our volunteer group please fill out the form below:
                                </p>

                                <img
                                    src="images/home-border.png"
                                    height="15"
                                    className="mt-3"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mt-4 home-img text-center">
                                <div className="animation-2"></div>
                                <div className="animation-3"></div>
                                <img
                                    src="assets/images/volunteers.jpg"
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form
                                encType="multipart/form-data"
                                name="Booking-form"
                                id="Booking-form"
                                onSubmit={onSubmit}
                            >
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                register={register}
                                                key="name"
                                                errors={errors}
                                                control={control}
                                                label="First and last name*"
                                                type="input"
                                                containerClass="mb-3"
                                                id="name"
                                                name="name"
                                            ></FormInput>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                type="email"
                                                name="email"
                                                register={register}
                                                key="email"
                                                errors={errors}
                                                control={control}
                                                label="Email address*"
                                                containerClass="mb-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                type="phone"
                                                name="phone"
                                                register={register}
                                                key="phone"
                                                errors={errors}
                                                control={control}
                                                label="Phone number*"
                                                containerClass="mb-3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>
                                                Is this number available on
                                                Whatsapp?*
                                            </label>
                                            <div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        id="iswhatsupnumber"
                                                        name="iswhatsupnumber"
                                                        className="custom-control-input"
                                                        value="yes"
                                                        register={register}
                                                        key="iswhatsupnumber"
                                                        errors={errors}
                                                        control={control}
                                                        checked={whatsappOption === "yes"}
                                                        onChange={() => setWhatsappOption("yes")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutYes"
                                                    >
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        id="iswhatsupnumber"
                                                        name="iswhatsupnumber"
                                                        className="custom-control-input"
                                                        value="no"
                                                        register={register}
                                                        key="iswhatsupnumber"
                                                        errors={errors}
                                                        control={control}
                                                        checked={whatsappOption === "no"}
                                                        onChange={() => setWhatsappOption("no")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutNo"
                                                    >
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>
                                                Do you curretly live in
                                                Ontario?*
                                            </label>
                                            <div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        name="islive"
                                                        className="custom-control-input"
                                                        value="yes"
                                                        register={register}
                                                        key="islive"
                                                        errors={errors}
                                                        control={control}
                                                        checked={liveOption === "yes"}
                                                        onChange={() => setLiveOption("yes")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutYes"
                                                    >
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        name="islive"
                                                        className="custom-control-input"
                                                        value="no"
                                                        register={register}
                                                        key="islive"
                                                        errors={errors}
                                                        control={control}
                                                        checked={liveOption === "no"}
                                                        onChange={() => setLiveOption("no")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutNo"
                                                    >
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>
                                                Are you a vegetarian?*
                                            </label>
                                            <div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        name="isveg"
                                                        className="custom-control-input"
                                                        value="yes"
                                                        register={register}
                                                        key="isveg"
                                                        errors={errors}
                                                        control={control}
                                                        checked={vegOption === "yes"}
                                                        onChange={() => setVegOption("yes")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutYes"
                                                    >
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        name="isveg"
                                                        className="custom-control-input"
                                                        value="no"
                                                        register={register}
                                                        key="isveg"
                                                        errors={errors}
                                                        control={control}
                                                        checked={vegOption === "no"}
                                                        onChange={() => setVegOption("no")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutNo"
                                                    >
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>
                                                Have you previously volunteered
                                                for this temple?*
                                            </label>
                                            <div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        name="beforevolunteer"
                                                        className="custom-control-input"
                                                        value="yes"
                                                        register={register}
                                                        key="beforevolunteer"
                                                        errors={errors}
                                                        control={control}
                                                        checked={templeVolOption === "yes"}
                                                        onChange={() => setTempleVolOption("yes")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutYes"
                                                    >
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <FormInput
                                                        type="radio"
                                                        id="beforevolunteer"
                                                        name="beforevolunteer"
                                                        className="custom-control-input"
                                                        value="no"
                                                        register={register}
                                                        key="beforevolunteer"
                                                        errors={errors}
                                                        control={control}
                                                        checked={templeVolOption === "no"}
                                                        onChange={() => setTempleVolOption("no")}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="checkoutNo"
                                                    >
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <FormInput
                                            type="textarea"
                                            name="description"
                                            label="What areas are you interested to volunteer in?*"
                                            register={register}
                                            key="description"
                                            errors={errors}
                                            control={control}
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-sm-12">
                                        <div className="text-center d-flex mb-3 update-profile-btn">
                                            <Button
                                                type="submit"
                                                className="btn btn-primary submit-btn mr-1 waves-effect waves-light"
                                                disabled={loading}
                                            >
                                                Submit
                                            </Button>
                                            <a
                                                className="btn primary cancelbtn"
                                                href="/admin/bookingtypes/list"
                                                id="cancel"
                                            >
                                                {" "}
                                                Cancel
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddBooking;
