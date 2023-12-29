import React from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import moment from 'moment';
import { useRedux } from 'hooks';
import { selectEventsList } from 'features/events/eventSelector';

/* eslint no-underscore-dangle: 0 */
function EventDetails() {
    const { id } = useParams(); // getting from URL
    const { appSelector } = useRedux();

    const products = appSelector(selectEventsList);

    const events:any = products.find((event:any) => event._id.toString() === id);

    return (
        <section className="event-details-section area-padding">
            <div className="container">
                <Row>
                    <div className="event-details-heading">
                        <h1 className="event-headline">
                            {events.event_name}
                        </h1>
                        <div><i className="fas fa-calendar-week" /><span className="event-date"> {moment(events.startDate).format('MMM DD,YYYY @ h a')} -  {moment(events.endDate).format('MMM DD,YYYY @ h a')}</span></div>
                        <div className="event-price-book">
                            <span className="event-price">${events.bookingPrice}</span>
                            <a href="##" className="events-common-c-btn-border-small events-c-top-bar-today-button" aria-label="Click to select today's date" title="Click to select today's date">
                                Book now
                            </a>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="event-details-content">
                        <div className="event-details-image mt-15">
                            <img src={`/${events.image}`} alt="event" />
                        </div>
                        <div className="event-details-description mt-10 mb-20">
                            <p>
                                {events.description}
                            </p>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className="col-md-6 col-xs-6 events-group-details-organizer d-flex">
                        <div className="bootCols">
                            <h2 className="events-single-section-title"> Details </h2>
                            <dl>
                                <dt> Start: </dt>
                                <dd>
                                    <abbr className="events-abbr"> {moment(events.startdate).format('MMM DD,YYYY @ h a')} </abbr>
                                </dd>

                                <dt className="events-end-datetime-label"> End: </dt>
                                <dd>
                                    <abbr className="events-abbr"> {moment(events.enddate).format('MMM DD,YYYY @ h a')} </abbr>
                                </dd>

                                <dt> Cost: </dt>
                                <dd> ${events.bookingprice} </dd>

                            </dl>
                        </div>
                        <div className="bootCols">
                            <h2 className="events-single-section-title"> Organizer </h2>
                            <dl>
                                <dt> Name: </dt>
                                <dd>
                                    <abbr className="events-abbr"> {events.organizer}</abbr>
                                </dd>

                                <dt> Phone: </dt>
                                <dd>
                                    <abbr className="events-abbr"> {events.organizerPhone}</abbr>
                                </dd>
                                <dt> Email: </dt>
                                <dd> {events.organizerEmail}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-6 events-group-details-venue d-flex">
                        <div className="bootCols">
                            <h2 className="events-single-section-title"> Venue </h2>
                            <dl>
                                <dt className="events-start-datetime-label"> </dt>
                                <dd>
                                    <span>
                                        {events.venue}
                                    </span>
                                </dd>

                            </dl>
                        </div>
                        <div className="bootCols venue-map">
                            <img src="/assets/images/maptemp.png" className="venue-map" alt="Venue Address" />
                        </div>
                    </div>
                </Row>
            </div>
        </section>
    );
}

export default EventDetails;
