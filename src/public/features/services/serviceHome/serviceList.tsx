import React, { useEffect } from 'react';
import {
    Col, Container, Row, Card,
} from 'react-bootstrap';
import { selectAllServiceList } from '../serviceSelector';
import { serviceActions } from '../serviceSlice';
import useRedux from 'hooks/useRedux';
import SlickSlider from 'sharedComponents/carosel/carosel';
import Heading from 'sharedComponents/heading/heading';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';

/* eslint no-underscore-dangle: 0 */
export default function Services() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(serviceActions.getAllServices());
    }, [dispatch]);

    const bookingList:any = appSelector(selectAllServiceList);

    const renderBookingItem = (booking:any) => (
        <div key={booking._id} className="slider-item">
            <Card className="booking-box p-m-2">
                <img alt={booking?.serviceName} src={booking?.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <p className="p-m-0 booking-title p-text-center">{booking?.serviceName}</p>
                <ViewMore classnames="bookingb-btn" title="View more" url={`/service-details/${booking._id}`} />
            </Card>
        </div>
    );

    if (bookingList?.length === 0) {
        return null;
    }

    return (
        <section className="booking-home area-padding">
            <Container>
                <div className="justify-content-between gy-4">
                    <Col xs={12}>
                        <div className="justify-content-right row">
                            <Heading title="Services" />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <SlickSlider
                                    arrowClassPrev="booking-home-next-pr"
                                    arrowClassNext="booking-home-prev-ar"
                                    NumOfSlide={4}
                                    autoPly
                                    autoplaySpeedVal={6000}
                                >
                                    {bookingList?.map((booking:any, index:any) => (
                                        <div key={booking._id}>{renderBookingItem(booking)}</div>
                                    ))}
                                </SlickSlider>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </Container>
        </section>
    );
}
