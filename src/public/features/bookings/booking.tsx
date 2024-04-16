import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { myBookingsActions } from './bookingSlice';
import { selectSevaList } from './bookingSelector';
import Heading from 'sharedComponents/heading/heading';
import SlickSlider from 'sharedComponents/carosel/carosel';
import useRedux from 'hooks/useRedux';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';

/* eslint-disable */
export default function Bookings() {
    const { dispatch, appSelector } = useRedux();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [slideOnPage, setSlideOnPage] = useState(1);
     /* eslint-disable */
     useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        if (screenWidth < 768) {
            setSlideOnPage(1);
        } else {
            setSlideOnPage(4);
        }
      }, [screenWidth]);
      
    useEffect(() => {
        dispatch(myBookingsActions.getSevaList({}));
    }, [dispatch]);

    const bookingList:any = appSelector(selectSevaList);

    const renderBookingItem = (booking:any) => (
        <div key={booking._id} className="slider-item">
            <Card className="booking-box p-m-2">
                <img alt={booking.name} src={booking.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <p className="p-m-0 booking-title p-text-center">{booking.name}</p>
                <ViewMore classnames="bookingb-btn" title="View more" url={`/seva-details/${booking._id}`}  />
            </Card>
        </div>
    );

    if (bookingList?.bookings?.length === 0) {
        return null;
    }

    return (
        <section className="booking-home area-padding">
            <Container>
                <div className="justify-content-between gy-4">
                    <Col xs={12}>
                        <div className="justify-content-right row">
                            <Heading title="Sevas" />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <SlickSlider
                                    arrowClassPrev="booking-home-next-pr"
                                    arrowClassNext="booking-home-prev-ar"
                                    NumOfSlide={slideOnPage}
                                    autoPly
                                    autoplaySpeedVal={6000}
                                >
                                    {bookingList.bookings?.map((booking:any, index:any) => (
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
