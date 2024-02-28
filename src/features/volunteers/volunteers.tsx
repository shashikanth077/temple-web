import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { volunteerActions } from './volunteersSlice';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Voluteers } from 'models';
import Loader from 'sharedComponents/loader/loader';
import Heading from 'sharedComponents/heading/heading';
import { selectStaticVoluteers } from 'features/content/contactSelectors';
import { Days, Activities } from 'constants/Volunteer';

interface PossibleDaysErrors {
    possibleDays?: {
        message?: string;
    };
}

interface ActivitesErrors {
    activityList?: {
        message?: string;
    };
}
/* eslint-disable */
const SubmitVolunteer = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(
        (state: any) => state.apiState,
    );

    const [whatsappOption, setWhatsappOption] = useState("yes");
    const [liveOption, setLiveOption] = useState("yes");
    const [vegOption, setVegOption] = useState("yes");
    const [templeVolOption, setTempleVolOption] = useState("yes");

    const navigate = useNavigate();

    const staticVolunteers: any = appSelector(selectStaticVoluteers);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup
                .string()
                .required(staticVolunteers?.formValidation.email)
                .email(staticVolunteers?.formValidation.validEmail),
            name: yup
                .string()
                .required(staticVolunteers?.formValidation.name)
                .min(
                    2,
                    "This value is too short. It should have 2 characters or more.",
                ),
            possibleDays: yup
                .array()
                .min(1, staticVolunteers?.formValidation.possibleDays),
            address: yup
                .string()
                .required(staticVolunteers?.formValidation.address)
                .min(
                    10,
                    "This value is too short. It should have 10 characters or more.",
                ),
            city: yup.string().required(staticVolunteers?.formValidation.city),
            state: yup
                .string()
                .required(staticVolunteers?.formValidation.state),
            zipcode: yup
                .string()
                .required(staticVolunteers?.formValidation.zipcode),
            phone: yup
                .number()
                .required(staticVolunteers?.formValidation.phone)
                .min(
                    8,
                    "This value is too short. It should have 8 characters or more.",
                ),
                otheractivities: yup
                .string()
                .required(staticVolunteers?.formValidation.description)
                .min(
                    2,
                    "This value is too short. It should have 2 characters or more.",
                ),
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
                icon: "success",
                text: successMessage || "",
            }).then(() => {
                dispatch(clearState());
                navigate("/");
            });
            reset();
        }

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
            }).then(() => {
                dispatch(clearState());
            });
        }
    }, [successMessage, error, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
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
                                <Heading
                                    headingWrapClass="volunteer-head-wrap"
                                    title={staticVolunteers?.heading}
                                    classes="text-center mt-3"
                                    align="text-center"
                                />
                                <p className="text-muted f-17 mt-3">
                                    {staticVolunteers?.subHeading}
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
                       
                        <div className="col-lg-12">
                            <form
                                name="voluteer-form"
                                id="voluteer-form"
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
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .name
                                                }
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
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .email
                                                }
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
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .phone
                                                }
                                                containerClass="mb-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                register={register}
                                                key="address"
                                                errors={errors}
                                                control={control}
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .address
                                                }
                                                type="input"
                                                containerClass="mb-3"
                                                id="address"
                                                name="address"
                                            ></FormInput>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                register={register}
                                                key="city"
                                                errors={errors}
                                                control={control}
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .city
                                                }
                                                type="input"
                                                containerClass="mb-3"
                                                id="city"
                                                name="city"
                                            ></FormInput>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormInput
                                                register={register}
                                                key="state"
                                                errors={errors}
                                                control={control}
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .state
                                                }
                                                type="input"
                                                containerClass="mb-3"
                                                id="state"
                                                name="state"
                                            ></FormInput>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <FormInput
                                                register={register}
                                                key="zipcode"
                                                errors={errors}
                                                control={control}
                                                label={
                                                    staticVolunteers?.formLabels
                                                        .zipcode
                                                }
                                                type="input"
                                                containerClass="mb-3"
                                                id="zipcode"
                                                name="zipcode"
                                            ></FormInput>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels
                                                        .possibleDays
                                                }
                                            </label>
                                            <div className="d-flex flex-column">
                                                {Days?.map((option: any) => (
                                                    <div className="form-check possible-days-form-check mr-3">
                                                        <FormInput
                                                            className="possible-days-input-check"
                                                            register={register}
                                                            key="possibleDays"
                                                            name="possibleDays"
                                                            value={
                                                                option?.label
                                                            }
                                                            control={control}
                                                            type="checkbox"
                                                            containerClass="mb-3"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`${option?.label}`}
                                                        >
                                                            {option?.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                {((errors as PossibleDaysErrors)
                                                    ?.possibleDays?.message ??
                                                    "") && (
                                                    <span className="text-danger">
                                                        {
                                                            (
                                                                errors as PossibleDaysErrors
                                                            ).possibleDays
                                                                ?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels
                                                        .iswhatsupnumber
                                                }
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
                                                        checked={
                                                            whatsappOption ===
                                                            "yes"
                                                        }
                                                        onChange={() =>
                                                            setWhatsappOption(
                                                                "yes",
                                                            )
                                                        }
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
                                                        checked={
                                                            whatsappOption ===
                                                            "no"
                                                        }
                                                        onChange={() =>
                                                            setWhatsappOption(
                                                                "no",
                                                            )
                                                        }
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
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels
                                                        .islive
                                                }
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
                                                        checked={
                                                            liveOption === "yes"
                                                        }
                                                        onChange={() =>
                                                            setLiveOption("yes")
                                                        }
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
                                                        checked={
                                                            liveOption === "no"
                                                        }
                                                        onChange={() =>
                                                            setLiveOption("no")
                                                        }
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
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels
                                                        .isveg
                                                }
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
                                                        checked={
                                                            vegOption === "yes"
                                                        }
                                                        onChange={() =>
                                                            setVegOption("yes")
                                                        }
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
                                                        checked={
                                                            vegOption === "no"
                                                        }
                                                        onChange={() =>
                                                            setVegOption("no")
                                                        }
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
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels
                                                        .beforevolunteer
                                                }
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
                                                        checked={
                                                            templeVolOption ===
                                                            "yes"
                                                        }
                                                        onChange={() =>
                                                            setTempleVolOption(
                                                                "yes",
                                                            )
                                                        }
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
                                                        checked={
                                                            templeVolOption ===
                                                            "no"
                                                        }
                                                        onChange={() =>
                                                            setTempleVolOption(
                                                                "no",
                                                            )
                                                        }
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
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>
                                                {
                                                    staticVolunteers?.formLabels.activityList
                                                }
                                            </label>
                                            <div className="d-flex flex-column">
                                                {Activities?.map(
                                                    (option: any) => (
                                                        <div className="form-check possible-days-form-check mr-3">
                                                            <FormInput
                                                                className="possible-days-input-check"
                                                                register={
                                                                    register
                                                                }
                                                                key="activityList"
                                                                name="activityList"
                                                                value={
                                                                    option?.label
                                                                }
                                                                control={
                                                                    control
                                                                }
                                                                type="checkbox"
                                                                containerClass="mb-3"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor={`${option?.label}`}
                                                            >
                                                                {option?.label}
                                                            </label>
                                                        </div>
                                                    ),
                                                )}
                                                {((errors as ActivitesErrors)
                                                    ?.activityList?.message ??
                                                    "") && (
                                                    <span className="text-danger">
                                                        {
                                                            (
                                                                errors as ActivitesErrors
                                                            ).activityList
                                                                ?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <FormInput
                                            type="textarea"
                                            name="otheractivities"
                                            label="What areas are you interested to volunteer in?*"
                                            register={register}
                                            key="otheractivities"
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

export default SubmitVolunteer;
