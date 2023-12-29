import React from 'react-bootstrap';
import { useEffect } from 'react';
import HomeEvents from './homeevents';
import { selectEventsList } from 'features/events/eventSelector';
import { eventsActions } from 'features/events/eventsSlice';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

export default function Dailyevents() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);

    const eventsList = appSelector(selectEventsList);

    const eventMap = eventsList.map((item:any) => (
        <div key={item.event_id}>
            <div
                className="slider-item"
                style={{ backgroundImage: `url(${item.image})` }}
            >

                <Anchor classnames="event-anchor" title="know-more" />
            </div>
        </div>
    ));

    return (
        <HomeEvents
            classes="daily-event-section"
            type="dailyevents"
            heading="Daily Events"
            arrowsStatus={false}
            slidesToShowStatus={1}
            autoplayStatus
            data={eventMap}
        />
    );
}
