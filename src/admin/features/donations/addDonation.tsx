import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { adminDonationTypeActions } from './donationSlice';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { DonationTypes } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { Denominations, Frequency } from 'constants/donation';
import { selectStaticDonation } from 'contents/content/contactSelectors';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
const AddDonation = () => {
    const { dispatch,appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const [image, setImage] = useState({ preview: '', data: '' })

    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const StaticDonationContent:any = appSelector(selectStaticDonation);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            donationType: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.type),
            description: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.description).min(2, 'This value is too short. It should have 2 characters or more.'),
            //denominations: yup.string().required(addDonation?.formValidation?.denominations).min(2, 'This value is too short. It should have 2 characters or more.'),
            frequency: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.frequency).min(1, 'This value is too short. It should have 2 characters or more.'),
            image: yup
                .mixed()
                .test('required', StaticDonationContent?.addDonation?.formValidation?.image, (value:any) => value.length > 0)
                .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
                .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );

    const methods = useForm<DonationTypes>({
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
    const onSubmit = handleSubmit((data:any) => {
        let denomins:any = [];
        data?.denominations?.forEach((mult:any) => {
            denomins.push(mult.value)
        })

        const formData = new FormData();
        for (const k in data) {
            if(k === 'image') {
                formData.append('image', image.data)
            } else if (k === 'denominations') { 
                console.log('denominations',denomins);
                formData.append('denominations', JSON.stringify(denomins))
            } else {
                formData.append(k, data[k]);
            }
        }
        dispatch(adminDonationTypeActions.addDonation(formData));
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

    const handleFileChange = (event:any) => {
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
                                    <b>{StaticDonationContent?.addDonation?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form encType="multipart/form-data" name="Donation-type-form" id="Donation-type-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="donationType"
                                                    errors={errors}
                                                    control={control}
                                                    name="donationType"
                                                    label={StaticDonationContent?.addDonation?.formLabels?.type}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="frequency"
                                                    errors={errors}
                                                    control={control}
                                                    label={StaticDonationContent?.addDonation?.formLabels?.frequency}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="frequency"
                                                    name="frequency"
                                                >

                                                    <option value="">Select</option>
                                                    {Frequency?.map((option:any, index:any) => (
                                                        <option value={option.id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
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
                                                    label={StaticDonationContent?.addDonation?.formLabels?.description}
                                                    containerClass="mb-3"
                                                />
                                              </div>
                                        </div>
                                    </div>
                                 
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Denominations</label>
                                                <Controller
                                                    key="denominations"
                                                    name="denominations"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            isMulti={true}
                                                            {...field}
                                                            options={Denominations}
                                                            className="multiple-select-common"
                                                            onChange={(selectedOption:any) => setValue('denominations', selectedOption)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    label={StaticDonationContent?.addDonation?.formLabels?.image}
                                                    onChange={handleFileChange}
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
                                                <a className="btn primary cancelbtn" href="/admin/donationtypes/list" id="cancel"> Cancel</a>
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

export default AddDonation;
