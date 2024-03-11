import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { myprofileActions } from '../myProfileSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';
import { DeceasedData } from 'models';
import Loader from 'sharedComponents/loader/loader';
import {
    Masam, Tithi, Paksha, NakshtraRasi, Relationship,
} from 'constants/profile';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
const AddFamily = () => {
    const { dispatch, appSelector } = useRedux();
    const toast = useRef<any>(null);

    const { loading, error, successMessage } = useSelector(getApiState);
    const [datetime12h, setDateTime12h] = useState<any>(null);
    const [time, setTime] = useState<string | null>(null);
    const [endDatetime12h, setDateTimeEnd12h] = useState(null);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [loggedInUser] = useUser();

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            personName: yup.string().required('Please enter firstname').min(2, 'This value is too short. It should have 2 characters or more.'),
            deathDate: yup.string().required('Please enter death date'),
            star: yup.string().required('Please enter Star').min(2, 'This value is too short. It should have 2 characters or more.'),
            gotram: yup.string().required('Please enter Gotram').min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );

    const methods = useForm<DeceasedData>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = methods;

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

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: DeceasedData) => {
        formData.deathTime = time ? time : null;
        formData.userid = loggedInUser?.id;
        dispatch(myprofileActions.addDeceased(formData));
     });
 

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
                                    <b>Add deceased ancestor</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="deceased-form" id="deceased-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            name="personName"
                                                            register={register}
                                                            key="personName"
                                                            errors={errors}
                                                            control={control}
                                                            label="Person name"
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

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <Controller
                                                            name="deathDate"
                                                            key={"deathDate"}
                                                            // errors={errors}
                                                            defaultValue={null}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>Date date</label>
                                                                    <Calendar
                                                                        value={field.value}
                                                                        onChange={(e:any) => {
                                                                            field.onChange(e.value);
                                                                            setSelectedDate(e.value);  // Update local state if needed
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
                                                    <Controller
                                                            name="deathTime"
                                                            key={"deathTime"}
                                                            // errors={errors}
                                                            defaultValue={time}
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field }) => (
                                                                <>
                                                                  <label htmlFor={field.name}>Date time</label>
                                                                  <Calendar
                                                                    timeOnly
                                                                    value={field.value}
                                                                    onChange={(e:any) => {
                                                                        const formattedTime = e.value?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                                        field.onChange(e.value);
                                                                        setTime(formattedTime);
                                                                    }}
                                                                    showIcon
                                                                    icon={() => <i className="pi pi-clock" />}
                                                                    className="events-top-bar-datepicker-button mb-3"
                                                                    />
                                                                </>
                                                              )}
                                                        />                                                       
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            name="gotram"
                                                            label="Gotram"
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
                                                        key="tithi"
                                                        errors={errors}
                                                        control={control}
                                                        label="Tithi"
                                                        type="select"
                                                        containerClass="mb-3"
                                                        id="tithi"
                                                        name="tithi"
                                                    >
                                                    <option value="">Select</option>
                                                    {Tithi?.map((option:any, index:any) => (
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
                                                        register={register}
                                                        key="paksha"
                                                        errors={errors}
                                                        control={control}
                                                        label="Paksha"
                                                        type="select"
                                                        containerClass="mb-3"
                                                        id="paksha"
                                                        name="paksha"
                                                    >
                                                    <option value="">Select</option>
                                                    {Paksha?.map((option:any, index:any) => (
                                                        <option  key={option.label}  value={option.label}>{option.label} </option>
                                                    ))}
                                                    </FormInput>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <FormInput
                                                        register={register}
                                                        key="masam"
                                                        errors={errors}
                                                        control={control}
                                                        label="Masam(Months)"
                                                        type="select"
                                                        containerClass="mb-3"
                                                        id="masam"
                                                        name="masam"
                                                    >
                                                    <option value="">Select</option>
                                                    {Masam?.map((option:any, index:any) => (
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
                                                        register={register}
                                                        key="star"
                                                        errors={errors}
                                                        control={control}
                                                        label="Birth star and Rasi"
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
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <FormInput
                                                            type="text"
                                                            name="deathPlace"
                                                            register={register}
                                                            key="deathPlace"
                                                            errors={errors}
                                                            control={control}
                                                            label="Place of death"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-1 update-profile-btn">
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
