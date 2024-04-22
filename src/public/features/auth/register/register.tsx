/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AuthLayout from "../AuthLayout";
import { registerActions } from "./registerSlice";
import { User } from "models";
import { selectStaticRegistration } from "contents/content/contactSelectors";

// components
import useRedux from "hooks/useRedux";
import Loader from "sharedComponents/loader/loader";
import { countryCodes } from "constants/CAProvinces";
import { FormInput } from "sharedComponents/inputs";
import { clearState } from "storeConfig/apiStatus/apiSlice";
import { getApiState } from "storeConfig/apiStatus/apiSelector";

const Register = () => {
    const { dispatch, appSelector } = useRedux();

    const { loading, error, successMessage } = useSelector(getApiState);
    const navigate = useNavigate();
    const [ValMob, setMobileNumber] = useState("");
    const [CountryVal, setCountryCode] = useState("");

    const RegisterContent = appSelector(selectStaticRegistration);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup
                .string()
                .required(RegisterContent.formValidation?.firstName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            countrycode: yup
                .string()
                .required(RegisterContent.formValidation?.countrycode),
            lastName: yup
                .string()
                .required(RegisterContent.formValidation?.lastName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            email: yup
                .string()
                .required(RegisterContent.formValidation?.email)
                .email(RegisterContent.formValidation?.emailValid),
            phonenumber: yup
                .string()
                .required(RegisterContent.formValidation?.phonenumber)
                .test(
                    "is-ten-digits",
                    RegisterContent.formValidation?.inPhoneValid,
                    (value) => {
                        const cleanedNumber = value.replace(/\D/g, ""); // Remove non-digit characters
                        return cleanedNumber.length === 10;
                    },
                ),
            password: yup
                .string()
                .required(RegisterContent.formValidation?.password)
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    {
                        message: RegisterContent.formValidation?.passwordValid,
                        excludeEmptyString: true,
                    },
                ),
            TermConcent: yup
                .bool()
                .oneOf([true], RegisterContent.formValidation?.checkboxsignup),
        }),
    );

    const methods = useForm<User>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: "success",
                text: successMessage || "",
            }).then(() => {
                dispatch(clearState());
                navigate(`/verifyOTP/${btoa(ValMob)}/${btoa(CountryVal)}`);
            });
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

    /*
     * handle form submission
     */
    const onSubmit = handleSubmit((data: User) => {
        setMobileNumber(data.phonenumber);
        setCountryCode(data.countrycode);
        dispatch(registerActions.register(data));
    });

    return (
        <AuthLayout>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        {loading && <Loader />}
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                    <div className="text w-100">
                                        <div className="text-center">
                                            <div className="auth-logo mb-3">
                                                <Link
                                                    to="/"
                                                    className="logo logo-dark text-center"
                                                >
                                                    <span className="auth-logo-lg">
                                                        <img
                                                            src="assets/images/logo/logo.jpg"
                                                            alt=""
                                                            height="90"
                                                        />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        <p className="text-white">
                                            You have an account?
                                        </p>
                                        <a
                                            href="/login"
                                            className="btn btn-white btn-outline-white"
                                        >
                                            Login
                                        </a>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">{RegisterContent.heading}</h3>
                                        </div>
                                    </div>

                                    <form
                                        name="register-form"
                                        id="register-form"
                                        onSubmit={onSubmit}
                                    >
                                        <FormInput
                                            register={register}
                                            key="firstName"
                                            errors={errors}
                                            control={control}
                                            label="First name"
                                            type="text"
                                            name="firstName"
                                            placeholder={
                                                RegisterContent.formPlaceHolder
                                                    ?.firstName
                                            }
                                            containerClass="mb-3"
                                        />
                                        <FormInput
                                            register={register}
                                            key="lastName"
                                            errors={errors}
                                            control={control}
                                            label="Last name"
                                            type="text"
                                            name="lastName"
                                            placeholder={
                                                RegisterContent.formPlaceHolder
                                                    ?.lastName
                                            }
                                            containerClass="mb-3"
                                        />
                                        <FormInput
                                            register={register}
                                            key="email"
                                            errors={errors}
                                            control={control}
                                            label="Email address"
                                            type="email"
                                            name="email"
                                            placeholder={
                                                RegisterContent.formPlaceHolder
                                                    ?.email
                                            }
                                        />
                                        <div className="code-phonenumber">
                                            <FormInput
                                                register={register}
                                                key="countrycode"
                                                errors={errors}
                                                control={control}
                                                type="select"
                                                containerClass="mb-3 country-code"
                                                id="countrycode"
                                                name="countrycode"
                                            >
                                                {countryCodes?.map(
                                                    (option: any) => (
                                                        <option
                                                            key={option?.label}
                                                            value={option.label}
                                                        >
                                                            {option.label}{" "}
                                                        </option>
                                                    ),
                                                )}
                                            </FormInput>
                                            <FormInput
                                                register={register}
                                                key="phonenumber"
                                                errors={errors}
                                                control={control}
                                                type="phonenumber"
                                                name="phonenumber"
                                                placeholder={
                                                    RegisterContent
                                                        .formPlaceHolder
                                                        ?.phonenumber
                                                }
                                                containerClass="mb-3 phone-number"
                                            />
                                        </div>
                                        <FormInput
                                            register={register}
                                            key="password"
                                            errors={errors}
                                            control={control}
                                            label="Password"
                                            type="password"
                                            name="password"
                                            placeholder={
                                                RegisterContent.formPlaceHolder
                                                    ?.password
                                            }
                                            containerClass="mb-3"
                                        />
                                        <FormInput
                                            register={register}
                                            key="checkbox"
                                            errors={errors}
                                            control={control}
                                            label={
                                                RegisterContent.formPlaceHolder
                                                    ?.terms
                                            }
                                            type="checkbox"
                                            name="TermConcent"
                                            containerClass="mb-3"
                                        />

                                        <div className="mb-3 text-center d-grid">
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="form-control btn btn-primary submit"
                                            >
                                                {RegisterContent.submitBtnName}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Register;
