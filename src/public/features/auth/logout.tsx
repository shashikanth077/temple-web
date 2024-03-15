import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from './login/loginSlice';
import { useRedux } from 'hooks';
import { APICore, setAuthorization } from 'helpers';

function Logout() {
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authActions.logout());
        APICore.setLoggedInUser(null);
        setAuthorization(null);
        APICore.destoryUser();
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <>null</>
    );
}

export default Logout;
