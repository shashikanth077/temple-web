import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { adminSiteManagerActions } from './siteManagerSlice';
import { clearState } from 'storeConfig/api/apiSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { SiteSetting } from 'models';
import Loader from 'sharedComponents/loader/loader';
import DownloadJsonButton from 'sharedComponents/JsonDownloadBtn';
import { selectStaticSiteManage } from 'features/content/contactSelectors';

/* eslint-disable */
const ManageSite = () => {
    const { dispatch,appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const [image, setImage] = useState({ preview: '', data: '' })

    const toast = useRef<any>(null);

    const staticContent = appSelector(selectStaticSiteManage);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    /*
       form validation schema
    */
       const schemaResolver = yupResolver(
        yup.object().shape({
          staticFile: yup
            .mixed()
            .test('required', 'Json file is required', (value: any) => value && value.length > 0)
            .test('fileName', staticContent?.addStaticJson?.formValidation?.staticFile, (value: any) => {
              if (!value || !value[0]) {
                return false;
              }
              const fileName = value[0].name;
              return fileName === 'content.json';
            })
            .test('fileType', 'Unsupported File Format', (value: any) => {
              if (!value || !value[0]) {
                return false;
              }
      
              const fileType = value[0].type;
      
              if (!['application/json'].includes(fileType)) {
                return false;
              }
      
              // If the file type is JSON, additional check for valid JSON content
              try {
                const reader = new FileReader();
                reader.readAsText(value[0]);
                JSON.parse(reader.result as string);
                return true;
              } catch (errorMessage) {
                return false;
              }
            }),
        })
      );

    const methods = useForm<SiteSetting>({
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
    const onSubmit = handleSubmit((data: any) => {
        const formData = new FormData();
        for (const k in data) {
            if (k === 'staticFile') {
                formData.append('staticFile', image.data);
            } else {
                formData.append(k, data[k]);
            }
        }
        dispatch(adminSiteManagerActions.uploadStaticData(formData));
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
                                    <b>{staticContent?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="Manage-Site-form" id="Manage-Site-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                type="file"
                                                name="staticFile"
                                                label={staticContent?.addStaticJson?.formLabels?.staticFile}
                                                onChange={handleUploadedFile}
                                                register={register}
                                                key="staticFile"
                                                errors={errors}
                                                control={control}
                                                containerClass="mb-3"
                                            />
                                            <p className='mb-3'> <b>Current File</b>: {staticContent?.downloadTitle}</p>
                                            <DownloadJsonButton classes="btn static-download-btn mb-2" jsonUrl="http://localhost:8080/uploads/staticfile/content.json" fileName="content.json" />
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-sm-12">

                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className="btn btn-primary submit-btn mr-1 waves-effect waves-light" disabled={loading}>
                                                    Update
                                                </Button>
                                                <a className="btn primary cancelbtn" href="/dashboard" id="cancel"> Cancel</a>
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

export default ManageSite;
