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
            <div className="container">
                <HeadingVersionOne classes="donation-heading" />
                <div className="card flex donations-list">
                    {donationTypes?.map((donationType:any) => (
                        <Card title={donationType.type} subTitle="" footer={footer} header={header(donationType)} className="md:w-20rem flex-item">
                            <ViewMore classnames="donation-readmore" title="More info" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
