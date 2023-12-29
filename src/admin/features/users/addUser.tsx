import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { clearState } from '../../../storeConfig/api/apiSlice';
import { adminUserActions } from './userSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { User } from 'models';
import Loader from 'sharedComponents/loader/loader';

const AddProduct = () => {
    const { dispatch } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            role: yup.string().required('Please enter select the role'),
            firstName: yup.string().required('Please enter first name').min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required('Please enter last name').min(2, 'This value is too short. It should have 2 characters or more.'),
            phonenumber: yup.string().required('Please enter phone number').min(2, 'This value is too short. It should have 2 characters or more.'),
            email: yup.string().required('Please enter email address').email('please enter valid email id'),
        }),
    );

    const methods = useForm<User>({
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
    const onSubmit = handleSubmit((formData: User) => {
        dispatch(adminUserActions.addUser(formData));
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
                                    <b>Add new user</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="Product-form" id="Product-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="role"
                                                    errors={errors}
                                                    control={control}
                                                    label="Role"
                                                    containerClass="mb-3"
                                                    type="select"
                                                    className=""
                                                    id="role"
                                                    name="role"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Alabama">Admin </option>
                                                    <option value="Alaska">User </option>
                                                </FormInput>
                                            </div>
                                        </div>
                                    </div>
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
                                            <FormInput
                                                type="text"
                                                name="phonenumber"
                                                label="Phone number"
                                                register={register}
                                                key="phonenumber"
                                                errors={errors}
                                                control={control}
                                                containerClass="mb-3"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="email"
                                                    name="email"
                                                    register={register}
                                                    key="email"
                                                    errors={errors}
                                                    control={control}
                                                    label="Email address"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row text-center">
                                        <div className="col-sm-12">

                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className="btn btn-primary submit-btn mr-5 waves-effect waves-light" disabled={loading}>
                                                    Add
                                                </Button>
                                                <a className="btn primary cancelbtn" href="/admin/users/list" id="cancel"> Cancel</a>
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

export default AddProduct;
