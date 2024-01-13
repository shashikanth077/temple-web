import React, { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { myprofileActions } from '../myProfileSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { DeceasedData } from 'models';
import Loader from 'sharedComponents/loader/loader';
import Datepicker from 'sharedComponents/datepicker/datepicker';

/* eslint-disable */
const AddFamily = () => {
    const { dispatch, appSelector } = useRedux();
    const toast = useRef<any>(null);

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string().required('Please enter firstname').min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required('Please enter lastname').min(2, 'This value is too short. It should have 2 characters or more.'),
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

    const onDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: DeceasedData) => {
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
                                                  DeathDate
                                                    <div className="form-group">
                                                      
                                                        <Controller
                                                            
                                                            name={"deathDate"}
                                                            defaultValue={new Date()}
                                                            control={control}
                                                            render={({ field: { onChange, value } }) => {
                                                                return (
                                                                  <Datepicker
                                                                    hideAddon={'input'}
                                                                    inputClass='events-top-bar-datepicker-button'
                                                                    value={selectedDate}
                                                                    dateFormat={'dd/MM/yyyy'}
                                                                    onChange={(date: Date) => {
                                                                        onDateChange(date);
                                                                    }}
                                                                  />
                                                                );
                                                              }}
                                                        />
                                                  
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            name="star"
                                                            register={register}
                                                            key="star"
                                                            errors={errors}
                                                            control={control}
                                                            label="Star"
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
                                            </div>
                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-1 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-1 waves-effect waves-light' disabled={loading}>
                                                            Add
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/myprofile" id="cancel"> Cancel</a>
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
