import React from 'react-bootstrap';
import { useEffect } from 'react';
import HomeEvents from './homeevents';
import { selectEventsFilterList } from 'features/events/eventSelector';
import { eventsActions } from 'features/events/eventsSlice';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

/* eslint no-underscore-dangle: 0 */
export default function Dailyevents() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEventByFilter());
    }, [dispatch]);

    const eventsList = appSelector(selectEventsFilterList);

    const eventMap = eventsList?.dailyevents?.map((item: any) => (
        <div key={item.event_id}>
            <div
                className="slider-item"
                style={{ backgroundImage: `url(${item.image})` }}
            >
                <Anchor link={`/events/eventsdetails/${item._id}`} classnames="event-anchor" title="know-more" />
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
