import React, { Carousel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { selectEventsList } from './eventSelector';
import { eventsActions } from './eventsSlice';
import useRedux from 'hooks/useRedux';

export default function Events() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);

    const eventsList = appSelector(selectEventsList);

    return (
        <section className="recent-events area-padding">
            <Container>
                <h4 className="text-right">Recent Events</h4>
                <Row className="justify-content-between d-flex gy-4">
                    <Carousel>
                        {eventsList.map((recentevent:any, index:any) => (
                            <Carousel.Item>
                                <img
                                    className="d-block img-fl w-100"
                                    src={`assets/images/events/${recentevent.image}`}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <div className="event-more d-flex justify-content-between align-items-center">
                                        <div className="event-date">
                                            {recentevent.startDate}
                                        </div>
                                        <div className="event-more-details">
                                            <a href="##" className="read-more">
                                                <span>Read More</span>
                                                <i className="fas fa-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </section>

    );
}
