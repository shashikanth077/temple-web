import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { adminEventActions } from 'admin/features/events/adminEventSlice';
import { useRedux } from 'hooks';
import { APICore } from 'helpers';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import Heading from 'sharedComponents/heading/heading';

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

    const eventData = useSelector((state: any) => state.admin.adminEvent);
    console.log('eventData', eventData);

    const handleBook = (e: any, eventId: string) => {
        if (!APICore?.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/event-book/${eventId}`);
            navigate('/login');
        } else {
            navigate(`/event-book/${eventId}`);
        }
    };

    return (
        eventData ? (
            <section className="container area-padding">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-box text-center">
                            <Heading
                                headingWrapClass="heading-head-wrap"
                                title="Event details"
                                classes="text-center mt-3"
                                align="text-center"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="event-details__img">
                        <img src={`${eventData?.event?.image}`} alt="event" />
                        <div className="event-details__date">
                            <p>{moment(eventData?.event?.startDate).format('MMM DD,YYYY @ h a')}</p>
                        </div>
                    </div>
                </div>
                <div className="event-details__bottom">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="event-details__left">
                                <div className="event-details__content-one">
                                    <p className="event-details__content-one-text-1">
                                        {eventData?.event?.description}
                                    </p>
                                </div>
                                <div className="event-details__btn-box">
                                    <ButtonV1 onClick={e => handleBook(e, eventData?.event?._id)} btnClassName="thm-btn mt-5" label="Book Now" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="event-details__sidebar">
                                <div className="event-details__details-box">
                                    <h5 className="event-details__details-box-title">Event Details</h5>
                                    <ul className="list-unstyled event-details__details-box-list">
                                        <li>
                                            <div className="left">
                                                <p>Start date:</p>
                                            </div>
                                            <div className="right">
                                                <p>{moment(eventData?.event?.startDate).format('MMM DD,YYYY @ h a')}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <p>End date:</p>
                                            </div>
                                            <div className="right">
                                                <p>{moment(eventData?.event?.endDate).format('MMM DD,YYYY @ h a')}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <p>Booking price:</p>
                                            </div>
                                            <div className="right">
                                                <p>${eventData?.event?.bookingPrice}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <p>Organizer Phone:</p>
                                            </div>
                                            <div className="right">
                                                <p><a href={`tel:${eventData?.event?.organizerPhone}`}>{eventData?.event?.organizerPhone}</a></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <p>Email:</p>
                                            </div>
                                            <div className="right">
                                                <p>
                                                    <a className="clr-primary" href={`mailto:${eventData?.event?.organizerEmail}`}>{eventData?.event?.organizerEmail}</a>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <p>Venue:</p>
                                            </div>
                                            <div className="right">
                                                <p className="clr-base">{eventData?.event?.venue}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="event-details__map">
                                    <img src="/assets/images/maptemp.png" className="venue-map" alt="Venue Address" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) : null
    );
}

export default EventDetails;
