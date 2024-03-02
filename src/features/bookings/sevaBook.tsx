import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { myBookingsActions } from './bookingSlice';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';
import Loader from 'sharedComponents/loader/loader';
import { selectBooking } from 'admin/features/bookings/bookingSelector';
import { formatCurrency } from 'helpers/currency';
import { adminBookingActions } from 'admin/features/bookings/bookingSlice';

/* eslint-disable */
const BookSeva = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(
        (state: any) => state.apiState,
    );
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [loggedInUser] = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const intl = useIntl();
    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminBookingActions.getBookingById({ _id: id }));
    }, [dispatch, id]);

    const serviceDetails = appSelector(selectBooking);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            bookingDate: yup.string().required("Please select a date"),
            NoOfPerson:yup.number().required("Please select number of person"),
        }),
    );

    const methods = useForm<any>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        watch,
        reset,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {
        data.name = serviceDetails?.name;
        data.type = serviceDetails?.sevaBookingType;
        data.amount = serviceDetails?.amount;
        data.bookingDate = selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : null;
        data.userId = loggedInUser?.id;
        data.category = "seva-book",
        dispatch(myBookingsActions.saveSevaLocalData(data));
        navigate('/confirm-seva-details');
    });

    useEffect(() => {
        if (successMessage) {
            showToast("success", "Success", successMessage);
            dispatch(clearState());
            reset();
        }

        if (error) {
            showToast("error", "Error", error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

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
                                    <b>{serviceDetails?.name}</b>
                                </h3>
                            </div>

                            <div className="card-body">
                                <div className="your-order-area">
                                    <h3>Your seva details</h3>
                                    <div className="your-order-wrap gray-bg-4 mb-4">
                                        <div className="your-order-product-info ">
                                                                                       
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Seva name
                                                    </li>
                                                    <li className='booking-info'>{serviceDetails?.name}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Price
                                                    </li>
                                                    <li className="booking-info">{formatCurrency(intl,serviceDetails?.amount)}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Booking type
                                                    </li>
                                                    <li className="booking-info">{serviceDetails?.sevaBookingType}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Category
                                                    </li>
                                                    <li className="booking-info">{serviceDetails?.category}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                               
                                <form
                                    name="Booking-form"
                                    id="Booking-form"
                                    className=''
                                    onSubmit={onSubmit}
                                >
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <Controller
                                                    defaultValue={null}
                                                    name="bookingDate"
                                                    key={"deathDate"}
                                                    control={control}
                                                    rules={{
                                                        required:
                                                            "Date is required.",
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <label
                                                                htmlFor={field.name}
                                                            >
                                                                Select date
                                                            </label>
                                                            <Calendar
                                                                value={field.value}
                                                                onChange={(
                                                                    e: any,
                                                                ) => {
                                                                    field.onChange(
                                                                        e.value,
                                                                    );
                                                                    setSelectedDate(
                                                                        e.value,
                                                                    ); // Update local state if needed
                                                                }}
                                                                showIcon
                                                                className="events-top-bar-datepicker-button mb-3"
                                                                minDate={new Date()} 
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="number"
                                                    name="NoOfPerson"
                                                    register={register}
                                                    key="NoOfPerson"
                                                    errors={errors}
                                                    control={control}
                                                    label="Number of persons"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-sm-12">
                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button
                                                    type="submit"
                                                    className="btn btn-primary book-btn submit-btn mr-1 waves-effect waves-light"
                                                    disabled={loading}
                                                >
                                                    Confirm Booking
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(BookSeva);
