import React from 'react';
import { useIntl } from 'react-intl';
import { selectContactDetails } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';
import { getStaticContent } from 'utils/contentUtil';

const TempleHeader = () => {
    const { appSelector } = useRedux();

    const templeDetails = appSelector(selectContactDetails);

    return (
        <div className="container temple-receipt-header">
            <div className="col-md-12">
                <div className="text-center">
                    <img
                        src={`${window.location.origin}/assets/images/logo/${templeDetails?.TempleLogo}`}
                        width={40}
                        alt="logo"
                    />
                    <p className="temple-name pt-2">
                        {templeDetails?.TempleName}
                    </p>
                    <p>{getStaticContent(templeDetails?.Address)}</p>
                    <div className="temple-contact-info">
                        <p>
                            <b>Tel</b>:{templeDetails?.Phonenumber}
                        </p>
                        <p>{templeDetails?.chartiyNo}</p>
                        <p>
                            <b>Email</b>:{templeDetails?.Emailaddress}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TempleHeader;
