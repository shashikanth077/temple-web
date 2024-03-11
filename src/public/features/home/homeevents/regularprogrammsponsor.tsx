import React from 'react-bootstrap';
import { useEffect } from 'react';
import HomeEvents from './homeevents';
import { eventsActions } from 'public/features/events/eventsSlice';
import { selectEventsList } from 'public/features/events/eventSelector';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

/* eslint no-underscore-dangle: 0 */
export default function RegularEventSlides() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);

    const eventsList = appSelector(selectEventsList);

    const RegularSponsorsmap = eventsList.map((item:any) => (
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
