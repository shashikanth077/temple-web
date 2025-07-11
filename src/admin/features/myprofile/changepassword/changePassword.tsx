/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { useSelector } from "react-redux";
import { Form, FormInput } from "sharedComponents/inputs";
import { useRedux, useUser } from "hooks";
import { clearState } from "storeConfig/apiStatus/apiSlice";
import Loader from "sharedComponents/loader/loader";
import {myprofileActions} from "../myProfileSlice";
import { getApiState } from "storeConfig/apiStatus/apiSelector";

type UserData = {
    oldPassword: string;
    userId: string;
    newPassword: string;
    confirmpassword: string;
};

const ChangePassword = () => {
    const { dispatch } = useRedux();
    const [loggedInUser] = useUser();
    const { loading, error, successMessage } = useSelector(getApiState);

    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            oldPassword: yup
                .string()
                .required("Please enter old password"),
            newPassword: yup
                .string()
                .required("Please enter new password"),
            confirmpassword: yup
                .string()
                .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
                .required("Please confirm new password"),
        }),
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(myprofileActions.ChangePassword(formData));
    };

    useEffect(() => {
        if (successMessage) {
            // Display SweetAlert when there is a success message
            Swal.fire({
                icon: "success",
                title: "Password changed Successfully",
                text: successMessage,
            }).then(() => {
                navigate("/myprofile/profileview");
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
        <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                {loading && <Loader />}
                <div className="col-md-12 col-lg-10">


                        <Form<UserData>
                            onSubmit={onSubmit}
                            resolver={schemaResolver}
                            defaultValues={{
                                userId: loggedInUser?.id || "",
                            }}
                                 >
                            <FormInput
                                label="Old password"
                                type="password"
                                name="oldPassword"
                                key="oldPassword"
                                placeholder="Enter the old password"
                                containerClass="mb-3"
                            />

                            <FormInput
                                label="New password"
                                type="password"
                                name="newPassword"
                                key="newPassword"
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
                                key="userId"
                                name="userId"
                                value={loggedInUser?.id}
                            />

                            <div className="mb-3 col-md-3 d-grid text-center">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="align-self-end"
                            > Change Password</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ChangePassword;
