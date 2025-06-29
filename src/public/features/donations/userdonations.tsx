import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/publicUrl';
import { APICore } from 'helpers';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import Heading from 'sharedComponents/heading/heading';
import DataNotFound from 'sharedComponents/DataNotFound';

/* eslint no-underscore-dangle: 0 */
export default function DonationTypes() {
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    const handleBook = (e:any, id:string, type:string) => {
        if (!APICore.isUserAuthenticated()) {
            localStorage.removeItem('targetUrl');
            if (type === 'Grocery Danam') {
                localStorage.setItem('targetUrl', '/donation/grocery/list');
            } else {
                localStorage.setItem('targetUrl', `/donation-confirm/${id}`);
            }
            navigate('/login');
        } else if (type === 'Grocery Danam') {
            navigate('/donation/grocery/list');
        } else {
            navigate(`/donation-confirm/${id}`);
        }
    };

    const donationTypes = useSelector(selectDonationTypes);

    if (!donationTypes || donationTypes.length === 0) {
        return <DataNotFound />;
    }

    return (
        <section className="donation-list-section area-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-box text-center">
                            <Heading
                                headingWrapClass="heading-head-wrap"
                                title="Donations"
                                classes="text-center mt-3"
                                align="text-center"
                            />
                        </div>
                    </div>
                </div>
                <div className="card flex donations-list">
                    {donationTypes?.map((donationType:any) => (
                        <div className="card-donation-section">
                            <img className="donation-image" src={`${donationType?.image}`} alt={`${donationType.donationType}`} />
                            <h4>{donationType?.donationType}</h4>
                            <h5>{donationType?.description}</h5>
                            <div className="donation-btn">
                                <ViewMore url={`/donation-details/${donationType?._id}`} classnames="d" title="View more" />
                                <ButtonV1
                                    onClick={e => handleBook(e, donationType?._id, donationType?.donationType)}
                                    label="Donate Now "
                                    btnClassName=""
                                    imgAlt="right-arrow"
                                    imgClassName="right-arrow"
                                    imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
