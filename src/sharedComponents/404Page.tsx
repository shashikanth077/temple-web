import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'hooks';

const Error404 = () => {
    const navigate = useNavigate();
    const [loggedInUser] = useUser();

    const handleEvent = () => {
        if (loggedInUser?.id) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <div>
            <div className="error-page-wrapper d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-9 m-auto text-center">
                            <div className="error-content-centered d-flex align-items-center justfy-content-center">
                                <div className="error-page-content-wrap">
                                    <h2>404</h2>
                                    <h3>PAGE NOT FOUND</h3>
                                    <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable.</p>
                                    <Button onClick={handleEvent} className="ht-btn ht-btn--default ht-btn--default--dark-hover">Back to Home Page</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Error404);
