import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { clearState } from '../../../storeConfig/apiStatus/apiSlice';
import { adminUserActions } from './userSlice';
import { FormInput } from 'sharedComponents/inputs';
import { useRedux } from 'hooks';
import { User } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { selectStaticUsers } from 'contents/content/contactSelectors';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */

interface OptionTypes {
    value: string;
    label: string;
}

const UserRoles: Array<OptionTypes> = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' },
];

const Edituser = () => {
    const { dispatch,appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector(getApiState);
    const { id } = useParams<any>();
    const [multiSelections, setMultiSelections] = useState<OptionTypes[]>([]);
    const staticContentUsers = appSelector(selectStaticUsers);

    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const onChangeMultipleSelection = (selected: any) => {
        setMultiSelections(selected);
    };

    const user = useSelector((state:any) => state.adminuser.user);

    useEffect(() => {
        const uRoles:any = [];
        user?.viewRoles?.forEach((day:any) => {
            uRoles.push({ label: day });
        });
        setMultiSelections(uRoles);
    }, [user]);

    useEffect(() => {
        dispatch(adminUserActions.getUserById({ _id: id }));
    }, [dispatch, id]);

    /*
       form validation schema
    */
       const schemaResolver = yupResolver(
        yup.object().shape({
            firstName: yup.string().required(staticContentUsers?.addUser?.formValidation?.firstName).min(2, 'This value is too short. It should have 2 characters or more.'),
            lastName: yup.string().required(staticContentUsers?.addUser?.formValidation?.lastName),
            phonenumber: yup.string().required(staticContentUsers?.addUser?.formValidation?.phonenumber).min(2, 'This value is too short. It should have 2 characters or more.'),
            email: yup.string().required(staticContentUsers?.addUser?.formValidation?.email).email(staticContentUsers?.addUser?.formValidation?.isValidEmail),
        }),
    );

    const methods = useForm<User>({
        resolver: schemaResolver,
    });

    const {
        handleSubmit,
        register,
        setValue,
        control,
        reset,
        formState: { errors },
    } = methods;

    /*
        handle form submission
    */
    const onSubmit = handleSubmit((formData: any) => {

      
        formData._id = id;

        let Roles:any = [];
        multiSelections?.forEach((role:any) => {
            Roles.push(role.label)
        })

        let Obj:any = {};
        Obj.roles = Roles;
        Obj._id = id;
        
        dispatch(adminUserActions.updateUser(Obj));
    });

    useEffect(() => {
        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
        setValue('phonenumber', user.phonenumber);
        setValue('email', user.email);
     },[user,setValue])

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
                                    <b>Edit user</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <form name="user-form" id="user-form" onSubmit={onSubmit}>
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
                                                    defaultValue={user?.firstName}
                                                    register={register}
                                                    key="firstName"
                                                    disabled
                                                    errors={errors}
                                                    control={control}
                                                    label={staticContentUsers?.addUser?.formValidation?.firstName}
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
                                                    disabled
                                                    defaultValue={user?.lastName}
                                                    errors={errors}
                                                    control={control}
                                                    name="lastName"
                                                    label="Last name"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                type="text"
                                                name="phonenumber"
                                                disabled
                                                defaultValue={user?.phonenumber}
                                                label="Phone number"
                                                register={register}
                                                key="phonenumber"
                                                errors={errors}
                                                control={control}
                                                containerClass="mb-3"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <FormInput
                                                    type="email"
                                                    name="email"
                                                    register={register}
                                                    key="email"
                                                    disabled
                                                    defaultValue={user?.email}
                                                    errors={errors}
                                                    control={control}
                                                    label="Email address"
                                                    containerClass="mb-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row text-center">
                                        <div className="col-sm-12">

                                            <div className="text-center d-flex mb-3 update-profile-btn">
                                                <Button type="submit" className="btn btn-primary submit-btn mr-1 waves-effect waves-light" disabled={loading}>
                                                    Update
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

export default Edituser;
