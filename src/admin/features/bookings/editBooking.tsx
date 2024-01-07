import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admingodActions } from '../godmaster/godSlice';
import { selectGods } from '../godmaster/godSelector';
import { adminServiceActions } from './bookingSlice';
import { selectService } from './bookingSelector';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Booking } from 'models';
import Loader from 'sharedComponents/loader/loader';
import ImageComponent from 'sharedComponents/Image/image';

/* eslint-disable */
const ServiceTypes:any = [
    { id: 'Homam', name: 'Homam' },
    { id: 'Pooja', name: 'Pooja' },
    { id: 'Archana', name: 'Archana' },
];

const bookingTypes:any = [
    { id: 'Regular', name: 'Regular' },
    { id: 'Pre-Booking', name: 'Pre-Booking' },
];

/* eslint no-underscore-dangle: 0 */
const EditBooking = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const [image, setImage] = useState({ preview: '', data: '' })
    const { id } = useParams<any>();
    const toast = useRef<any>(null);
    const [checkBoxVal, SetCheckboxVal] = useState(false);

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);

    const GodDetails:any = appSelector(selectGods);

    useEffect(() => {
        dispatch(adminServiceActions.getServiceById({ _id: id }));
    }, [dispatch, id]);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            bookingType: yup.string().required('Please enter booking type'),
            bookingName: yup.string().required('Please enter booking name').min(2, 'This value is too short. It should have 2 characters or more.'),
            description: yup.string().required('Please enter description').min(2, 'This value is too short. It should have 2 characters or more.'),
            amount: yup.string().required('Please enter amount').min(1, 'This value is too short. It should have 2 characters or more.'),
            image: yup
                .mixed()
                .test('required', 'Booking image is required', (value:any) => value.length > 0)
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
        reset,
        watch,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data:any) => {
        const formData:any = new FormData();

        for (const k in data) {
            if (k === 'image') {
                formData.append('image', image.data);
            } else if(k === 'isTaxable') {
                formData.append('isTaxable', checkBoxVal);
            } else {
                formData.append(k, data[k]);
            }
        }
        formData.append('_id', id);

        dispatch(adminServiceActions.updateService(formData));
    });

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const handleUploadedFile = (event:any) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setImage(img)
    };

    const service:any = appSelector(selectService);

    const SetCheckboxValue = (e:any) => {
        const { checked } = e.target;
        SetCheckboxVal(checked);
    };
    useEffect(() => {
        SetCheckboxVal(service?.isTaxable);
    }, [service]);

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
                                    <b>Edit Service</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="Service-form" id="Service-form" onSubmit={onSubmit}>
                                   
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    name="bookingName"
                                                    defaultValue={service?.serviceName}
                                                    register={register}
                                                    key="bookingName"
                                                    errors={errors}
                                                    control={control}
                                                    label="Booking name"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="bookingType"
                                                    defaultValue={service?.price}
                                                    errors={errors}
                                                    control={control}
                                                    name="bookingType"
                                                    label="Booking type"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="amount"
                                                    errors={errors}
                                                    control={control}
                                                    defaultValue={service?.bookingType}
                                                    label="Amount"
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="amount"
                                                    name="amount"
                                                >
                                                    <option value="">Select</option>
                                                    {bookingTypes?.map((option:any, index:any) => (
                                                        <option value={option.id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="description"
                                                    errors={errors}
                                                    defaultValue={service?.accountNumber}
                                                    control={control}
                                                    name="description"
                                                    label="Description"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormInput
                                                type="textarea"
                                                name="description"
                                                defaultValue={service?.description}
                                                label="Description"
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
                                                    label="Image"
                                                    onChange={handleUploadedFile}
                                                    register={register}
                                                    key="image"
                                                    errors={errors}
                                                    control={control}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                            <ImageComponent classname="img-thumbnail" imageUrl={service?.image} width="40" height="40" altText="s" />
                                        </div>
                                    </div>
                            
                                    <div className="row text-center">
                                        <div className="col-sm-12">

                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className="btn btn-primary submit-btn mr-5 waves-effect waves-light" disabled={loading}>
                                                    Update
                                                </Button>
                                                <a className="btn primary cancelbtn" href="/admin/services/list" id="cancel"> Cancel</a>
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

export default EditBooking;
