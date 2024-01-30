import React from 'react';

/* eslint-disable */
const ServiceSuccess = () =>(
    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 sd-dashboard">
        <div className="sd-profile sd-seva-form">
            <h2 className="sd-side-heading fw400">
                <span className="fw700">Payment </span>Page
            </h2>
            <div className="sd-success">
                <div className="sd-success-top sd-green">
                    <img src="data:image/png;base64,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" alt="success" />
                    <p>Success</p>
                </div>
                <div className="sd-success-bottom">
                    <p>Confirmed! Your booking with ID: (141-290124190843-vm44To) for <b>Service name</b> - Rs. <b>30 </b>has been made successfully. Looking forward to meeting you on a journey towards spirituality. </p>
                    <div className="sd-success-bottom-down">
                        <p className="sd-border-right">Booking History</p>
                        <p>Go to Home</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ServiceSuccess;
