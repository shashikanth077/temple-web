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
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import ImageComponent from 'sharedComponents/Image/image';
import { selectStaticEvents } from 'contents/content/contactSelectors';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
const EditEvent = () => {
    const { dispatch,appSelector } = useRedux();
    const {id} = useParams();
    const { loading, error, successMessage } = useSelector(getApiState);
    const toast = useRef<any>(null);
    const [datetime12h, setDateTime12h] = useState<any>(null);
    const [endDatetime12h, setDateTimeEnd12h] = useState<any>(null);
    

    const [image, setImage] = useState({ preview: '', data: '' })
    const staticEventContent = appSelector(selectStaticEvents);

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
            description: yup.string().required(staticEventContent?.addEvent?.formValidation?.description).min(20, 'This value is too short. It should have 2 characters or more.'),
            organizer: yup.string().required(staticEventContent?.addEvent?.formValidation?.organizer).min(2, 'This value is too short. It should have 2 characters or more.'),
            name: yup.string().required(staticEventContent?.addEvent?.formValidation?.name).min(2, 'This value is too short. It should have 2 characters or more.'),
            bookingPrice: yup.number().required(staticEventContent?.addEvent?.formValidation?.bookingPrice),
            organizerPhone: yup.string().required(staticEventContent?.addEvent?.formValidation?.organizerPhone).min(2, 'This value is too short. It should have 2 characters or more.'),
            organizerEmail: yup.string().required(staticEventContent?.addEvent?.formValidation?.organizerEmail).email(staticEventContent?.addEvent?.formValidation?.validEmail),
            startDate: yup.string().required(staticEventContent?.addEvent?.formValidation?.startDate).min(2, 'This value is too short. It should have 2 characters or more.'),
            endDate: yup.string().required(staticEventContent?.addEvent?.formValidation?.endDate).min(2, 'This value is too short. It should have 2 characters or more.'),
            venue: yup.string().required(staticEventContent?.addEvent?.formValidation?.venue).min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );


    const methods = useForm<Event>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    useEffect(() => {
        setValue('name', event.name);
        setValue('bookingPrice', event.bookingPrice);

        if(datetime12h){
            setValue('startDate', new Date(`${datetime12h} UTC`));
        } else {
            setValue('startDate', new Date(`${event.startDate} UTC`));
        }
       
        if(endDatetime12h){
            setValue('endDate', new Date(`${endDatetime12h} UTC`));
        } else {
            setValue('endDate', new Date(`${event.endDate} UTC`));
        }
       
        setValue('description', event.description);
        setValue('organizerPhone', event.organizerPhone);
        setValue('organizerEmail', event.organizerEmail);
        setValue('venue', event.venue);
        setValue('organizer', event.organizer);
    
    },[event,datetime12h,endDatetime12h])

    useEffect(() => {
        setDateTime12h(new Date(`${event.startDate} UTC`));
        setDateTimeEnd12h(new Date(`${event.endDate} UTC`));
    },[event]);

    const handleUploadedFile = (event:any) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setImage(img);
    };

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {
        const formData:any = new FormData();
        for (const k in data) {
            if(k === 'image') {
                formData.append('image', image.data)
            } else {
                formData.append(k, data[k]);
            }
        }
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
                                    <b>{staticEventContent?.editEvent?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form encType="multipart/form-data" id="edit-add-form" onSubmit={onSubmit}>
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
                                                            label={staticEventContent?.addEvent?.formLabels?.name}
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
                                                            name="bookingPrice"
                                                            errors={errors}
                                                            control={control}
                                                            label={staticEventContent?.addEvent?.formLabels?.bookingPrice}
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
                                                            defaultValue={new Date(`${event.startDate} UTC`)}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>{staticEventContent?.addEvent?.formLabels?.startDate}</label>
                                                                    <Calendar  
																		showIcon 
																		inputId={field.name} 
																		value={datetime12h} 
																		onChange={(e:any) => setDateTime12h(e.value)} 
																		showTime 
																		hourFormat="12" 
																		dateFormat="dd/mm/yy" 
																		className='events-top-bar-datepicker-button mb-3' 
																	/>
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
                                                            defaultValue={new Date(`${event.endDate} UTC`)}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field, fieldState }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>{staticEventContent?.addEvent?.formLabels?.endDate}</label>
                                                                    <Calendar 
                                                                        showIcon
                                                                        inputId={field.name} 
                                                                        value={endDatetime12h} 
                                                                        onChange={(e:any) => setDateTimeEnd12h(e.value)} 
                                                                        showTime 
                                                                        hourFormat="12" 
                                                                        dateFormat="dd/mm/yy" 
                                                                        className='events-top-bar-datepicker-button mb-3' 
                                                                    />
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
                                                            label={staticEventContent?.addEvent?.formLabels?.description}
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
                                                            label={staticEventContent?.addEvent?.formLabels?.organizer}
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
                                                            label={staticEventContent?.addEvent?.formLabels?.organizerPhone}
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
                                                        label={staticEventContent?.addEvent?.formLabels?.venue}
                                                        register={register}
                                                        key="venue"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInput
                                                         type="file"
                                                         accept="image/*"
                                                         name="image"
                                                         label={staticEventContent?.addEvent?.formLabels?.image}
                                                         onChange={handleUploadedFile}
                                                         register={register}
                                                         key="image"
                                                         errors={errors}
                                                         control={control}
                                                         containerClass="mb-3"
                                                    />
                                                     <ImageComponent classname="img-thumbnail" imageUrl={event?.image} width="50" height="50" altText={event.name} />
                                                </div>
                                               
                                            </div>    

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <FormInput
                                                        type="text"
                                                        name="organizerEmail"
                                                        defaultValue={event.organizerEmail}
                                                        label={staticEventContent?.addEvent?.formLabels?.organizerEmail}
                                                        register={register}
                                                        key="organizerEmail"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
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
