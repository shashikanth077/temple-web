import React from 'react-bootstrap';
import { useEffect } from 'react';
import HomeEvents from './homeevents';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

/* eslint no-underscore-dangle: 0 */
export default function RegularEventSlides() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    const donationList = appSelector(selectDonationTypes);

    const RegularSponsorsmap = donationList.map((item:any) => (
        <div key={item._id}>
            <div
                className="slider-item"
                style={{ backgroundImage: `url(${item.image})` }}
            >
                <Anchor classnames="sponsor-details" title="Sponsor" />
            </div>
        </div>
    ));

    return (
        <HomeEvents
            classes="regularsponsor-event-section"
            type="regularsponsors"
            arrowsStatus={false}
            slidesToShowStatus={1}
            autoplayStatus
            heading="Sponsorships"
            data={RegularSponsorsmap}
        />
    );
}
