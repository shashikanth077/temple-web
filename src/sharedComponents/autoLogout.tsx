// AutoLogout.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedux } from 'hooks';
import { authActions } from 'public/features/auth/login/loginSlice';

interface AutoLogoutProps {
  children: React.ReactNode;
  logoutTime?: number;
}

const AutoLogout: React.FC<AutoLogoutProps> = ({ children, logoutTime = 300000 }) => {
    const history = useNavigate();
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch(authActions.logout());
                navigate('/');
            }, logoutTime);
        };

        const handleActivity = () => {
            resetTimeout();
        };

        // Set up initial timeout
        resetTimeout();

        // Attach event listeners
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // Clean up event listeners on component unmount
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [history, logoutTime, dispatch, navigate]);

    return <div>{children}</div>;
};

export default AutoLogout;
