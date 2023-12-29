import React from 'react';
import { Navigate } from 'react-router-dom';

import { APICore } from 'helpers/api';

/* eslint-disable */
const AuthProtected = (props:any) => {
    
    /*
        redirect is un-auth access protected routes via url
    */

    if (APICore.isUserAuthenticated() === false) {
        return (
            <Navigate
                to={{
                    pathname: '/login',
                }}
            />
        );
    }

    return <>{props.children}</>;
};



export { AuthProtected };
