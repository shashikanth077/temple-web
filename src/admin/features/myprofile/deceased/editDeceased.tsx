import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom'; // getting from URL
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { myprofileActions } from '../myProfileSlice';
import { selectDeasedById } from '../myProfileSelectors';
import { DeceasedData } from 'models';
import {
    Masam, Tithi, Paksha, NakshtraRasi, Relationship,
} from 'constants/profile';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux, useUser } from 'hooks';

import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/api/apiSlice';

/* eslint-disable */
const EditDeceased = () => {
    const { dispatch, appSelector } = useRedux();
    const { id } = useParams<any>();
    const navigate = useNavigate();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const toast = useRef<any>(null);
    const [time, setTime] = useState<string | null>(null);
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
            personName: yup.string().required('Please enter person name').min(2, 'This value is too short. It should have 2 characters or more.'),
        }),
    );

    const methods = useForm<DeceasedData>({
        resolver: schemaResolver,
    });

    useEffect(() => {
        dispatch(myprofileActions.getDeceasedById({ userid: loggedInUser?.id ,id:id}));
    }, [dispatch]);
    
    const {
        handleSubmit,
        register,
        control,
        reset,
        setValue,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
            navigate('/myprofile/profileview');
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
        formData.userid =  loggedInUser?.id;
        formData.id =  id;
        formData.deathTime = time;
        dispatch(myprofileActions.updateDeceased(formData));
    });
 
    let Deceased = appSelector(selectDeasedById);

    useEffect(() => {
        setValue('personName', Deceased?.personName);
        setValue('star', Deceased?.star);
        setValue('gotram', Deceased?.gotram);
        setValue('deathDate', new Date(Deceased?.deathDate));
        setValue('deathTime', Deceased?.deathTime);
        setValue('masam', Deceased?.masam);
        setValue('tithi', Deceased?.tithi);
        setValue('paksha', Deceased?.paksha);
        setValue('relationship', Deceased?.relationship); 
        setValue('deathPlace', Deceased?.deathPlace);
    }, [setValue, Deceased]);

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
                                    <b>Edit deceased ancestor</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="edit-deceased-form" id="edit-deceased-form" onSubmit={onSubmit}>
                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={Deceased.personName}
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
                                                        defaultValue={Deceased.relationship}
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
                                                            defaultValue={Deceased.deathDate}
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
                                                            defaultValue={Deceased.deathTime}
                                                            // errors={errors}
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
                                                            defaultValue={Deceased.gotram}
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
                                                        defaultValue={Deceased.tithi}
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
                                                        defaultValue={Deceased.paksha}
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
                                                        defaultValue={Deceased.masam}
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
                                                        defaultValue={Deceased.star}
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
                                                            defaultValue={Deceased.deathPlace}
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

export default EditDeceased;
