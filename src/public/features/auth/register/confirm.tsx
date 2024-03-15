import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthLayout from '../AuthLayout';
import { useRedux } from 'hooks';
import { selectStaticRegistration } from 'contents/content/contactSelectors';

type LocationState = {
    from?: Location;
};

const Confirm = () => {
    const { email } = useSelector((state:any) => state.public.register);
    const { dispatch, appSelector } = useRedux();

    const location = useLocation();
    let redirectUrl = '/admin/dashboard';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/login';
    }

    const RegisterContent = appSelector(selectStaticRegistration);

    return (
        <>
            { !email && <Navigate to={redirectUrl} replace />}
            <AuthLayout>
                <div className="text-center">
                    <div className="mb-4">
                        <h4 className="text-uppercase mt-0">Confirm Email</h4>
                    </div>
                    <img src="assets/images/email/email_confirm.png" alt="img" width="86" className="mx-auto d-block" />

                    <p className="text-muted font-14 mt-2">
                        A email has been send to
                        <span className="fw-medium"><b> {email} </b></span>
                        .{RegisterContent?.registrationActivation}

                    </p>
                    <Link className="btn d-block btn-pink waves-effect waves-light mt-3" to="/login">
                        Back to Home
                    </Link>
                </div>
            </AuthLayout>
        </>
    );
};

export default Confirm;
