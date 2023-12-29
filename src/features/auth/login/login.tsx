import React from 'react';
import {
    Button, Row, Col,
} from 'react-bootstrap';
import { Message } from 'primereact/message';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import AuthLayout from '../AuthLayout';
import { authActions } from './loginSlice';
import Loader from 'sharedComponents/loader/loader';
import { Form, FormInput } from 'sharedComponents/inputs';
import useRedux from 'hooks/useRedux';
import { APICore } from 'helpers/api';

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
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const {
        user, userLoggedIn,
    } = appSelector(state => ({
        user: state.login.currentUser,
        userLoggedIn: state.login.isLoggedIn,
    }));

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

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            { APICore.isUserAuthenticated() && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">Sign In</h4>
                </div>

                {error && (
                    <Message severity="error" text={error} />
                )}

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
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </div>
                </Form>
            </AuthLayout>
        </>
    );
};

export default Login;
