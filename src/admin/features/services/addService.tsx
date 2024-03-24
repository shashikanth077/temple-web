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
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { admingodActions } from '../godmaster/godSlice';
import { selectGods } from '../godmaster/godSelector';
import { adminServiceActions } from './serviceSlice';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { AdminService } from 'models';
import Loader from 'sharedComponents/loader/loader';
import {
    numberOfDaysAhead, ServiceTypes, bookingTypes, Months, Frequency,
} from 'constants/services';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';
import { selectStaticContentServices } from 'contents/content/contactSelectors';

interface OptionTypes {
    value: string;
    label:string;
}

/* eslint-disable */
const AddService = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);
    const [frequencyVal,setFrequency] = useState('');

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const staticContent = appSelector(selectStaticContentServices);

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);
  
    const GodDetails:any = appSelector(selectGods);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const handleFrequency = (e:any) => {
        setFrequency(e.target.value)
    }

    const onChangeMultipleSelection = (selected: any) => {
        setMultiSelections(selected);
    };

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            godId: yup.string().required(staticContent?.addService?.formValidation?.godId),
            frequency:yup.string().required(staticContent?.addService?.formValidation?.frequency),
            accountNumber: yup.string().required(staticContent?.addService?.formValidation?.accountNumber).min(2, 'This value is too short. It should have 2 characters or more.'),
            serviceName: yup.string().required(staticContent?.addService?.formValidation?.serviceName).min(2, 'This value is too short. It should have 2 characters or more.'),
            price: yup.string().required(staticContent?.addService?.formValidation?.price).min(1, 'This value is too short. It should have 2 characters or more.'),
            serviceType: yup.string().required(staticContent?.addService?.formValidation?.serviceType),
            bookingType: yup.string().required(staticContent?.addService?.formValidation?.bookingType),
            description: yup.string().required(staticContent?.addService?.formValidation?.description).min(10, 'This value is too short. It should have 10 characters or more.'),
            image: yup
                .mixed()
                .test('required', staticContent?.addService?.formValidation?.image, (value:any) => value.length > 0)
                .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
                .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
        }),
    );

    const methods = useForm<AdminService>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        setValue,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((data:any) => {
        
        let months:any = [];
        multiSelections?.forEach((month:any) => {
            months.push(month.value)
        })

        const formData = new FormData();
        console.log(formData);
        for (const k in data) {
            if(k === 'image') {
                formData.append('image', image.data)
            } else if (k === 'occurmonth') { 
                formData.append('occurmonth', JSON.stringify(months))
            } else {
                formData.append(k, data[k]);
            }
        }
        dispatch(adminServiceActions.addService(formData));
        navigate("/admin/services/list");
    });

    useEffect(() => {
        const handleSuccess = async () => {
            if (successMessage) {
                showToast('success', 'Success', successMessage);
                await dispatch(clearState());
                setTimeout(() => {
                    navigate("/admin/services/list");
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
                                    <b>Add Service</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form encType="multipart/form-data" name="Service-form" id="Service-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="godId"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContent?.addService?.formLabels?.godId}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="godId"
                                                    name="godId"
                                                >
                                                    <option value="">Select</option>
                                                    {GodDetails?.map((option:any, index:any) => (
                                                        <option value={option._id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="serviceType"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContent?.addService?.formLabels?.serviceType}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="serviceType"
                                                    name="serviceType"
                                                >

                                                    <option value="">Select</option>
                                                    {ServiceTypes?.map((option:any, index:any) => (
                                                        <option value={option.label}>{option.label} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    name="serviceName"
                                                    register={register}
                                                    key="serviceName"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContent?.addService?.formLabels?.serviceName}
                                                    containerClass="mb-3"
                                                />
                                              </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="price"
                                                    errors={errors}
                                                    control={control}
                                                    name="price"
                                                    label={staticContent?.addService?.formLabels?.price}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    register={register}
                                                    key="bookingType"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContent?.addService?.formLabels?.bookingType}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="bookingType"
                                                    name="bookingType"
                                                >
                                                    <option value="">Select</option>
                                                    {bookingTypes?.map((option:any, index:any) => (
                                                        <option  value={option.id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="accountNumber"
                                                    errors={errors}
                                                    control={control}
                                                    name="accountNumber"
                                                    label={staticContent?.addService?.formLabels?.accountNumber}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormInput
                                                type="textarea"
                                                name="description"
                                                label={staticContent?.addService?.formLabels?.description}
                                                register={register}
                                                key="description"
                                                errors={errors}
                                                control={control}
                                                containerClass="mb-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    label={staticContent?.addService?.formLabels?.image}
                                                    onChange={handleFileChange}
                                                    register={register}
                                                    key="image"
                                                    errors={errors}
                                                    control={control}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                            {/* <img src={preview} width="50" height="60" alt="s" /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <FormInput
                                                    register={register}
                                                    key="daysahead"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContent?.addService?.formLabels?.daysahead}
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="daysahead"
                                                    name="daysahead"
                                                >
                                                    <option value="">Select</option>
                                                    {numberOfDaysAhead?.map((option:any, index:any) => (
                                                        <option  key={option.id}  value={option.id}>{option.name} </option>
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
                                                    key="frequency"
                                                    errors={errors}
                                                    onChange={(e) => handleFrequency(e)}
                                                    control={control}
                                                    label="Frequency"
                                                    type="select"
                                                    containerClass="mb-3"
                                                    id="frequency"
                                                    name="frequency"
                                                >
                                                    <option value="">Select</option>
                                                    {Frequency?.map((option:any, index:any) => (
                                                        <option  key={option.id}  value={option.id}>{option.name} </option>
                                                    ))}
                                                </FormInput>
                                            </div>
                                        </div>
                                        {frequencyVal === 'yearly' ? 
                                          <div className="col-md-6">
                                            <div className="form-group">
                                            <label>{staticContent?.addService?.formLabels?.occurmonth}</label>
                                                <Controller
                                                    key="occurmonth"
                                                    name="occurmonth"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Typeahead
                                                            {...field}
                                                            id="select3"
                                                            labelKey="label"
                                                            multiple
                                                            onChange={onChangeMultipleSelection}
                                                            options={Months}
                                                            placeholder="Choose months..."
                                                            selected={multiSelections}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        :''}
                                   </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="checkbox"
                                                    name="isTaxable"
                                                    label={staticContent?.addService?.formLabels?.isTaxable}
                                                    register={register}
                                                    key="isTaxable"
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
                                                <a className="btn primary cancelbtn" href="/admin/services/list" id="cancel"> Cancel</a>
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

export default AddService;
