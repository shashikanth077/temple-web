/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import AuthLayout from "../AuthLayout";
import { authActions } from "./loginSlice";
import Loader from "sharedComponents/loader/loader";
import { Form, FormInput } from "sharedComponents/inputs";
import useRedux from "hooks/useRedux";
import { APICore } from "helpers/api";
import { clearState } from "storeConfig/apiStatus/apiSlice";
import { getApiState } from "storeConfig/apiStatus/apiSelector";

type LocationState = {
    from?: Location;
};

type UserData = {
    username: string;
    password: string;
};

const Login = () => {
    const { dispatch } = useRedux();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup
                .string()
                .required("Please enter Email")
                .email("Please enter valid Email"),
            password: yup.string().required("Please enter Password"),
        }),
    );

    /*
        handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(authActions.login(formData));
    };

    const location = useLocation();
    let redirectUrl = "/dashboard";

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: "success",
                text: successMessage || "",
            }).then(() => {
                const sessionUrl = localStorage.getItem("targetUrl");
                if (sessionUrl) {
                    navigate(sessionUrl);
                } else {
                    navigate("/dashboard");
                }

                dispatch(clearState());
                localStorage.removeItem("targetUrl");
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
    }, [successMessage, error, navigate, dispatch, redirectUrl]);

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

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : "/";
    }

    useEffect(() => {
        const handleRedirect = () => {
            if (APICore.isUserAuthenticated()) {
                const sessionUrl = localStorage.getItem("targetUrl");
                if (sessionUrl) {
                    navigate(sessionUrl);
                } else {
                    navigate(redirectUrl);
                }
            }
        };

        // Call the handleRedirect function
        handleRedirect();
    }, [successMessage, navigate, dispatch]);

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

                                        <p className="text-white">Don't have an account?</p>
                                        <a
                                            href="/signup"
                                            className="btn btn-white btn-outline-white"
                                        >
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Sign In</h3>
                                        </div>
                                    </div>

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
                                            <Button
                                                disabled={loading}
                                                variant="primary"
                                                type="submit"
                                                className="form-control btn btn-primary submit"
                                            >
                                                Log In
                                            </Button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div data-pr-classname="w-50 text-md-right">
                                                <Link
                                                    to="/forget-password"
                                                    className="text-muted ms-1"
                                                >
                                                    <i className="fa fa-lock me-1" />
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Login;
