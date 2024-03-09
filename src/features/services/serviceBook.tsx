import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { serviceActions } from './serviceSlice';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';
import Loader from 'sharedComponents/loader/loader';
import { adminServiceActions } from 'admin/features/services/serviceSlice';
import { selectService } from 'admin/features/services/serviceSelector';
import { formatCurrency } from 'helpers/currency';

/* eslint-disable */
const BookService = () => {
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
    const isMounted = useRef(true);

    const showToast = useCallback((severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    }, []);

    console.log(successMessage);
    useEffect(() => {
        if (isMounted.current) {
            dispatch(adminServiceActions.getServiceById({ _id: id }));
        }

        // Set isMounted to false when the component is unmounted
        return () => {
            isMounted.current = false;
        };
    }, [dispatch, id]);

    const serviceDetails = appSelector(selectService);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            bookingDate: yup.string().required("Please select a date"),
            NoOfPerson: yup
            .number()
            .typeError('Number of persons is required')
            .required('Number of persons is required')
            .positive('Number must be positive')
            .integer('Number must be an integer'),
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
        data.name = serviceDetails?.serviceName;
        data.godName = serviceDetails?.godName;
        data.type = serviceDetails?.serviceType;
        data.amount = serviceDetails?.price;
        data.bookingDate = selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : null;
        data.userId = loggedInUser?.id;
        data.category = "service-book",
            dispatch(serviceActions.saveBookingLocalData(data));
        navigate('/confirm-booking-details');
    });

    useEffect(() => {
        if (successMessage && !localStorage.getItem('targetUrl')) {
            showToast("success", "Success", successMessage);
            dispatch(clearState());
            reset();
        }

        if (error) {
            showToast("error", "Error", error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch, reset, showToast]);

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
                                    <b>{serviceDetails?.serviceName}</b>
                                </h3>
                            </div>

                            <div className="card-body">
                                <div className="your-order-area">
                                    <h3>Your service details</h3>
                                    <div className="your-order-wrap gray-bg-4 mb-4">
                                        <div className="your-order-product-info ">

                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Service name
                                                    </li>
                                                    <li className='booking-info'>{serviceDetails?.serviceName}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Price
                                                    </li>
                                                    <li className="booking-info">{formatCurrency(intl, serviceDetails?.price)}</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom mb-4">
                                                <ul>
                                                    <li className="your-order-shipping">
                                                        Booking type
                                                    </li>
                                                    <li className="booking-info">{serviceDetails?.bookingType}</li>
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
                                                                        );
                                                                    }}
                                                                    showIcon
                                                                    className="events-top-bar-datepicker-button mb-3"
                                                                    minDate={new Date()} />
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
                                                    <ButtonV1
                                                        disabled={loading}
                                                        btnType="submit"
                                                        label='Confirm booking'
                                                        btnClassName='btn btn-primary book-btn submit-btn mr-1 waves-effect waves-light'
                                                        imgClassName='sd-arrow-btn ml-5'
                                                        imageSrc='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAANCAYAAACUwi84AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYmEyYzU5MS01NjE1LTE5NDUtYjc1My1jYjAxMmYxZmY3ZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxNDVGRTA4QkM2MTFFQjk2QTU4N0VCNUUxNjUxMTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDIxNDVGREY4QkM2MTFFQjk2QTU4N0VCNUUxNjUxMTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjVhOWRhNTQtYzc4NC02YzRiLTlhY2UtNzZlN2Y4YTJhZDc1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZjQxYTk0ZmItNzcyNy0xMWViLWFmMzQtOWU5ZDkxNjgyNGEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EnAd9gAAAJFJREFUeNpi/P///yYGCPBjwAKYgPgjEPsC8SZsChiAJoDwhP8QcACIOaBiYMyAxGmGKjoLxALYFIBwGVTRDSAWw6YAhKOhil4BsQo2BaxAfAWqKAVdkhPqUBBoQbeCH4jPQCWr0R0JctBNqGQBujflgPgJVDIJ3U0g4jBUMhyLgxkYQbqAAfoeiNdjC2mAAAMAjQIRRut5EqsAAAAASUVORK5CYII='
                                                    />
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

export default React.memo(BookService);
