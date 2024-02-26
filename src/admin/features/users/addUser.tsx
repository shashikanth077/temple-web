import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useSelector } from 'react-redux';
import { clearState } from '../../../storeConfig/api/apiSlice';
import { adminUserActions } from './userSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { User } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { countryCodes } from 'constants/CAProvinces';
import { selectStaticRegistration, selectStaticUsers } from 'features/content/contactSelectors';

/* eslint-disable */

interface OptionTypes {
    value: string;
    label: string;
}

const UserRoles: Array<OptionTypes> = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' },
];

const AddProduct = () => {
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state: any) => state.apiState);
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);

    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const staticContentUsers = appSelector(selectStaticUsers);
    const RegisterContent = appSelector(selectStaticRegistration);

    const onChangeMultipleSelection = (selected: any) => {
        setMultiSelections(selected);
    };

    /*
       form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string()
                .required(RegisterContent.formValidation?.firstName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            countrycode: yup.string().required(RegisterContent.formValidation?.countrycode),
            lastName: yup.string()
                .required(RegisterContent.formValidation?.lastName)
                .matches(/^[^\d]*$/, RegisterContent.formValidation?.noDigits),
            email: yup.string()
                .required(RegisterContent.formValidation?.email)
                .email(RegisterContent.formValidation?.emailValid),
            phonenumber: yup.string()
                .required(RegisterContent.formValidation?.phonenumber)
                .test('is-ten-digits', RegisterContent.formValidation?.inPhoneValid, value => {
                    const cleanedNumber = value.replace(/\D/g, ''); // Remove non-digit characters
                    return cleanedNumber.length === 10;
                })
        }),
    );

    const methods = useForm<User>({
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
    const onSubmit = handleSubmit((formData: User) => {
        const Roles: any = [];
        multiSelections?.forEach((role: any) => {
            Roles.push(role.label);
        });

        const Obj: any = {};
        Obj.roles = Roles;
        Obj.firstName = formData.firstName;
        Obj.lastName = formData.lastName;
        Obj.phonenumber = formData.phonenumber;
        Obj.countrycode = formData.countrycode;
        Obj.email = formData.email;
        Obj.type = "admin"

        dispatch(adminUserActions.addUser(Obj));
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
                                    <b>{staticContentUsers?.addUser?.heading}</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="Product-form" id="Product-form" onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>{staticContentUsers?.addUser?.formValidation?.role}</label>
                                                <Controller
                                                    key="roles"
                                                    name="roles"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Typeahead
                                                            {...field}
                                                            id="select3"
                                                            labelKey="label"
                                                            multiple
                                                            className="mb-3"
                                                            onChange={onChangeMultipleSelection}
                                                            options={UserRoles}
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
                                                    type="text"
                                                    name="firstName"
                                                    register={register}
                                                    key="firstName"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContentUsers?.addUser?.formLabels?.firstName}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="text"
                                                    register={register}
                                                    key="lastName"
                                                    errors={errors}
                                                    control={control}
                                                    name="lastName"
                                                    label={staticContentUsers?.addUser?.formLabels?.lastName}
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="code-phonenumber">
                                            <FormInput
                                                register={register}
                                                key="countrycode"
                                                errors={errors}
                                                control={control}
                                                type="select"
                                                containerClass="mb-3 country-code"
                                                id="countrycode"
                                                name="countrycode"
                                            >
                                                {countryCodes?.map((option: any) => (
                                                    <option key={option?.label} value={option.label}>{option.label} </option>
                                                ))}
                                            </FormInput>
                                            <FormInput
                                                register={register}
                                                key="phonenumber"
                                                errors={errors}
                                                control={control}
                                                type="phonenumber"
                                                name="phonenumber"
                                                placeholder={RegisterContent.formPlaceHolder?.phonenumber}
                                                containerClass="mb-3 phone-number"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="email"
                                                    name="email"
                                                    register={register}
                                                    key="email"
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContentUsers?.addUser?.formLabels?.email}
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
                                                <a className="btn primary cancelbtn" href="/admin/users/list" id="cancel"> Cancel</a>
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

export default AddProduct;
