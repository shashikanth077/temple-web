import React from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from './Svg';

function Error() {
    const navigate = useNavigate();
    const goBack = (e:any) => {
        e.preventDefault();
        navigate('-1');
    };

    return (
        <div className="appie-error-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="appie-error-content text-center">
                            <Svg />
                            <span>Sorry!</span>
                            <h3 className="title">The page can’t be found.</h3>
                            <p>
                                The page you`re looking for isnt available. Use the go back
                                button below
                            </p>
                            <button type="button" onClick={e => goBack(e)}>
                                Go Back <i className="fal fa-arrow-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
