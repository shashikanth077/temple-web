import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { adminEventActions } from 'admin/features/events/adminEventSlice';
import { useRedux } from 'hooks';
import { APICore } from 'helpers';
import { PublicImageURL } from 'constants/publicUrl';
import ButtonV1 from 'sharedComponents/button/buttonv1';

/* eslint no-underscore-dangle: 0 */
function EventDetails() {
    const { id } = useParams();
    const { dispatch } = useRedux();
    const navigate = useNavigate();
    const apiCalledRef = useRef(false);

    useEffect(() => {
        if (!apiCalledRef.current) {
            dispatch(adminEventActions.getEventById({ _id: id }));
            apiCalledRef.current = true;
        }
    }, [dispatch, id]);

    const eventData = useSelector((state:any) => state.admin.adminEvent);
    console.log('eventData', eventData);

    const handleBook = (e:any, eventId:string) => {
        if (!APICore?.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/event-book/${eventId}`);
            navigate('/login');
        } else {
            navigate(`/event-book/${eventId}`);
        }
    };

    return (
        eventData ? (
            <section className="event-details-section area-padding">
                <div className="container">
                    <Row>
                        <div className="event-details-heading">
                            <h1 className="event-headline">
                                {eventData?.event?.name}
                            </h1>
                            <div><i className="fas fa-calendar-week" /><span className="event-date"> {moment(eventData?.event?.startDate).format('MMM DD,YYYY @ h a')} -  {moment(eventData?.event?.endDate).format('MMM DD,YYYY @ h a')}</span></div>
                            <div className="event-price-book">
                                <span className="event-price">${eventData?.event?.bookingPrice}</span>
                                <ButtonV1
                                    label="Book now"
                                    btnClassName="eventData-common-c-btn-border-small eventData-c-top-bar-today-button"
                                    onClick={e => handleBook(e, eventData?.event?._id)}
                                    btnType="button"
                                    imgClassName="right-arrow"
                                    imgAlt="right-arrow"
                                    imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                />
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="event-details-content">
                            <div className="event-details-image mt-15">
                                <img src={`${eventData?.event?.image}`} alt="event" />
                            </div>
                            <div className="event-details-description mt-10 mb-20">
                                <p>
                                    {eventData?.event?.description}
                                </p>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div className="col-md-6 col-xs-6 eventData-group-details-organizer d-flex">
                            <div className="bootCols">
                                <h2 className="eventData-single-section-title"> Details </h2>
                                <dl>
                                    <dt> Start: </dt>
                                    <dd>
                                        <abbr className="eventData-abbr"> {moment(eventData?.event?.startdate).format('MMM DD,YYYY @ h a')} </abbr>
                                    </dd>

                                    <dt className="eventData-end-datetime-label"> End: </dt>
                                    <dd>
                                        <abbr className="eventData-abbr"> {moment(eventData?.event?.enddate).format('MMM DD,YYYY @ h a')} </abbr>
                                    </dd>

                                    <dt> Cost: </dt>
                                    <dd> ${eventData?.event?.bookingPrice} </dd>

                                </dl>
                            </div>
                            <div className="bootCols">
                                <h2 className="eventData-single-section-title"> Organizer </h2>
                                <dl>
                                    <dt> Name: </dt>
                                    <dd>
                                        <abbr className="eventData-abbr"> {eventData?.event?.organizer}</abbr>
                                    </dd>

                                    <dt> Phone: </dt>
                                    <dd>
                                        <abbr className="eventData-abbr"> {eventData?.event?.organizerPhone}</abbr>
                                    </dd>
                                    <dt> Email: </dt>
                                    <dd> {eventData?.event?.organizerEmail}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-6 eventData-group-details-venue d-flex">
                            <div className="bootCols">
                                <h2 className="eventData-single-section-title"> Venue </h2>
                                <dl>
                                    <dt className="eventData-start-datetime-label"> </dt>
                                    <dd>
                                        <span>
                                            {eventData?.event?.venue}
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
        ) : null
    );
}

export default EventDetails;
