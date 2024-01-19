import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { myprofileActions } from '../myProfileSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';
import { FamilyData } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/api/apiSlice';
import { NakshtraRasi, Relationship } from 'constants/profile';

/* eslint-disable */
const AddFamily = () => {
    const { dispatch } = useRedux();
    const [loggedInUser] = useUser();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const toast = useRef<any>(null);
    const [date, setDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };
    
    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            relationship: yup.string().required('Please select relationship'),
            firstName: yup.string().required('Please enter firstname').min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required('Please enter lastname').min(2, 'This value is too short. It should have 2 characters or more.'),
            dateOfBirth: yup.string().required('Please enter DOB'),
            star: yup.string().required('Please enter Star').min(2, 'This value is too short. It should have 2 characters or more.'),
            gotram: yup.string().required('Please enter Gotram').min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );

    const methods = useForm<FamilyData>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
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
        formData.userid = loggedInUser?.id;
        dispatch(myprofileActions.addFamily(formData));
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
                                    <b>Add family member</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="family-form" id="family-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            name="firstName"
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
                                                        defaultValue={null}
                                                        // errors={errors}
                                                        control={control}
                                                        rules={{ required: 'Date is required.' }}
                                                        render={({ field }) => (
                                                            <>
                                                                <label htmlFor={field.name}>Date of birth</label>
                                                                <Calendar
                                                                    value={field.value}
                                                                    onChange={(e:any) => {
                                                                        field.onChange(e.value);
                                                                        setDate(e.value);  // Update local state if needed
                                                                    }}
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
                                                            Add
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

export default AddFamily;
