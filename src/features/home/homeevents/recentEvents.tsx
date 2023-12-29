import React from 'react-bootstrap';
import { useEffect } from 'react';
import HomeEvents from './homeevents';
import { selectEventsList } from 'features/events/eventSelector';
import { eventsActions } from 'features/events/eventsSlice';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

export default function Recentevents() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);

    const eventsList = appSelector(selectEventsList);

    const RecenteventMap = eventsList.map((item:any) => (
        <div key={item.event_id}>
            <div
                className="slider-item"
                style={{ backgroundImage: `url(${item.event_image})` }}
            >
                <p className="event-recent-date">{item.event_date}</p>
                <Anchor classnames="event-more-details" title="know-more" />
            </div>
        </div>
    ));

    return (
        <HomeEvents
            classes="recent-event-section"
            type="recentevents"
            arrowsStatus={false}
            slidesToShowStatus={1}
            autoplayStatus
            heading="Recent Events"
            data={RecenteventMap}
        />

    );
}
