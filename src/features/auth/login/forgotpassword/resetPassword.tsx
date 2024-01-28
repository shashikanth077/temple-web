import React, { useEffect, useRef, useState } from 'react';
import {
    Button, Alert, Row, Col,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { useSelector } from 'react-redux';
import AuthLayout from '../../AuthLayout';
import { forgotpasswodActions } from './forgotpassSlice';
import { Form, FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import Loader from 'sharedComponents/loader/loader';

type UserData = {
    password: string;
    userid:string;
    identifier:string;
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
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const { token } = useParams();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);

    const searchParams = new URLSearchParams(window.location.search);
    const tokenValue:any = searchParams.get('token');
    const userId:any = searchParams.get('id');

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

    useEffect(() => {
        if (successMessage) {
            // Display SweetAlert when there is a success message
            Swal.fire({
                icon: 'success',
                title: 'Password Reset Successful',
                text: successMessage,
            }).then(() => {
                // Redirect or perform any other action after the alert is closed
                navigate('/login'); // Redirect to login page, for example
            });

            // Clear local error and reset form
            setLocalError(null);
            dispatch(clearState());
        }

        if (error) {
            // Set local error and clear it after a delay
            Swal.fire({
                icon: 'error',
                title: error,
                text: error,
            }).then(() => {
                // Clear local error and reset form
                setLocalError(null);
                dispatch(clearState());
            });
            const clearTimer = setTimeout(() => {
                setLocalError(null);
                dispatch(clearState());
            }, 3000);

            return () => {
                clearTimeout(clearTimer);
            };
        }

        // Ensure the function returns void or nothing
        return undefined;
    }, [successMessage, error, dispatch, navigate]);

    console.log(tokenValue);
    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">Reset Password</h4>
            </div>

            <div className="text-center mb-4">
                {loading && <Loader />}
            </div>

            <Form<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ identifier: tokenValue, userid: userId }}>
                <FormInput
                    label="New password"
                    type="password"
                    name="password"
                    key="password"
                    placeholder="Enter the new password"
                    containerClass="mb-3"
                />

                <FormInput
                    label="Confirm new password"
                    type="password"
                    key="confirmpassword"
                    name="confirmpassword"
                    placeholder="Confirm the new password"
                    containerClass="mb-3"
                />
                <FormInput
                    type="hidden"
                    key="identifier"
                    name="identifier"
                    value={tokenValue}
                />
                <FormInput
                    type="hidden"
                    key="userid"
                    name="userid"
                    value={userId}
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
