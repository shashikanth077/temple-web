import React from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { APICore } from 'helpers';
import { PublicImageURL } from 'constants/publicUrl';
import { config } from 'config/Env';
import ButtonV1 from 'sharedComponents/button/buttonv1';

interface EventProps{
    events:any;
    currentEventData:any;
    pageCount:number;
    onchangclick:any;
    member?:boolean;
}
/* eslint no-underscore-dangle: 0 */
function EventContent(props:EventProps) {
    const {
        events, currentEventData, pageCount, onchangclick, member,
    } = props;

    const navigate = useNavigate();

    const handleBook = (e:any, id:string) => {
        if (!APICore?.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/event-book/${id}`);
            navigate('/login');
        } else {
            navigate(`/event-book/${id}`);
        }
    };

    return (

        <div className="container">
            {currentEventData && currentEventData.length > 0 ? (
                currentEventData.map((event:any, index:number) => (
                    <>
                        <h2 className="events-calender-list-month-sep">
                            <time className="common-h6-min-medium" dateTime="2023-11">
                                {moment(event.startDate).format('MMM YYYY')}
                            </time>
                        </h2>
                        <div className="d-flex col-12 events-calendar-list-event-wrapper">
                            <article className="d-flex col-12 events-calendar-list-event">
                                <div className="col-1 events-calendar-list-event-date-tag">
                                    <time className="events-calendar-list-event-date-tag-datetime" aria-hidden="true">
                                        <span className="events-calendar-list-event-date-tag-weekday">
                                            {moment(event.startDate).format('ddd')}
                                        </span>
                                        <span className="events-common-h4--min-medium">
                                            {moment(event.endDate).format('DD')}
                                        </span>
                                    </time>
                                </div>

                                <div className="col-8 events-calendar-list-event-details">

                                    <header className="events-calendar-list-event-header">
                                        <div className="events-calendar-list-event-datetime-wrapper">
                                            <span className="event-date-start">
                                                <i className="fas fa-calendar-week" />{moment(event.startDate).format('MMM DD,YYYY @ h a')}
                                            </span> - <span className="event-date-end">{moment(event.endDate).format('MMM DD,YYYY @ h a')}</span>

                                        </div>
                                        <h3 className="events-calendar-list-event-title events-common-h4--min-medium">

                                            {!member ? (
                                                <Link className="events-calendar-list-event-name" to={`${config.PUBLIC_URL}/events/eventsdetails/${event._id}`}>
                                                    {event.name}
                                                </Link>
                                            ) : (
                                                <span className="events-calendar-list-event-name">
                                                    {event.name}
                                                </span>
                                            )}

                                        </h3>
                                        <address className="events-calendar-list-event-venue events-common-b2">
                                            <span className="events-calendar-list-event-venue-title events-common-b2--bold">
                                                {event.venue}
                                            </span>
                                        </address>
                                    </header>

                                    <div className="events-calendar-list-event-description">
                                        <p>{event.description}</p>
                                    </div>
                                    <div className="events-c-small-cta events-common-b3 events-calendar-list-event-cost">
                                        <span className="events-c-small-cta-price">
                                            ${event.bookingPrice}
                                        </span>
                                        <ButtonV1
                                            label="Book now"
                                            btnClassName="events-common-c-btn-border-small events-c-top-bar-today-button"
                                            onClick={e => handleBook(e, event?._id)}
                                            btnType="button"
                                            imgClassName="right-arrow"
                                            imgAlt="right-arrow"
                                            imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                        />

                                    </div>

                                </div>
                                <div className="events-calendar-list-event-featured-image-wrapper events-common-g-col">
                                    <img src={event.image} alt="eventImage" />
                                </div>
                            </article>
                        </div>
                    </>
                ))

            ) : (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="item-empty-area text-center">
                            <div className="item-empty-area__icon mb-30">
                                <i className="pe-7s-cart" />
                            </div>
                            <div className="item-empty-area__text">
                                No events found <br />{' '}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentEventData && currentEventData.length > 0 ? (
                <div className="pro-pagination-style text-center mt-30">
                    <nav aria-label="Page navigation comments" className="mt-4">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            activeClassName="active"
                            onPageChange={onchangclick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<<"
                            renderOnZeroPageCount={null}
                        />
                    </nav>
                </div>
            ) : ('')}
        </div>
    );
}

export default EventContent;
