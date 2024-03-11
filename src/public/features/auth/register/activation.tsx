import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AuthLayout from '../AuthLayout';

import { registerActions } from './registerSlice';
import { RootState } from 'storeConfig/store';
import useRedux from 'hooks/useRedux';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* bottom links */
const BottomLink = () => (
    <Row className="mt-3">
        <Col xs={12} className="text-center">
            <p className="text-muted">
                Already have an account?
                <Link to="/login" className="text-dark fw--medium ms-1">
                    <b>Sign In</b>
                </Link>
            </p>
        </Col>
    </Row>
);

const Activation = () => {
    const { dispatch } = useRedux();
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state: RootState) => getApiState(state));
    const renderAfterCalled = useRef(false);
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        if (id && !renderAfterCalled.current) {
            dispatch(registerActions.activation({ token: id }));
        }
        renderAfterCalled.current = true;
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            // Clear local error after a delay (e.g., 5000 milliseconds)
            const clearTimer = setTimeout(() => {
                setLocalError(null);
                dispatch(clearState());
                navigate('/login');
            }, 3000);

            return () => {
                clearTimeout(clearTimer);
            };
        }

        if (error) {
            // Set local error and clear it after a delay
            setLocalError(error);
            const clearTimer = setTimeout(() => {
                setLocalError(null);
                dispatch(clearState());
                navigate('/login');
            }, 3000);

            return () => {
                clearTimeout(clearTimer);
            };
        }

        // Ensure the function returns void or nothing
        return undefined;
    }, [successMessage, error, dispatch]);

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                {successMessage && !loading && !error && (
                    <Alert variant="success" className="my-5">
                        {successMessage}
                    </Alert>
                )}
                {localError && (
                    <Alert variant="danger" className="my-5">
                        {localError}
                    </Alert>
                )}
                {loading && <Loader />}
            </div>
        </AuthLayout>
    );
};

export default React.memo(Activation);
