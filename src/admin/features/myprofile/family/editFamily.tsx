import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom'; // getting from URL
import { Calendar } from 'primereact/calendar';

import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { myprofileActions } from '../myProfileSlice';
import { selectFamilyById } from '../myProfileSelectors';
import { NakshtraRasi, Relationship } from 'constants/profile';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';
import { FamilyData } from 'models';
import { clearState } from 'storeConfig/api/apiSlice';
import Loader from 'sharedComponents/loader/loader';

/* eslint-disable */
const EditFamily = () => {
    const { dispatch, appSelector } = useRedux();
    const { id } = useParams<any>();
    const [date, setDate] = useState(null);

    const [loggedInUser] = useUser();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const toast = useRef<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string().required('Please enter first name').min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required('Please enter last name').min(2, 'This value is too short. It should have 2 characters or more.'),
            dateOfBirth: yup.string().required('Please enter DOB'),
            star: yup.string().required('Please enter Star').min(2, 'This value is too short. It should have 2 characters or more.'),
            gotram: yup.string().required('Please enter Gotram').min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );
    
    const methods = useForm<FamilyData>({
        resolver: schemaResolver,
    });

    useEffect(() => {
        dispatch(myprofileActions.getFamilById({ userid: loggedInUser?.id ,id:id}));
    }, [dispatch]);

    
    const {
        handleSubmit,
        register,
        control,
        reset,
        setValue,
        formState: { errors },
    } = methods;

    const onDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: FamilyData) => {
        console.log(formData);
        dispatch(myprofileActions.updateFamily(formData));
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

    let Family = appSelector(selectFamilyById);

    useEffect(() => {
        setValue('firstName', Family?.firstName);
        setValue('lastName', Family?.lastName);
        setValue('star', Family?.star);
        setValue('gotram', Family?.gotram);
        setValue('dateOfBirth', new Date(Family?.dateOfBirth));
        setValue('relationship', Family?.relationship);
        setValue('id', Family?._id);
        setValue('userid', loggedInUser?.id);
    }, [setValue, Family]);
   
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
                                    <b>Edit family member</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="family-form" id="family-form" onSubmit={onSubmit}>
                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="hidden"
                                                            name="id"
                                                            defaultValue={Family._id}
                                                            register={register}
                                                            key="id"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                         <FormInput
                                                            type="hidden"
                                                            name="userId"
                                                            defaultValue={loggedInUser?.id}
                                                            register={register}
                                                            key="userId"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            name="firstName"
                                                            defaultValue={Family.firstName}
                                                            register={register}
                                                            key="firstName"
                                                            errors={errors}
                                                            control={control}
                                                            label="First name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={Family.lastName}
                                                            register={register}
                                                            key="lastName"
                                                            errors={errors}
                                                            control={control}
                                                            name="lastName"
                                                            label="Last name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                    <Controller
                                                        name="dateOfBirth"
                                                        key="dateOfBirth"
                                                        defaultValue={new Date(Family.dateOfBirth)} // Convert string to Date object
                                                        // errors={errors}
                                                        control={control}
                                                        rules={{ required: 'Date is required.' }}
                                                        render={({ field }) => (
                                                            <>
                                                                <label htmlFor={field.name}>Date of birth</label>
                                                                <Calendar
                                                                    value={field.value} // Set the value from the form state
                                                                    onChange={e => field.onChange(e.value)} // Update the form state when the value changes
                                                                    showIcon
                                                                    className="events-top-bar-datepicker-button mb-3"
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <FormInput
                                                        register={register}
                                                        key="star"
                                                        defaultValue={Family.star}
                                                        errors={errors}
                                                        control={control}
                                                        label="Star"
                                                        type="select"
                                                        containerClass="mb-3"
                                                        id="star"
                                                        name="star"
                                                >
                                                    <option value="">Select</option>
                                                    {NakshtraRasi?.map((option:any, index:any) => (
                                                        <option  key={option.label}  value={option.label}>{option.label} </option>
                                                    ))}
                                                </FormInput>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={Family.gotram}
                                                            name="gotram"
                                                            label="Gothram"
                                                            register={register}
                                                            key="gotram"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                        <div className="form-group">
                                                        <FormInput
                                                    register={register}
                                                    key="relationship"
                                                    errors={errors}
                                                    defaultValue={Family.relationship}
                                                    control={control}
                                                    label="Relationship"
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="relationship"
                                                    name="relationship"
                                                >
                                                    <option value="">Select</option>
                                                    {Relationship?.map((option:any, index:any) => (
                                                        <option  key={option.label}  value={option.label}>{option.label} </option>
                                                    ))}
                                                </FormInput>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-1 waves-effect waves-light' disabled={loading}>
                                                            Update
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/myprofile/profileview" id="cancel"> Cancel</a>
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

export default EditFamily;
