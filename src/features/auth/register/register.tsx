import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
    Button, Alert, Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector } from 'react-redux';
import AuthLayout from '../AuthLayout';
import { registerActions } from './registerSlice';
import { User } from 'models';
import { selectStaticRegistration } from 'features/content/contactSelectors';

// components
import useRedux from 'hooks/useRedux';
import Loader from 'sharedComponents/loader/loader';
import { Form, FormInput } from 'sharedComponents/inputs';

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
    const { loading, error } = useSelector((state:any) => state.apiState);

    const { userSignUp } = appSelector(state => ({
        userSignUp: state.register.userSignUp,
    }));

    const RegisterContent = appSelector(selectStaticRegistration);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string().required(RegisterContent.formValidation?.firstName),
            lastName: yup.string().required(RegisterContent.formValidation?.lastName),
            email: yup.string().required(RegisterContent.formValidation?.email).email(RegisterContent.formValidation?.emailValid),
            phonenumber: yup.string().required(RegisterContent.formValidation?.phonenumber),
            password: yup.string().required(RegisterContent.formValidation?.password),
            checkboxsignup: yup.bool().oneOf([true], RegisterContent.formValidation?.checkboxsignup),
        }),
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: User) => {
        dispatch(registerActions.register(formData));
    };

    return (
        <>
            {userSignUp ? <Navigate to="/confirm" replace /> : null}

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
                <Form<User> onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label="First name"
                        type="text"
                        name="firstName"
                        placeholder={RegisterContent.formPlaceHolder?.firstName}
                        containerClass="mb-3"
                    />
                    <FormInput
                        label="Last name"
                        type="text"
                        name="lastName"
                        placeholder={RegisterContent.formPlaceHolder?.lastName}
                        containerClass="mb-3"
                    />
                    <FormInput
                        label="Email address"
                        type="email"
                        name="email"
                        placeholder={RegisterContent.formPlaceHolder?.email}
                        containerClass="mb-3"
                    />
                    <FormInput
                        label="Phone number"
                        type="text"
                        name="phonenumber"
                        placeholder={RegisterContent.formPlaceHolder?.phonenumber}
                        containerClass="mb-3"
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder={RegisterContent.formPlaceHolder?.password}
                        containerClass="mb-3"
                    />
                    <FormInput
                        label={RegisterContent.formPlaceHolder?.terms}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass="mb-3"
                    />

                    <div className="mb-3 text-center d-grid">
                        <Button type="submit" disabled={loading}>
                            { RegisterContent.submitBtnName}
                        </Button>
                    </div>
                </Form>
            </AuthLayout>
        </>
    );
};

export default Register;
