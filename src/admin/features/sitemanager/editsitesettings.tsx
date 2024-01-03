// import React, { useRef, useEffect, useState } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import {
//     Button,
// } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { Toast } from 'primereact/toast';
// import { useSelector } from 'react-redux';
// import { adminEventActions } from './siteManagerSlice';
// import { FormInput } from 'sharedComponents/inputs';
// import { useRedux } from 'hooks';
// import { Event } from 'models';
// import Loader from 'sharedComponents/loader/loader';
// import { clearState } from 'storeConfig/api/apiSlice';

// /* eslint-disable */
// const SiteManager = () => {
//     const { dispatch } = useRedux();
//     const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
//     const [image, setImage] = useState({ preview: '', data: '' })

//     const toast = useRef<any>(null);

//     const showToast = (severity:any, summary:any, detail:any) => {
//         toast.current.show({ severity, summary, detail });
//     };

//     /*
//        form validation schema
//     */
//     const schemaResolver = yupResolver(
//         yup.object().shape({
//             description: yup.string().required('Please enter add description').min(20, 'This value is too short. It should have 2 characters or more.'),
//         }),
//     );

//     const methods = useForm<Event>({
//         resolver: schemaResolver,
//     });

//     const {
//         handleSubmit,
//         register,
//         control,
//         reset,
//         formState: { errors },
//     } = methods;

//     /*
//         handle form submission
//     */
//     const onSubmit = handleSubmit((data: any) => {

//         const formData = new FormData();
//         for (const k in data) {
//             if(k === 'image') {
//                 formData.append('image', image.data)
//             } else {
//                 formData.append(k, data[k]);
//             }
//         }

//         dispatch(adminEventActions.addEvent(formData));
//     });

//     const handleUploadedFile = (event:any) => {
//         const img = {
//             preview: URL.createObjectURL(event.target.files[0]),
//             data: event.target.files[0],
//         }
//         setImage(img);
//     };

//     useEffect(() => {
//         if (successMessage) {
//             showToast('success', 'Success', successMessage);
//             dispatch(clearState());
//             reset();
//         }

//         if (error) {
//             showToast('error', 'Error', error);
//             dispatch(clearState());
//         }
//     }, [successMessage, error, dispatch]);

//     return (
//         <>
//             <Toast ref={toast} />
//             {loading && <Loader />}

//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h3 className="card-title">
//                                     <b>Manage website</b>
//                                 </h3>
//                             </div>

//                             <div className="card-body">

//                             <form encType="multipart/form-data" name="Event-form" id="add-add-form" onSubmit={onSubmit}>
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="form-group">
//                                                         <FormInput
//                                                             type="text"
//                                                             name="name"
//                                                             register={register}
//                                                             key="name"
//                                                             errors={errors}
//                                                             control={control}
//                                                             label="Event name"
//                                                             containerClass="mb-3"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="form-group">
//                                                         <FormInput
//                                                             type="text"
//                                                             register={register}
//                                                             key="bookingPrice"
//                                                             errors={errors}
//                                                             control={control}
//                                                             name="bookingPrice"
//                                                             label="Booking price"
//                                                             containerClass="mb-3"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="row text-center">
//                                                 <div className="col-sm-12">

//                                                     <div className="text-center d-flex mb-3 update-profile-btn">
//                                                         <Button type="submit" className='btn btn-primary submit-btn mr-5 waves-effect waves-light' disabled={loading}>
//                                                             Update
//                                                         </Button>
//                                                         <a className="btn primary cancelbtn" href="/admin/events/list" id="cancel"> Cancel</a>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SiteManager;

export {};
