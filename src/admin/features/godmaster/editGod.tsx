import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useSelector } from 'react-redux';
import { admingodActions } from './godSlice';
import { selectGod } from './godSelector';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { God } from 'models';
import { clearState } from 'storeConfig/api/apiSlice';
import Loader from 'sharedComponents/loader/loader';

interface OptionTypes {
    value: string;
    label: string;
  }

const Days: Array<OptionTypes> = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
];

/* eslint-disable */
const EditGod = () => {
    const {id} = useParams<string>();
    const { dispatch,appSelector } = useRedux();
    const toast = useRef<any>(null);
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
        
    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const onChangeMultipleSelection = (selected: any) => {
        setMultiSelections(selected);
    };

    useEffect(() => {
        dispatch(admingodActions.getGodById({_id:id}))
    },[]);

    let god:any = appSelector(selectGod);

    useEffect(() => {
        let wDays:any = [];
        god?.worshipDay?.forEach((day:any) => {
            wDays.push({label:day})
        })
        setMultiSelections(wDays);
    },[god])
  
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
            name: yup.string().required('Please enter god name').min(2, 'This value is too short. It should have 2 characters or more.'),
            //worshipDay: yup.string().required('Please enter day of workship').min(4, 'This value is too short. It should have 2 characters or more.'),
            // image: yup
            //     .mixed()
            //     .test('required', 'photo is required', (value:any) => value.length > 0)
            //     .test('fileSize', 'File Size is too large', (value:any) => value.length && value[0].size <= 5242880)
            //     .test('fileType', 'Unsupported File Format', (value:any) => value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)),
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
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: God) => {
        console.log("formdata",formData);
        formData._id = id ? id : '';
        let wDays:any = [];
        formData?.worshipDay?.forEach((worshipDay:any) => {
            wDays.push(worshipDay.value)
        })
        formData.worshipDay = wDays;
        dispatch(admingodActions.updategod(formData));
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
                                    <b>Edit God</b>
                                </h3>
                            </div>

                            <div className="card-body">
                            
                            <form name="Product-form" id="edit-Product-form" onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput 
                                                            type="hidden"
                                                            defaultValue={god._id}
                                                            name="_id"
                                                            register={register}
                                                            key="_id"
                                                            control={control}
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={god.name}
                                                            name="name"
                                                            register={register}
                                                            key="name"
                                                            errors={errors}
                                                            control={control}
                                                            label="God name"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Select day of workship</label>
                                                        <Controller
                                                            key="worshipDay"
                                                            name="worshipDay"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Typeahead
                                                                    {...field}
                                                                    id="select3"
                                                                    labelKey="label"
                                                                    multiple
                                                                    onChange={onChangeMultipleSelection}
                                                                    options={Days}
                                                                    placeholder="Choose a day..."
                                                                    selected={multiSelections}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>                                    

                                            {/* <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="file"
                                                            name="image"
                                                            defaultValue={god.image[0]}
                                                            label="image"
                                                            register={register}
                                                            key="image"
                                                            errors={errors}
                                                            control={control}
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="row text-center">
                                                <div className="col-sm-12">

                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className='btn btn-primary submit-btn mr-5 waves-effect waves-light' disabled={loading}>
                                                            Update
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

export default EditGod;
