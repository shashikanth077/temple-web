import React, { useEffect, useState } from 'react';
import {
    Link,
    Navigate,
    useNavigate,
    useLocation,
    useParams,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { registerActions } from './registerSlice';
import { PublicImageURL } from 'constants/PublicUrl';
import { useRedux } from 'hooks';
import { FormInput } from 'sharedComponents/inputs';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { selectStaticRegistration } from 'contents/content/contactSelectors';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

type LocationState = {
    from?: Location;
};

interface Verification {
    otp: string;
    phoneNumber: string;
}

/* eslint-disable */
const Otpverification = () => {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { email, mobileNumber, countrycode } = useSelector(
        (state: any) => state.public.register,
    );
    const { num, code } = useParams<{ num?: string; code?: string }>() || {};
    const [resendAttempts, setResendAttempts] = useState(3);
    const [resendCooldown, setResendCooldown] = useState(false);
    const [timer, setTimer] = useState(60); // 60 seconds for the first time

    const location = useLocation();
    let redirectUrl = "/admin/dashboard";

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : "/login";
    }

    const RegisterContent = appSelector(selectStaticRegistration);

    const { loading, error, successMessage } = useSelector(getApiState);

    /*
  form validation schema
  */
    const schemaResolver = yupResolver(
        yup.object().shape({
            otp: yup
                .string()
                .required("Please enter the otp")
                .min(4, "This value is too short. It should have 4 digits"),
        }),
    );

    const methods = useForm<Verification>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

    const handleResend = () => {
        if (resendAttempts > 0 && !resendCooldown) {
            const formatMobile = `${atob(code!)}${atob(num!)}`;
            dispatch(registerActions.sendOtp({ phoneNumber: formatMobile }));
            setResendAttempts(resendAttempts - 1);
            setResendCooldown(true);
            setTimer(60); // Reset timer to 60 seconds
        }
    };

    const lastTwoDigits = atob(num!).slice(-2);
    const formattedPhoneNumber = `+xxx xxxxxxxx${lastTwoDigits}`;

    const onSubmit = handleSubmit((data: Verification) => {
        const requestPay = {
            phoneNumber: `${countrycode}${mobileNumber}`,
            otp: data?.otp,
        };
        dispatch(registerActions.verifyOTP(requestPay));
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                setResendCooldown(false);
                setTimer(60); // Reset timer to 60 seconds
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: "success",
                text: RegisterContent?.phoneVerificationSuccess,
            }).then(() => {
                dispatch(clearState());
                navigate("/login");
            });
            dispatch(registerActions.resetRegisterData());
            reset();
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
    }, [successMessage, error, navigate, dispatch, redirectUrl, reset]);

    return (
        <>
            {!email && <Navigate to={redirectUrl} replace />}
            <div className="authincation section-padding otp-section">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div
                                className="alert alert-success  fade show d-flex justify-content-between"
                                role="alert"
                            >
                                <span>
                                    Please enter verification token from your
                                    device
                                </span>
                                <span
                                    className="c-pointer"
                                    data-dismiss="alert"
                                >
                                    <i className="icofont-close-line" />
                                </span>
                            </div>
                            <div className="mini-logo text-center my-3">
                                <Link to="/intro">
                                    <img
                                        src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Link>
                                <h4 className="card-title mt-3">
                                    2-Step Verification
                                </h4>
                            </div>
                            <div className="auth-form card otp-verification-card">
                                <div className="card-body">
                                    <p className="text-center mb-3">
                                        {RegisterContent?.otpHeading}
                                        in {formattedPhoneNumber}
                                    </p>
                                    <form
                                        className="row g-3"
                                        name="verification-form"
                                        id="verification-form"
                                        onSubmit={onSubmit}
                                    >
                                        <div className="col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text py-3">
                                                        <i className="fal fa-mobile" />
                                                    </span>
                                                </div>
                                                <FormInput
                                                    type="text"
                                                    name="otp"
                                                    register={register}
                                                    key="otp"
                                                    placeholder="verification code"
                                                    errors={errors}
                                                    control={control}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="btn btn-primary btn-block"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        {resendAttempts > 0 ? (
                                            <p>
                                                Don't get code?{" "}
                                                <span
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="handleResend"
                                                    className={`text-${resendCooldown ? "secondary" : "primary"}`}
                                                    style={{
                                                        cursor: resendCooldown
                                                            ? "not-allowed"
                                                            : "pointer",
                                                    }}
                                                    onKeyDown={handleResend}
                                                    onClick={handleResend}
                                                >
                                                    Resend
                                                </span>
                                            </p>
                                        ) : (
                                            <p>
                                                Resend limit exceeded. Please
                                                wait for 1 minute.
                                            </p>
                                        )}
                                    </div>
                                    {timer > 0 && (
                                        <div className="timer">
                                            <p>
                                                Resend available in:{" "}
                                                {Math.floor(timer / 60)}:
                                                {(timer % 60).toLocaleString(
                                                    "en-US",
                                                    { minimumIntegerDigits: 2 },
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Otpverification;
