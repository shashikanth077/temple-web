import React, { useEffect } from 'react';
import {
    Button, Row, Alert, Col,
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
    email: string;
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

const ForgetPassword = () => {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(forgotpasswodActions.resetForgot());
    }, [dispatch]);

    const {
        loading, link, error,
    } = appSelector(state => ({
        loading: state.forgotpassword.loading,
        link: state.forgotpassword.link,
        error: state.forgotpassword.error,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter Email'),
        }),
    );

    console.log('errpr', error);

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(forgotpasswodActions.forgotpasswod(formData));
    };

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">Reset Password</h4>
                <p className="text-muted mb-0 font-13">
                    Enter your email address and we`ll send you an email with instructions to reset your password.
                </p>
            </div>

            {!error && link != null && !loading && <Alert variant="success">Link has been sent to your registered email to reset password. please check</Alert>}

            {error && !loading && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            <Form<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                <FormInput
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    containerClass="mb-3"
                />

                <div className="mb-3 d-grid text-center">
                    <Button type="submit" disabled={loading}>
                        Reset Password
                    </Button>
                </div>
            </Form>

        </AuthLayout>
    );
};

export default ForgetPassword;
