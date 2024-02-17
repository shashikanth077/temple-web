import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { useRedux } from 'hooks';
import Loader from 'sharedComponents/loader/loader';
import { formatCurrency } from 'helpers/currency';
import { adminEventActions } from 'admin/features/events/adminEventSlice';

/* eslint-disable */
const EventBook = () => {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { loading } = useSelector(
        (state: any) => state.apiState,
    );

    const { id } = useParams();
   
    const intl = useIntl();
    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminEventActions.getEventById({ _id: id }));
    }, [dispatch, id]);

    const { event } = useSelector((state: any) => state.adminEvent);

    const handleSubmit = () => {
        navigate('/event-payment/'+id);
    }
    
    return (
        <>
            <Toast ref={toast} />

            {loading && <Loader />}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <b>{event?.name}</b>
                                </h3>
                            </div>

                            <div className="card-body">
                                <div className="your-order-area">
                                    <div className="your-order-wrap gray-bg-4 mb-4">
                                        <div className="your-order-product-info ">
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Event name
                                                    </li>
                                                    <li className='booking-info'>{event?.name}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Price
                                                    </li>
                                                    <li className="booking-info">{formatCurrency(intl, event?.bookingPrice)}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Start date
                                                    </li>
                                                    <li className="booking-info">{moment(event?.startDate).format('DD MMM YYYY')}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        End date
                                                    </li>
                                                    <li className="booking-info">{moment(event?.endDate).format('DD MMM YYYY')}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Venue
                                                    </li>
                                                    <li className="booking-info">{event?.venue}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Organizer
                                                    </li>
                                                    <li className="booking-info">{event?.organizer}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="btn btn-primary book-btn submit-btn mr-1 waves-effect waves-light"
                                        disabled={loading}
                                    >
                                        Confirm Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(EventBook);
