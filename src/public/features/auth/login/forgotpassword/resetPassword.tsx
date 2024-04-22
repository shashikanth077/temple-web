/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { useSelector } from "react-redux";
import AuthLayout from "../../AuthLayout";
import { forgotpasswodActions } from "./forgotpassSlice";
import { Form, FormInput } from "sharedComponents/inputs";
import { useRedux } from "hooks";
import { clearState } from "storeConfig/apiStatus/apiSlice";
import Loader from "sharedComponents/loader/loader";
import { getApiState } from "storeConfig/apiStatus/apiSelector";

type UserData = {
    password: string;
    userid: string;
    identifier: string;
};

const ResetPassword = () => {
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);

    const { token } = useParams();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);

    const searchParams = new URLSearchParams(window.location.search);
    const tokenValue: any = searchParams.get("token");
    const userId: any = searchParams.get("id");

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            password: yup
                .string()
                .required("Please enter new password Password"),
            confirmpassword: yup
                .string()
                .oneOf([yup.ref("password"), ""], "Passwords must match")
                .required("Please confirm new passwordPassword"),
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
                icon: "success",
                title: "Password Reset Successful",
                text: successMessage,
            }).then(() => {
                // Redirect or perform any other action after the alert is closed
                navigate("/login"); // Redirect to login page, for example
            });

            // Clear local error and reset form
            setLocalError(null);
            dispatch(clearState());
        }

        if (error) {
            // Set local error and clear it after a delay
            Swal.fire({
                icon: "error",
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

                                        <h4 className="text-uppercase mt-0 mb-3 text-white">
                                            Reset Password
                                        </h4>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-lg-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">
                                                Reset Passwrod
                                            </h3>
                                        </div>
                                    </div>

                                    <Form<UserData>
                                        onSubmit={onSubmit}
                                        resolver={schemaResolver}
                                        defaultValues={{
                                            identifier: tokenValue,
                                            userid: userId,
                                        }}
                                    >
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
                                            <Button
                                                type="submit"
                                                disabled={loading}
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

export default ResetPassword;
