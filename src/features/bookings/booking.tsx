import React, { useEffect } from 'react';
import {
    Container, Row,
} from 'react-bootstrap';
import SlickSlider from '../../sharedComponents/carosel/carosel';
import CardBox from '../../sharedComponents/cards/card';
import Heading from '../../sharedComponents/heading/heading';
import { myBookingsActions } from './bookingSlice';
import { selectBookingsList } from './bookingSelector';
import useRedux from 'hooks/useRedux';

/* eslint no-underscore-dangle: 0 */
export default function Bookings() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(myBookingsActions.getBookings({ userid: '1' }));
    }, [dispatch]);

    const bookingList = appSelector(selectBookingsList);

    return (
        <section className="booking-home area-padding">
            <Container>
                <div className="justify-content-right row">
                    <Heading title="Bookings" />
                </div>

                <Row className="justify-content-between gy-4">
                    <div className="slider-area">
                        <SlickSlider
                            arrowClassPrev="booking-home-next-pr"
                            arrowClassNext="booking-home-prev-ar"
                            NumOfSlide={4}
                            autoPly
                            autoplaySpeedVal={6000}
                        >
                            {bookingList.map((bookingtypes:any, index:any) => (
                                <div key={bookingtypes._id}>
                                    <div className="slider-item">
                                        <CardBox
                                            buttonStatus={false}
                                            imageStatus={false}
                                            cardClass="booking-box"
                                            description={bookingtypes.type}
                                            title="Bookings"
                                            buttontitle="Read More"
                                            buttonClass="read-wtbtn-more float-right"
                                        />
                                    </div>
                                </div>
                            ))}
                        </SlickSlider>
                    </div>
                </Row>
            </Container>
        </section>
    );
}
