/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import AuthLayout from "../../AuthLayout";
import { forgotpasswodActions } from "./forgotpassSlice";
import { Form, FormInput } from "sharedComponents/inputs";
import { useRedux } from "hooks";
import { clearState } from "storeConfig/apiStatus/apiSlice";
import { getApiState } from "storeConfig/apiStatus/apiSelector";

type UserData = {
    email: string;
};

const ForgetPassword = () => {
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const navigate = useNavigate(); // Impor
    const initialSuccessMessageRef = useRef<string | null>(null);
    const [showForm, setShowForm] = useState(true);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup
                .string()
                .required("Please enter Email")
                .email("Please enter a valid Email"),
        }),
    );

    const onSubmit = (formData: UserData) => {
        dispatch(forgotpasswodActions.forgotpasswod(formData));
        setShowForm(false);
    };

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: "success",
                text: successMessage || "",
            }).then(() => {
                navigate("/login");
                dispatch(clearState());
            });
        }
    }, [successMessage, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
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
        <AuthLayout>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
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

                                        <h4 className="text-uppercase mt-0 mb-3 text-white">
                                            Reset Password
                                        </h4>
                                        <p className="text-white mb-0 font-13">
                                            Enter your email address and we`ll
                                            send you an email with instructions
                                            to reset your password.
                                        </p>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">
                                                Forgot Passwrod
                                            </h3>
                                        </div>
                                    </div>

                                    <Form<UserData>
                                        onSubmit={onSubmit}
                                        resolver={schemaResolver}
                                    >
                                        <FormInput
                                            label="Email address"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            containerClass="mb-3"
                                        />

                                        <div className="mb-3 d-grid text-center">
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="form-control btn btn-primary submit"
                                            >
                                                Reset Password
                                            </Button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div data-pr-classname="w-50 text-md-right">
                                                <Link
                                                    to="/login"
                                                    className="text-muted ms-1"
                                                >
                                                    <i className="fa fa-sign-in me-1" />
                                                    Back to Login
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

export default ForgetPassword;
