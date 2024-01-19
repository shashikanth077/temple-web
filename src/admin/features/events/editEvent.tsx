import React, { useRef, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminEventActions } from './adminEventSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Event } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/api/apiSlice';
import ImageComponent from 'sharedComponents/Image/image';

/* eslint-disable */
const EditEvent = () => {
    const { dispatch } = useRedux();
    const {id} = useParams();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const toast = useRef<any>(null);
    const [datetime12h, setDateTime12h] = useState<any>(null);
    const [endDatetime12h, setDateTimeEnd12h] = useState(null);

    useEffect(() => {
        dispatch(adminEventActions.getEventById({_id:id}))
    },[]);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const { event } = useSelector((state:any) => state.adminEvent);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            description: yup.string().required('Please enter add description').min(20, 'This value is too short. It should have 2 characters or more.'),
            organizer: yup.string().required('Please enter organizer').min(2, 'This value is too short. It should have 2 characters or more.'),
            image: yup.string().required('Please upload image'),
            name: yup.string().required('Please enter event name').min(2, 'This value is too short. It should have 2 characters or more.'),
            bookingPrice: yup.number().required('Please enter price'),
            organizerPhone: yup.string().required('Please enter organizer phone').min(2, 'This value is too short. It should have 2 characters or more.'),
            startDate: yup.string().required('Please enter startDate').min(2, 'This value is too short. It should have 2 characters or more.'),
            endDate: yup.string().required('Please enter endDate').min(2, 'This value is too short. It should have 2 characters or more.'),
            venue: yup.string().required('Please enter venue').min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );


    const methods = useForm<Event>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: Event) => {
        formData._id = id ? id : '';
        dispatch(adminEventActions.updateEvent(formData));
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
                                    <b>Update Event</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="Event-form" id="add-add-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="hidden"
                                                            name="_id"
                                                            defaultValue={event._id}
                                                            register={register}
                                                            key="_id"
                                                            control={control}
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            name="name"
                                                            defaultValue={event.name}
                                                            register={register}
                                                            key="name"
                                                            errors={errors}
                                                            control={control}
                                                            label="Event name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            register={register}
                                                            defaultValue={event.bookingPrice}
                                                            key="bookingPrice"
                                                            errors={errors}
                                                            control={control}
                                                            name="bookingPrice"
                                                            label="Booking price"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                      <Controller
                                                            name="startDate"
                                                            key={"startDate"}
                                                            defaultValue={event.startDate}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field, fieldState }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>Start date</label>
                                                                    <Calendar  showIcon inputId={field.name} value={datetime12h} onChange={(e:any) => setDateTime12h(e.value)} showTime hourFormat="12" dateFormat="dd/mm/yy" className='events-top-bar-datepicker-button mb-3' />
                                                               </>
                                                            )}
                                                        />
                                                        </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                      <Controller
                                                            name="endDate"
                                                            key={"endDate"}
                                                            // errors={errors}
                                                            defaultValue={event.endDate}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field, fieldState }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>End date</label>
                                                                    <Calendar showIcon inputId={field.name} value={endDatetime12h} onChange={(e:any) => setDateTimeEnd12h(e.value)} showTime hourFormat="12" dateFormat="dd/mm/yy" className='events-top-bar-datepicker-button mb-3' />
                                                               </>
                                                            )}
                                                        />
                                                        </div>
                                                </div>
                                            </div>
                                          

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="textarea"
                                                            name="description"
                                                            defaultValue={event.description}
                                                            label="Description"
                                                            register={register}
                                                            key="description"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                             </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={event.organizer}
                                                            name="organizer"
                                                            label="Organizer"
                                                            register={register}
                                                            key="organizer"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={event.organizerPhone}
                                                            name="organizerPhone"
                                                            label="Organizer phone"
                                                            register={register}
                                                            key="organizerPhone"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <FormInput
                                                        type="text"
                                                        name="venue"
                                                        defaultValue={event.venue}
                                                        label="Venue"
                                                        register={register}
                                                        key="venue"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInput
                                                        type="text"
                                                        name="image"
                                                        defaultValue={event.image}
                                                        label="Image"
                                                        register={register}
                                                        key="image"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
                                                     <ImageComponent classname="img-thumbnail" imageUrl={event?.image} width="50" height="50" altText={event.name} />
                                                </div>
                                               
                                            </div>    

                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-1 waves-effect waves-light' disabled={loading}>
                                                            Update
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/admin/events/list" id="cancel"> Cancel</a>
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

export default EditEvent;
