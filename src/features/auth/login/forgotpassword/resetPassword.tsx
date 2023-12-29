import React, { useEffect } from 'react';
import {
    Button, Alert, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import AuthLayout from '../../AuthLayout';
import { forgotpasswodActions } from './forgotpassSlice';
import { Form, FormInput } from 'sharedComponents/inputs';

import { useRedux } from 'hooks';

type UserData = {
    password: string;
};

/* bottom link */
const BottomLink = () => (
    <Row className="mt-3">
        <Col className="text-center">
            <p className="text-muted">
                Back to
                <Link to="/login" className="text-dark ms-1">
                    <b>Log In</b>
                </Link>
            </p>
        </Col>
    </Row>
);

const ResetPassword = () => {
    const { dispatch, appSelector } = useRedux();

    // useEffect(() => {
    //     dispatch(resetAuth());
    // }, [dispatch]);

    const {
        loading, error, link,
    } = appSelector(state => ({
        loading: state.forgotpassword.loading,
        link: state.forgotpassword.link,
        error: state.forgotpassword.error,
        // passwordReset: state.forgotpassword.passwordReset,
        // resetPasswordSuccess: state.forgotpassword.resetPasswordSuccess,
    }));

    const paramsQuery = link?.link?.split('?')[1];
    const params = new URLSearchParams(paramsQuery);
    const token:any = params.get('token');
    const userId:any = params.get('id');

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            password: yup.string().required('Please enter new password Password'),
            confirmpassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Please confirm new passwordPassword'),
        }),
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(forgotpasswodActions.resetPassword(formData));
    };

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">Reset Password</h4>
            </div>

            {/* {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

            {error && !resetPasswordSuccess && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )} */}

            {/* {!passwordReset && ( */}
            <Form<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ token, userid: userId }}>
                <FormInput
                    label="new Password"
                    type="password"
                    name="password"
                    placeholder="Enter the new password"
                    containerClass="mb-3"
                />

                <FormInput
                    label="Confirm new password"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm the new password"
                    containerClass="mb-3"
                />
                <FormInput
                    type="hidden"
                    name="token"

                />
                <FormInput
                    type="hidden"
                    name="userid"

                />

                <div className="mb-3 d-grid text-center">
                    <Button type="submit" disabled={loading}>
                        Reset Password
                    </Button>
                </div>
            </Form>
            {/* )} */}
        </AuthLayout>
    );
};

export default ResetPassword;
