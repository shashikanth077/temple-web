import React, { useRef, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import {
    Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { myprofileActions } from './myProfileSlice';
import { selectMyProfileDetails } from './myProfileSelectors';
import Loader from 'sharedComponents/loader/loader';
import { FormInput } from 'sharedComponents/inputs';
import { ProfileData } from 'models';
import { useRedux, useToggle, useUser } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import { CAProvinces } from 'constants/CAProvinces';
import { NakshtraRasi } from 'constants/profile';

/* eslint no-underscore-dangle: 0 */
const EditProfile = () => {
    const { appSelector, dispatch } = useRedux();
    const toast = useRef<any>(null);
    const [date, setDate] = useState(null);
    const [billingAddressShow, hideBillingToggle] = useToggle(true);
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const [loggedInUser] = useUser();

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(myprofileActions.getMyProfileDetails({ userid: loggedInUser?.id }));
    }, [dispatch]);

    const ProfileDetails:any = appSelector(selectMyProfileDetails);

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
            firstName: yup.string().required('Please enter first name'),
            lastName: yup.string().required('Please enter last name'),
            mobileNumber: yup.string().required('Please enter mobile number'),
            homeNumber: yup.string().required('Please enter home number'),
            address1: yup.string().required('Please enter the address'),
            city: yup.string().required('Please enter the city'),
            state: yup.string().required('Please enter the state'),
            zipcode: yup.string().required('Please enter zipcode'),
        }),
    );

    const methods = useForm<ProfileData>({
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
        setValue('firstName', loggedInUser?.firstName);
        setValue('lastName', loggedInUser?.lastName);
        setValue('mobileNumber', loggedInUser?.phonenumber);
        setValue('homeNumber', ProfileDetails?.homeNumber);
        setValue('email', loggedInUser?.email);
        setValue('star', ProfileDetails?.star);
        setValue('gotram', ProfileDetails?.gotram);
        setValue('nationality', ProfileDetails?.nationality);
        setValue('dateOfBirth', new Date(ProfileDetails?.dateOfBirth));
        setValue('address1', ProfileDetails?.homeAddress?.address1);
        setValue('city', ProfileDetails?.homeAddress?.city);
        setValue('zipcode', ProfileDetails?.homeAddress?.postalCode);
        setValue('state', ProfileDetails?.homeAddress?.province);
        setValue('billingaddress', ProfileDetails?.billingAddress?.address1);
        setValue('billingcity', ProfileDetails?.billingAddress?.city);
        setValue('billingzipcode', ProfileDetails?.billingAddress?.postalCode);
        setValue('billingstate', ProfileDetails?.billingAddress?.province);
    }, [setValue, ProfileDetails]);

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: ProfileData) => {
        const ProfileObj:any = {};

        console.log('formData', formData);

        ProfileObj.firstName = formData.firstName;
        ProfileObj.lastName = formData.lastName;
        ProfileObj.nationality = formData.nationality;
        ProfileObj.homeNumber = formData.homeNumber;
        ProfileObj.mobileNumber = formData.mobileNumber;
        ProfileObj.dateOfBirth = formData.dateOfBirth;
        ProfileObj.star = formData.star;
        ProfileObj.gotram = formData.gotram;
        ProfileObj.classification = 'Individual';

        ProfileObj.userid = loggedInUser?.id || '';

        if (billingAddressShow === false) {
            ProfileObj.billingAddress = {
                address1: formData.address1,
                address2: '',
                city: formData.city,
                postalCode: formData.zipcode,
                province: formData.state,
            };
        } else {
            ProfileObj.billingAddress = {
                address1: formData.billingaddress,
                address2: '',
                city: formData.billingcity,
                postalCode: formData.billingzipcode,
                province: formData.billingstate,
            };
        }
        ProfileObj.homeAddress = {
            address1: formData.address1,
            address2: '',
            city: formData.city,
            postalCode: formData.zipcode,
            province: formData.state,
        };

        dispatch(myprofileActions.updateProfile(ProfileObj));
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
                                    <b>Edit Profile</b>
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="">
                                    <form name="edit-profile-form" id="edit-profile-form" onSubmit={onSubmit}>
                                        <div className="my-profile">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="hidden"
                                                            name="_id"
                                                            defaultValue={loggedInUser?.id}
                                                            register={register}
                                                            key="_id"
                                                            control={control}
                                                        />
                                                        <FormInput
                                                            type="text"
                                                            name="firstName"
                                                            defaultValue={loggedInUser?.firstName}
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
                                                            name="lastName"
                                                            defaultValue={loggedInUser?.lastName}
                                                            label="Last name"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="lastName"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={loggedInUser?.phonenumber}
                                                            name="mobileNumber"
                                                            label="Phone number"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="mobileNumber"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={ProfileDetails?.homeNumber}
                                                            name="homeNumber"
                                                            label="Home number"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="homeNumber"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={ProfileDetails?.gotram}
                                                            name="gotram"
                                                            label="Gotram"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="gotram"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            register={register}
                                                            key="star"
                                                            defaultValue={ProfileDetails?.star}
                                                            errors={errors}
                                                            control={control}
                                                            label="Star"
                                                            type="select"
                                                            containerClass="mb-3"
                                                            id="star"
                                                            name="star"
                                                        >
                                                            <option value="">Select</option>
                                                            {NakshtraRasi?.map((option:any, index:any) => (
                                                                <option key={option.label} value={option.label}>{option.label} </option>
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
                                                            defaultValue={loggedInUser?.email}
                                                            name="email"
                                                            disabled
                                                            label="Email address"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={ProfileDetails?.nationality}
                                                            name="nationality"
                                                            label="Nationalality"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="nationality"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <Controller
                                                            name="dateOfBirth"
                                                            key="dateOfBirth"
                                                            defaultValue={new Date(ProfileDetails?.dateOfBirth)} // Convert string to Date object
                                                            control={control}
                                                            rules={{ required: 'Date is required.' }}
                                                            render={({ field }) => (
                                                                <>
                                                                    <label htmlFor={field.name}>Date of birth</label>
                                                                    <Calendar
                                                                        value={field.value} // Set the value from the form state
                                                                        onChange={e => field.onChange(e.value)} // Update the form state when the value changes
                                                                        showIcon
                                                                        className="events-top-bar-datepicker-button mb-3"
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <br />
                                            <h4>Home Address</h4>
                                            <div className="row">

                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={ProfileDetails?.homeAddress?.address1}
                                                            name="address1"
                                                            label="Address 1"
                                                            containerClass="mb-3"
                                                            register={register}
                                                            key="address1"
                                                            errors={errors}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <FormInput
                                                            register={register}
                                                            key="state"
                                                            defaultValue={ProfileDetails?.homeAddress?.province}
                                                            errors={errors}
                                                            control={control}
                                                            label="State"
                                                            type="select"
                                                            className=""
                                                            id="state"
                                                            name="state"
                                                        >
                                                            <option value="">Select</option>
                                                            {CAProvinces?.map((option:any, index:any) => (
                                                                <option value={option.name}>{option.name} </option>
                                                            ))}
                                                        </FormInput>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            defaultValue={ProfileDetails?.homeAddress?.city}
                                                            register={register}
                                                            key="city"
                                                            errors={errors}
                                                            control={control}
                                                            name="city"
                                                            label="City"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <FormInput
                                                            type="text"
                                                            register={register}
                                                            key="zipcode"
                                                            defaultValue={ProfileDetails?.homeAddress?.postalCode}
                                                            errors={errors}
                                                            control={control}
                                                            name="zipcode"
                                                            label="zipcode"
                                                            containerClass="mb-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <div className="d-inline">
                                                            <FormInput
                                                                onClick={hideBillingToggle}
                                                                type="checkbox"
                                                                key="samebillingaddress"
                                                                errors={errors}
                                                                control={control}
                                                                register={register}
                                                                name="samebillingaddress"
                                                                label="Same as Home Address"
                                                                containerClass="mb-3"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {billingAddressShow === true ? (
                                                <>
                                                    <h4>Billing Address</h4>
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <FormInput
                                                                    type="text"
                                                                    defaultValue={ProfileDetails?.billingAddress?.address1}
                                                                    name="billingaddress"
                                                                    key="billingaddress"
                                                                    label="Address"
                                                                    errors={errors}
                                                                    control={control}
                                                                    register={register}
                                                                    containerClass="mb-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <FormInput
                                                                    label="State"
                                                                    errors={errors}
                                                                    control={control}
                                                                    register={register}
                                                                    defaultValue={ProfileDetails?.billingAddress?.province}
                                                                    type="select"
                                                                    key="billingstate"
                                                                    className="billingstate"
                                                                    id="billingstate"
                                                                    name="billingstate"
                                                                >
                                                                    <option value="">Select</option>
                                                                    {CAProvinces?.map((option:any, index:any) => (
                                                                        <option value={option.name}>{option.name} </option>
                                                                    ))}
                                                                </FormInput>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <FormInput
                                                                    errors={errors}
                                                                    control={control}
                                                                    register={register}
                                                                    type="text"
                                                                    key="billingcity"
                                                                    defaultValue={ProfileDetails?.billingAddress?.city}
                                                                    name="billingcity"
                                                                    label="City"
                                                                    containerClass="mb-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <FormInput
                                                                    errors={errors}
                                                                    control={control}
                                                                    register={register}
                                                                    type="text"
                                                                    defaultValue={ProfileDetails?.billingAddress?.postalCode}
                                                                    name="billingzipcode"
                                                                    key="billingzipcode"
                                                                    label="Zip code"
                                                                    containerClass="mb-3"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}
                                            <div className="row text-center">
                                                <div className="col-sm-12">
                                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                                        <Button type="submit" className="btn btn-primary submit-btn mr-1 waves-effect waves-light" disabled={loading}>
                                                            Update
                                                        </Button>
                                                        <a className="btn primary cancelbtn" href="/myprofile/profileview" id="cancel"> Cancel</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditProfile;
