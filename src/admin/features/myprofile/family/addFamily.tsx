import React, { useRef, useState } from 'react';
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
import { useRedux } from 'hooks';
import { FamilyData } from 'models';
import Loader from 'sharedComponents/loader/loader';

/* eslint-disable */
const AddFamily = () => {
    const { dispatch } = useRedux();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const toast = useRef<any>(null);
    const [date, setDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            relationship: yup.string().required('Please select relationship'),
            firstName: yup.string().required('Please enter firstname').min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required('Please enter lastname').min(2, 'This value is too short. It should have 2 characters or more.'),
            dob: yup.string().required('Please enter DOB'),
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
        dispatch(myprofileActions.addFamily(formData));
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
                                                        name="dob"
                                                        // errors={errors}
                                                        defaultValue={new Date()}
                                                        control={control}
                                                        rules={{ required: 'Date is required.' }}
                                                        render={({ field, fieldState }) => (
                                                            <>
                                                                <label htmlFor={field.name}>Date of birth</label>
                                                                <Calendar value={date} onChange={(e:any) => setDate(e.value)} showIcon className="events-top-bar-datepicker-button mb-3" />
                                                            </>
                                                        )}
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
                                                                register={register}
                                                                key="relationship"
                                                                containerClass="mb-3"
                                                                errors={errors}
                                                                control={control}
                                                                label="Relationship"
                                                                type="select"
                                                                className='form-control'
                                                                id="relationship"
                                                                name="relationship"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="father">Father </option>
                                                                <option value="mother">Mother </option>
                                                                <option value="son">Son </option>
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
