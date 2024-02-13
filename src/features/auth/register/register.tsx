import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button, Alert, Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import AuthLayout from '../AuthLayout';
import { registerActions } from './registerSlice';
import { User } from 'models';
import { selectStaticRegistration } from 'features/content/contactSelectors';

// components
import useRedux from 'hooks/useRedux';
import Loader from 'sharedComponents/loader/loader';
import { countryCodes } from 'constants/CAProvinces';
import { FormInput } from 'sharedComponents/inputs';

import 'react-intl-tel-input/dist/main.css';
import { clearState } from 'storeConfig/api/apiSlice';

/* bottom links */
const BottomLink = () => (
    <Row className="mt-3">
        <Col xs={12} className="text-center">
            <p className="text-muted">
                Already have account?
                <Link to="/login" className="text-dark fw--medium ms-1">
                    <b>Sign In</b>
                </Link>
            </p>
        </Col>
    </Row>
);

const Register = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const navigate = useNavigate();
    const [ValMob, setMobileNumber] = useState('');
    const [CountryVal, setCountryCode] = useState('');

    const RegisterContent = appSelector(selectStaticRegistration);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string()
                .required(RegisterContent.formValidation?.firstName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            countrycode: yup.string().required(RegisterContent.formValidation?.countrycode),
            lastName: yup.string()
                .required(RegisterContent.formValidation?.lastName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            email: yup.string()
                .required(RegisterContent.formValidation?.email)
                .email(RegisterContent.formValidation?.emailValid),
            phonenumber: yup.string()
                .required(RegisterContent.formValidation?.phonenumber)
                .test('is-ten-digits', RegisterContent.formValidation?.inPhoneValid, value => {
                    const cleanedNumber = value.replace(/\D/g, ''); // Remove non-digit characters
                    return cleanedNumber.length === 10;
                }),
            password: yup.string()
                .required(RegisterContent.formValidation?.password)
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    {
                        message: RegisterContent.formValidation?.passwordValid,
                        excludeEmptyString: true,
                    },
                ),
            TermConcent: yup.bool().oneOf([true], RegisterContent.formValidation?.checkboxsignup),
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
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                dispatch(clearState());
                navigate(`/verifyOTP/${btoa(ValMob)}/${btoa(CountryVal)}`);
            });
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

    /*
     * handle form submission
     */
    const onSubmit = handleSubmit((data:User) => {
        setMobileNumber(data.phonenumber);
        setCountryCode(data.countrycode);
        dispatch(registerActions.register(data));
    });

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0"> {RegisterContent.heading}</h4>
            </div>

            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            {loading && <Loader />}
            <form name="register-form" id="register-form" onSubmit={onSubmit}>
                <FormInput
                    register={register}
                    key="firstName"
                    errors={errors}
                    control={control}
                    label="First name"
                    type="text"
                    name="firstName"
                    placeholder={RegisterContent.formPlaceHolder?.firstName}
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
                    placeholder={RegisterContent.formPlaceHolder?.lastName}
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
                    placeholder={RegisterContent.formPlaceHolder?.email}
                    containerClass="mb-3"
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
                        {countryCodes?.map((option:any) => (
                            <option key={option?.label} value={option.label}>{option.label} </option>
                        ))}
                    </FormInput>
                    <FormInput
                        register={register}
                        key="phonenumber"
                        errors={errors}
                        control={control}
                        type="phonenumber"
                        name="phonenumber"
                        placeholder={RegisterContent.formPlaceHolder?.phonenumber}
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
                    placeholder={RegisterContent.formPlaceHolder?.password}
                    containerClass="mb-3"
                />
                <FormInput
                    register={register}
                    key="checkbox"
                    errors={errors}
                    control={control}
                    label={RegisterContent.formPlaceHolder?.terms}
                    type="checkbox"
                    name="TermConcent"
                    containerClass="mb-3"
                />

                <div className="mb-3 text-center d-grid">
                    <Button type="submit" disabled={loading}>
                        { RegisterContent.submitBtnName}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
