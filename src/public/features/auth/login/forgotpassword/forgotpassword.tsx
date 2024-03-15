import React, { useEffect, useRef, useState } from 'react';
import {
    Button, Row, Col, Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert
import AuthLayout from '../../AuthLayout';
import { forgotpasswodActions } from './forgotpassSlice';
import { Form, FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

type UserData = {
  email: string;
};

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
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const navigate = useNavigate(); // Impor
    const initialSuccessMessageRef = useRef<string | null>(null);
    const [showForm, setShowForm] = useState(true);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter a valid Email'),
        }),
    );

    const onSubmit = (formData: UserData) => {
        dispatch(forgotpasswodActions.forgotpasswod(formData));
        setShowForm(false);
    };

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                navigate('/login');
                dispatch(clearState());
            });
        }
    }, [successMessage, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            }).then(() => {
            // Show the form again if there is an error
                setShowForm(true);
                // Clear error message in the Redux store
                dispatch(clearState());
            });
        }
    }, [error, dispatch]);

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">Reset Password</h4>
                <p className="text-muted mb-0 font-13">
                    Enter your email address and we`ll send you an email with instructions to reset your password.
                </p>
            </div>

            {showForm && (
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
            )}
        </AuthLayout>
    );
};

export default ForgetPassword;
