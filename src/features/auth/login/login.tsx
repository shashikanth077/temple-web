import React, { useEffect } from 'react';
import {
    Button, Row, Col,
} from 'react-bootstrap';
import {
    useNavigate, Link, useLocation,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert
import AuthLayout from '../AuthLayout';
import { authActions } from './loginSlice';
import Loader from 'sharedComponents/loader/loader';
import { Form, FormInput } from 'sharedComponents/inputs';
import useRedux from 'hooks/useRedux';
import { APICore } from 'helpers/api';
import { clearState } from 'storeConfig/api/apiSlice';

type LocationState = {
    from?: Location;
};

type UserData = {
    username: string;
    password: string;
};

/* bottom links */
const BottomLink = () => (
    <Row className="mt-3">
        <Col xs={12} className="text-center">
            <p className="text-muted">
                <Link to="/forget-password" className="text-muted ms-1">
                    <i className="fa fa-lock me-1" />
                    Forgot your password?
                </Link>
            </p>
            <p className="text-muted">
                Don`t have an account?
                <Link to="/signup" className="text-dark ms-1">
                    <b>Sign Up</b>
                </Link>
            </p>
        </Col>
    </Row>
);

const Login = () => {
    const { dispatch } = useRedux();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required('Please enter Password'),
        }),
    );

    /*
        handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(authActions.login(formData));
    };

    const location = useLocation();
    let redirectUrl = '/dashboard';

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                text: successMessage || '',
            }).then(() => {
                dispatch(clearState());
                const sessionUrl = localStorage.getItem('targetUrl');
                if (sessionUrl) {
                    navigate(sessionUrl);
                    localStorage.removeItem('targetUrl');
                } else {
                    navigate(redirectUrl, { replace: true });
                }
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
    }, [successMessage, error, navigate, dispatch, redirectUrl]);

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

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    useEffect(() => {
        const handleRedirect = () => {
            // Check if the user is authenticated
            if (APICore.isUserAuthenticated()) {
                const sessionUrl = localStorage.getItem('targetUrl');
                console.log(sessionUrl);

                // Check if there is a stored session URL
                if (sessionUrl) {
                    // Navigate to the stored session URL
                    navigate(sessionUrl);

                    // Remove the stored session URL after redirecting
                    // localStorage.removeItem('targetUrl');
                } else {
                    // If there is no stored session URL, redirect to the default URL (e.g., /dashboard)
                    navigate(redirectUrl, { replace: true });
                }
            }
        };

        // Call the handleRedirect function
        handleRedirect();
    }, [successMessage, navigate, dispatch]);

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0">Sign In</h4>
            </div>

            {loading && <Loader />}

            <Form<UserData>
                onSubmit={onSubmit}
                resolver={schemaResolver}
            >
                <FormInput
                    type="email"
                    name="email"
                    label="Email address"
                    placeholder="hello@test.com"
                    containerClass="mb-3"
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    containerClass="mb-3"
                />

                <FormInput
                    type="checkbox"
                    name="checkbox"
                    label="Remember me"
                    containerClass="mb-3"
                    defaultChecked
                />

                <div className="text-center d-grid mb-3">
                    <Button disabled={loading} variant="primary" type="submit">
                        Log In
                    </Button>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default Login;
