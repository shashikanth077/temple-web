import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import HeadingVersionOne from 'sharedComponents/heading/headingVersionOne';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { useRedux } from 'hooks';

/* eslint no-underscore-dangle: 0 */
export default function DonationTypes() {
    const { dispatch } = useRedux();

    const header = (name:any) => (
        <img alt="donation type" className="donation-type-img" src={`${window.location.origin}/assets/images/donationtypes/${name.image}`} />
    );

    const footer = (
        <div className="border-top pt-3 text-muted">
            <Button icon="pi pi-arrow-right" className="btn-background" label="Donate Now" iconPos="right" />
        </div>
    );

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    const donationTypes = useSelector(selectDonationTypes);

    return (
        <section className="donation-list-section area-padding">
            <div className="sd-online-booking-div">
                <img className="head-image" src="/static/media/parokshaba.ced0dc81.png" alt="/static/media/parokshaba.ced0dc81.png" />
                <h4>Pratyaksha Seva</h4>
                <h5>Pratyaksha Seva is performing/attending Temple Sevas in Person. One may book a Pratyaksha Seva online and offline.</h5>
                <button>Book Now <img className="imgs" src="/static/media/orange-arrow.90212482.svg" alt="" />
                </button>
            </div>
        </section>
    );
}
