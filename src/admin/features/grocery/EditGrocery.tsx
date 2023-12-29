import React, { useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { adminGroceryActions } from './adminGrocerySlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Grocery } from 'models';
import { clearState } from 'storeConfig/api/apiSlice';
import Loader from 'sharedComponents/loader/loader';

/* eslint-disable */
const EditGrocery = () => {
    const {id} = useParams<string>();
    const { dispatch } = useRedux();
    const toast = useRef<any>(null);

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const { Grocery } = useSelector((state:any) => state.adminGrocery);
    
    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminGroceryActions.getGroceryById({_id:id}))
    },[]);

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

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter Grocery name').min(2, 'This value is too short. It should have 2 characters or more.'),
            price: yup.number().required('Please enter price'),
            description: yup.string().required('Please enter description').min(10, 'This value is too short. It should have 10 characters or more.'),
            image: yup
                .mixed()
                .test('required', 'Grocery image is required', (value:any) => value.length > 0)
                .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
                .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );
    
    const methods = useForm<Grocery>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: Grocery) => {
        formData._id = id ? id : '';
        dispatch(adminGroceryActions.updateGrocery(formData));
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
                                    <b>Edit Grocery</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="Grocery-form" id="edit-Grocery-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput 
                                                            type="hidden"
                                                            defaultValue={Grocery._id}
                                                            name="_id"
                                                            register={register}
                                                            key="_id"
                                                            control={control}
                                                        
                                                       
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={Grocery.name}
                                                            name="name"
                                                            register={register}
                                                            key="name"
                                                            errors={errors}
                                                            control={control}
                                                            label="Grocery name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={Grocery.price}
                                                            register={register}
                                                            key="price"
                                                            errors={errors}
                                                            control={control}
                                                            name="price"
                                                            label="Price"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <FormInput
                                                        type="textarea"
                                                        name="description"
                                                        defaultValue={Grocery.description}
                                                        label="description"
                                                        register={register}
                                                        key="description"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    label="Image"
                                                    register={register}
                                                    key="image"
                                                    errors={errors}
                                                    control={control}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                            {/* <img src={preview} width="50" height="60" alt="s" /> */}
                                        </div>
                                            </div>

                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-5 waves-effect waves-light' disabled={loading}>
                                                            Update
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/admin/groceries/list" id="cancel"> Cancel</a>
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

export default EditGrocery;
