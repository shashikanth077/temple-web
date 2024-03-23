import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { clearState } from '../../../storeConfig/apiStatus/apiSlice';
import { admingodActions } from './godSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { God } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { Days } from 'constants/services';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';
import { selectStaticGods } from 'contents/content/contactSelectors';

/* eslint-disable */
const AddGod = () => {
    const { dispatch,appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const [image, setImage] = useState({ preview: '', data: '' })

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const staticGodContent = appSelector(selectStaticGods);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            description: yup.string().required("Please enter the description").min(2, 'This value is too short. It should have 2 characters or more.'),
            name: yup.string().required(staticGodContent?.addGod?.formValidation?.name).min(2, 'This value is too short. It should have 2 characters or more.'),
           // worshipDay: yup.string().required(staticGodContent?.addGod?.formValidation?.worshipDay).min(4, 'This value is too short. It should have 2 characters or more.'),
            image: yup
                .mixed()
                .test('required', staticGodContent?.addGod?.formValidation?.image, (value:any) => value.length > 0)
                .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
                .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );

    const methods = useForm<God>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    /*
      handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {

        let wDays:any = [];
        data?.worshipDay?.forEach((worshipDay:any) => {
            wDays.push(worshipDay.value)
        })

        const formData = new FormData();
        for (const k in data) {
            if(k === 'image') {
                formData.append('image', image.data)
            } else if (k === 'worshipDay') { 
                console.log('worshipDay',wDays);
                formData.append('worshipDay', JSON.stringify(wDays))
            } else {
                formData.append(k, data[k]);
            }
        }
        dispatch(admingodActions.addgod(formData));
    });

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
            reset();
            navigate("/admin/gods/list");
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
                                    <b>{staticGodContent?.addGod?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form encType="multipart/form-data" name="God-form" id="God-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    name="name"
                                                    register={register}
                                                    key="name"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticGodContent?.addGod?.formLabels?.name}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>{staticGodContent?.addGod?.formLabels?.worshipDay}</label>
                                                <Controller
                                                    key="worshipDay"
                                                    name="worshipDay"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            isMulti={true}
                                                            {...field}
                                                            options={Days}
                                                            className="multiple-select-common"
                                                            onChange={(selectedOption:any) => setValue('worshipDay', selectedOption)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <FormInput
                                                    type="textarea"
                                                    name="description"
                                                    register={register}
                                                    key="description"
                                                    errors={errors}
                                                    control={control}
                                                    label="Description"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    label={staticGodContent?.addGod?.formLabels?.image}
                                                    onChange={handleUploadedFile}
                                                    register={register}
                                                    key="image"
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
                                                <Button type="submit" className="btn btn-primary submit-btn mr-1 waves-effect waves-light" disabled={loading}>
                                                    Add
                                                </Button>
                                                <a className="btn primary cancelbtn" href="/admin/gods/list" id="cancel"> Cancel</a>
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

export default AddGod;
