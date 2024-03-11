import React from 'react';
import { selectStaticAdminvolunteers } from 'contents/content/contactSelectors';
import { useRedux } from 'hooks';

/* eslint-disable */
const CertificateContent = () => {
    const { dispatch, appSelector } = useRedux();

    const staticContentCertificate = appSelector(selectStaticAdminvolunteers);

    return (
        <div className="container pm-certificate-container">
            <div className="outer-border"></div>
            <div className="inner-border"></div>

            <div className="pm-certificate-border col-xs-12">
                <div className="row pm-certificate-header">
                    <div className="pm-certificate-title cursive col-xs-12 text-center">
                        <h2>
                            {staticContentCertificate?.certificate?.heading}
                        </h2>
                        <img
                            src={`${window.location.origin}/assets/images/logo/logo.jpg`}
                            width={60}
                            height={60}
                        />
                        <p>
                            {staticContentCertificate?.certificate?.subHeading}
                        </p>
                    </div>
                </div>

                <div className="row pm-certificate-body">
                    <div className="pm-certificate-block">
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-2"></div>
                                <div className="pm-certificate-name underlines margin-0 col-xs-8 text-center">
                                    <span className="pm-name-text bold">
                                        Shashikanth H R
                                    </span>
                                </div>
                                <div className="col-xs-2"></div>
                            </div>
                            {/* Caption for Name */}
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <span className="underlines-caption">
                                        Recipient's Name
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-2"></div>
                                <div className="pm-certificate-name underlines margin-0 col-xs-8 text-center">
                                    <span className="pm-name-text bold">
                                        Something service name
                                    </span>
                                </div>
                                <div className="col-xs-2"></div>
                            </div>
                            {/* Caption for Another Name */}
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <span className="underlines-caption">
                                        Service name
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Repeat the pattern for additional names */}
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            <div className="pm-certificate-footer">
                                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                                    <span className="pm-credits-text block sans">
                                        {
                                            staticContentCertificate
                                                ?.certificate?.signature
                                        }
                                        :________________
                                    </span>
                                </div>
                                <div className="col-xs-4"></div>
                                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                                    <span className="pm-credits-text block sans">
                                        {
                                            staticContentCertificate
                                                ?.certificate?.dateCompleted
                                        }
                                        :_______________
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateContent;
