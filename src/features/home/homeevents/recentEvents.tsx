import React from 'react-bootstrap';
import moment from 'moment';
import HomeEvents from './homeevents';
import { selectEventsFilterList } from 'features/events/eventSelector';
import Anchor from 'sharedComponents/button/anchor';
import useRedux from 'hooks/useRedux';

/* eslint no-underscore-dangle: 0 */
export default function Recentevents() {
    const { appSelector } = useRedux();

    const eventsList = appSelector(selectEventsFilterList);
    console.log('recentevents', eventsList.recentevents);

    const RecenteventMap = eventsList?.recentevents?.map((item:any) => (
        <div key={item._id}>
            <div
                className="slider-item"
                style={{ backgroundImage: `url(${item.image})` }}
            >
                <p className="event-recent-date">{moment(item.endDate).format('DD-MM-YYYY')}</p>
                <Anchor link={`/events/eventsdetails/${item._id}`} classnames="event-more-details" title="know-more" />
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
