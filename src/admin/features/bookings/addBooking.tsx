import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { adminBookingActions } from './bookingSlice';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Booking } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { category } from 'constants/seva';
import { selectStaticBookings } from 'features/content/contactSelectors';

/* eslint-disable */
const AddBooking = () => {
    const { dispatch,appSelector} = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const [image, setImage] = useState({ preview: '', data: '' })

    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const BookingStaticContent:any = appSelector(selectStaticBookings);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            category: yup.string().required(BookingStaticContent?.addBooking?.formValidation?.category),
            name: yup.string().required(BookingStaticContent?.addBooking?.formValidation?.bookingName).min(2, 'This value is too short. It should have 2 characters or more.'),
            description: yup.string().required(BookingStaticContent?.addBooking?.formValidation?.description).min(2, 'This value is too short. It should have 2 characters or more.'),
            amount: yup.string().required(BookingStaticContent?.addBooking?.formValidation?.amount).min(1, 'This value is too short. It should have 2 characters or more.'),
            image: yup
                .mixed()
                .test('required', 'Booking type image is required', (value:any) => value.length > 0)
                .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
                .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );

    const methods = useForm<Booking>({
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
    const onSubmit = handleSubmit((data:any) => {
        const formData = new FormData();
        for (const k in data) {
            if(k === 'image') {
                formData.append('image', image.data)
            } else {
                formData.append(k, data[k]);
            }
        }
        formData.append('sevaBookingType','Pre-Booking');
        dispatch(adminBookingActions.addBooking(formData));
    });
    

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
            reset();
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const handleFileChange = (event:any) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setImage(img)
    };

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
                                    <b>{BookingStaticContent?.addBooking?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form encType="multipart/form-data" name="Booking-form" id="Booking-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="name"
                                                    errors={errors}
                                                    control={control}
                                                    label={BookingStaticContent?.addBooking?.formLabels?.bookingName}
                                                    type="input"
                                                    containerClass="mb-3"
                                                    id="name"
                                                    name="name"
                                                >
                                            
                                                </FormInput>
                                            </div>
                                        </div>
                                   </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    name="amount"
                                                    register={register}
                                                    key="amount"
                                                    errors={errors}
                                                    control={control}
                                                    label={BookingStaticContent?.addBooking?.formLabels?.amount}
                                                    containerClass="mb-3"
                                                />
                                              </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <FormInput
                                                    register={register}
                                                    key="category"
                                                    errors={errors}
                                                    control={control}
                                                    label={BookingStaticContent?.addBooking?.formLabels?.category}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="category"
                                                    name="category"
                                                >

                                                    <option value="">Select</option>
                                                    {category?.map((option:any, index:any) => (
                                                        <option value={option.id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormInput
                                                type="textarea"
                                                name="description"
                                                label={BookingStaticContent?.addBooking?.formLabels?.description}
                                                register={register}
                                                key="description"
                                                errors={errors}
                                                control={control}
                                                containerClass="mb-3"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    label={BookingStaticContent?.addBooking?.formLabels?.image}
                                                    onChange={handleFileChange}
                                                    register={register}
                                                    key="image"
                                                    errors={errors}
                                                    control={control}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                            {/* <img src={preview} width="50" height="60" alt="s" /> */}
                                        </div>
                                    </div>

                                    <div className="row text-center">
                                        <div className="col-sm-12">
                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className="btn btn-primary submit-btn mr-1 waves-effect waves-light" disabled={loading}>
                                                    Add
                                                </Button>
                                                <a className="btn primary cancelbtn" href="/admin/bookingtypes/list" id="cancel"> Cancel</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBooking;
