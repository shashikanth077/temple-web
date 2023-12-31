import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { adminProductActions } from './adminProductSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { Product } from 'models';
import { clearState } from 'storeConfig/api/apiSlice';
import Loader from 'sharedComponents/loader/loader';

/* eslint-disable */
const EditProduct = () => {
    const {id} = useParams<string>();
    const { dispatch } = useRedux();
    const toast = useRef<any>(null);
    const [image, setImage] = useState({ preview: '', data: '' });

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const { product } = useSelector((state:any) => state.adminproduct);
    
    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminProductActions.getProductById({_id:id}));
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
            name: yup.string().required('Please enter product name').min(2, 'This value is too short. It should have 2 characters or more.'),
            price: yup.number().required('Please enter price'),
            stock: yup.number().required('Please enter stock'),
            shortDescription: yup.string().required('Please enter short description').min(10, 'This value is too short. It should have 10 characters or more.'),
            fullDescription: yup.string().required('Please enter full description').min(10, 'This value is too short. It should have 10 characters or more.'),
            // productimage: yup
            //     .mixed()
            //     .test('required', 'product image is required', (value:any) => value.length > 0)
            //     .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
            //     .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );
    
    const methods = useForm<Product>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
    } = methods;

    useEffect(() => {
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('shortDescription', product.shortDescription);
        setValue('fullDescription', product.fullDescription);
        setValue('stock', product.stock);
    },[product])

    
    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {

        const formData:any = new FormData();
        for (const k in data) {
            if (k === 'productimage') {
                formData.append('productimage', image.data);
             } else {
                formData.append(k, data[k]);
            }
        }
        formData.append('_id', id);
        dispatch(adminProductActions.updateProduct(formData));
    });
 
    const handleUploadedFile = (event:any) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setImage(img)
    };

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
                                    <b>Edit Product</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="Product-form" id="edit-Product-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput 
                                                            type="hidden"
                                                            defaultValue={product._id}
                                                            name="_id"
                                                            register={register}
                                                            key="_id"
                                                            control={control}
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={product.name}
                                                            name="name"
                                                            register={register}
                                                            key="name"
                                                            errors={errors}
                                                            control={control}
                                                            label="Product name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={product.price}
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
                                                        name="shortDescription"
                                                        defaultValue={product.shortDescription}
                                                        label="Short description"
                                                        register={register}
                                                        key="shortDescription"
                                                        errors={errors}
                                                        control={control}
                                                        containerClass="mb-3"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={product.fullDescription}
                                                            name="fullDescription"
                                                            register={register}
                                                            key="star"
                                                            errors={errors}
                                                            control={control}
                                                            label="Full description"
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
                                                            name="stock"
                                                            defaultValue={product.stock}
                                                            label="Stock"
                                                            register={register}
                                                            key="stock"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="file"
                                                            accept="image/*"
                                                            name="productimage"
                                                            label="Image"
                                                            onChange={handleUploadedFile}
                                                            register={register}
                                                            key="productimage"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-5 waves-effect waves-light' disabled={loading}>
                                                            Update
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/admin/products/list" id="cancel"> Cancel</a>
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

export default EditProduct;
