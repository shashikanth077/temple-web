import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useSelector } from 'react-redux';
import { adminDonationTypeActions } from './donationSlice';
import { selectDonationType } from './donationSelector';
import { Denominations, Frequency } from 'constants/donation';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { DonationTypes } from 'models';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import Loader from 'sharedComponents/loader/loader';
import ImageComponent from 'sharedComponents/Image/image';
import { selectStaticDonation } from 'contents/content/contactSelectors';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

interface OptionTypes {
    value: string;
    label: string;
}

/* eslint-disable */
const EditDonation = () => {
    const { id } = useParams<string>();
    const { dispatch, appSelector } = useRedux();
    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);
    const { loading, error, successMessage } = useSelector(getApiState);
    const [image, setImage] = useState({ preview: '', data: '' })

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const onChangeMultipleSelection = (selected: any) => {
        setMultiSelections(selected);
    };

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationById({ _id: id }))
    }, []);

    let donation: any = appSelector(selectDonationType);
    const StaticDonationContent:any = appSelector(selectStaticDonation);
    
    useEffect(() => {
        const handleSuccess = async () => {
            if (successMessage) {
                showToast('success', 'Success', successMessage);
                await dispatch(clearState());
                setTimeout(() => {
                    navigate("/admin/DonationTypes/list");
                }, 1000); //1 sec
            }
        };
    
        const handleError = () => {
            if (error) {
                showToast('error', 'Error', error);
                dispatch(clearState());
            }
        };
    
        handleSuccess();
        handleError();
    }, [successMessage, error, dispatch, navigate]);

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            donationType: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.type),
            description: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.description).min(2, 'This value is too short. It should have 2 characters or more.'),
            //denominations: yup.string().required(addDonation?.formValidation?.denominations).min(2, 'This value is too short. It should have 2 characters or more.'),
            frequency: yup.string().required(StaticDonationContent?.addDonation?.formValidation?.frequency).min(1, 'This value is too short. It should have 2 characters or more.'),
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
        formState: { errors },
    } = methods;

    useEffect(() => {
        let wDays: any = [];
        donation.denominations?.forEach((day: any) => {
            wDays.push({ label: day, value: day })
        })
        setMultiSelections(wDays);

        setValue('frequency',donation.frequency)
    }, [donation])


    const handleUploadedFile = (event: any) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        }
        setImage(img)
    };

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data: any) => {

        let WDays: any = [];
        multiSelections.forEach(function (day) {
            WDays.push(day.value);
        });

        const formData: any = new FormData();
        for (const k in data) {
            if (k === 'image') {
                formData.append('image', image.data)
            } else if (k === 'denominations') {
                formData.append('denominations', JSON.stringify(WDays))
            } else {
                formData.append(k, data[k]);
            }
        }
        formData.append('_id', id)
        dispatch(adminDonationTypeActions.updateDonation(formData));
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
                                    <b>{StaticDonationContent?.editDonation?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="edit-donation-type-form" id="edit-donation-type-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="hidden"
                                                    defaultValue={donation._id}
                                                    name="_id"
                                                    register={register}
                                                    key="_id"
                                                    control={control}
                                                />
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="donationType"
                                                    errors={errors}
                                                    defaultValue={donation?.donationType}
                                                    control={control}
                                                    name="donationType"
                                                    label={StaticDonationContent?.addDonation?.formLabels?.type}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Select denominations</label>
                                                <Controller
                                                    key="denominations"
                                                    name="denominations"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Typeahead
                                                            {...field}
                                                            id="select3"
                                                            labelKey="label"
                                                            multiple
                                                            onChange={onChangeMultipleSelection}
                                                            options={Denominations}
                                                            placeholder="Choose a day..."
                                                            selected={multiSelections}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    name="image"
                                                    label={StaticDonationContent?.addDonation?.formLabels?.image}
                                                    onChange={handleUploadedFile}
                                                    register={register}
                                                    key="image"
                                                    errors={errors}
                                                    control={control}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                            <ImageComponent classname="img-thumbnail" imageUrl={donation?.image} width="50" height="50" altText={donation.donationType} />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="frequency"
                                                    defaultValue={donation.frequency}
                                                    errors={errors}
                                                    control={control}
                                                    label={StaticDonationContent?.addDonation?.formLabels?.frequency}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="frequency"
                                                    name="frequency"
                                                >

                                                    <option value="">Select</option>
                                                    {Frequency?.map((option: any, index: any) => (
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
                                                    defaultValue={donation.description}
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
                                    
                                    <div className="row text-center">
                                        <div className="col-sm-12">

                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className='btn btn-primary submit-btn mr-1 waves-effect waves-light' disabled={loading}>
                                                    Update
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

export default EditDonation;
