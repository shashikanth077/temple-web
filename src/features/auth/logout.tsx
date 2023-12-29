import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { authActions } from './login/loginSlice';
import { useRedux } from 'hooks';

function Logout() {
    const { dispatch } = useRedux();

    type LocationState = {
        from?: Location;
    };

    useEffect(() => {
        dispatch(authActions.logout());
    }, [dispatch]);

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <Navigate to={redirectUrl} replace />
    );
}

export default Logout;
