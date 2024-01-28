import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeadingVersionOne from 'sharedComponents/heading/headingVersionOne';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';

/* eslint no-underscore-dangle: 0 */
export default function DonationTypes() {
    const { dispatch } = useRedux();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    const donationTypes = useSelector(selectDonationTypes);

    return (
        <section className="donation-list-section area-padding">
            <div className="container">
                <HeadingVersionOne classes="donation-heading" title="Donation type list" />
                <div className="card flex donations-list">
                    {donationTypes?.map((donationType:any) => (
                        <div className="card-donation-section">
                            <img className="donation-image" src={`${donationType.image}`} alt={`${donationType.donationType}`} />
                            <h4>{donationType.donationType}</h4>
                            <h5>{donationType.description}</h5>
                            <div className="donation-btn">
                                <ViewMore classnames="d" title="View more" />
                                <button type="button">Donate Now <img className="right-arrow" src={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`} alt="right-arrow" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
