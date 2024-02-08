import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeadingVersionOne from 'sharedComponents/heading/headingVersionOne';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';
import { APICore } from 'helpers';

/* eslint no-underscore-dangle: 0 */
export default function DonationTypes() {
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    const handleBook = (e:any, id:string) => {
        if (!APICore.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/donation-confirm/${id}`);
            navigate('/login');
        } else {
            navigate(`/donation-confirm/${id}`);
        }
    };

    const donationTypes = useSelector(selectDonationTypes);

    return (
        <section className="donation-list-section area-padding">
            <div className="container">
                <HeadingVersionOne classes="donation-heading" title="Donation type list" />
                <div className="card flex donations-list">
                    {donationTypes?.map((donationType:any) => (
                        <div className="card-donation-section">
                            <img className="donation-image" src={`${donationType?.image}`} alt={`${donationType.donationType}`} />
                            <h4>{donationType?.donationType}</h4>
                            <h5>{donationType?.description}</h5>
                            <div className="donation-btn">
                                <ViewMore url={`/donation-details/${donationType?._id}`} classnames="d" title="View more" />
                                <button onClick={e => handleBook(e, donationType?._id)} type="button">Donate Now <img className="right-arrow" src={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`} alt="right-arrow" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
