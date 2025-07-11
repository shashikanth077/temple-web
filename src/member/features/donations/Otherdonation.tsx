import React, { useState, useEffect, useRef } from 'react';
import {
    Dropdown,
    Button,
    Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { mydonationsActions } from './mydonations/donationSlice';
import { useRedux, useUser } from 'hooks';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';
import { selectDonationTypes } from 'admin/features/donations/donationSelector';
import { DonationForm } from 'models';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import Loader from 'sharedComponents/loader/loader';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
const UserDonationsTypes = () => {

    const { dispatch, appSelector } = useRedux();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectionId, setSelectionId] = useState<string | null>(null);

    const { loading, error, successMessage } = useSelector(getApiState);

    const [loggedInUser] = useUser();
    const navigate = useNavigate();
    const intl = useIntl();
    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);

    /*
        form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            amount: yup.string().required('Please enter an amount'),
            prasadamOverEmail: yup.string().required('Please select the option for prasadam'),
        }),
    );

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const donationTypes = appSelector(selectDonationTypes);

    const handleSelect = (eventKey: any) => {
        if (eventKey) {
            const selectedDonationType = donationTypes?.find((donationType: any) => donationType._id === eventKey);
            if (selectedDonationType && selectedDonationType.donationType.toLowerCase() === 'grocery danam') {
                navigate('/donation/grocery/list');
            }
            setSelectedOption(selectedDonationType?.donationType || null);
            setSelectionId(eventKey);
        }
    };

    let selecteddonationDetails = donationTypes?.filter((donationData: any) => donationData._id === selectionId);

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors }, setError
    } = useForm<DonationForm>({
        resolver: schemaResolver,
    });

    const onSubmit: SubmitHandler<DonationForm> = (data) => {
        if (!data.amount) {
            setError('amount', {
                type: 'manual',
                message: 'Please enter a donation amount.',
            });
            return;
        }
        if (!data.prasadamOverEmail) {
            setError('prasadamOverEmail', {
                type: 'manual',
                message: 'Please select Prasadam over mail option.',
            });
            return;
        }
        data.type = selecteddonationDetails[0]?.donationType;
        data.donateTypeId = selecteddonationDetails[0]?._id;
        data.userid = loggedInUser?.id;
        data.amount = donationAmount;
        data.prasadamOverEmail = data.prasadamOverEmail;
        data.frequency = selecteddonationDetails[0].frequency;
        dispatch(mydonationsActions.saveDonationLocalData(data));
        navigate('/confirm-donation-details');
    };

    const onError: SubmitErrorHandler<DonationForm> = (error) => {
        const errorMessage =
        donationAmount <= 50 ? 'Donation amount must be greater than 50.' : 'Please fix the errors in the form.';
        showToast('error', 'Error', errorMessage);
    };

    const [donationAmount, setDonationAmount] = React.useState<any>();

    const handleDonationLevelClick = (amount: string) => {
        if (amount === 'custom') {
            setDonationAmount(''); // Clear
        }
        setDonationAmount(amount);
    };

    useEffect(() => {
        // Set the default value for the amount field
        setValue('amount', donationAmount);
    }, [donationAmount, setValue]);

    useEffect(() => {
        if (successMessage && !localStorage.getItem('targetUrl')) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
            reset();
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch, reset]);

    return (
        <>
            <Toast ref={toast} />
            {loading && <Loader />}

            <div className="container-fluid report-filter mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <b>Donation types:</b>
                                </h3>
                            </div>

                            <div className="card-body">

                                <div className="row mb-4">
                                    <div className="col-md-12 donation-types-dropdown">
                                        <Dropdown onSelect={handleSelect}>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {selectedOption || 'Select an option'}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{ minWidth: '200px' }}>
                                                {donationTypes?.map((donationType: any) => (
                                                    <Dropdown.Item key={donationType?._id} eventKey={donationType?._id}>
                                                        {donationType?.donationType}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>

                                {selecteddonationDetails?.map((donationDetail: any) => (
                                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                                        <div className="your-order-area">
                                            <div className="your-order-wrap gray-bg-4 mb-4">
                                                <div className="your-order-product-info">
                                                    <div className="your-order-bottom mb-4 donat-details-list">
                                                        <ul className='donation-details-section'>
                                                            <li className="your-order-shipping">
                                                                Donation type
                                                            </li>
                                                            <li className="booking-info">
                                                                {donationDetail?.donationType}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="your-order-bottom mb-4">
                                                        <ul>
                                                            <li className="your-order-shipping">
                                                                Frequency
                                                            </li>
                                                            <li className="booking-info">
                                                                {capitalizeFirstLetter(donationDetail?.frequency || "")}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="give-total-wrap">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="give-donation-amount form-row-wide">
                                                        <span className="give-currency-symbol give-currency-position-before">
                                                            $
                                                        </span>
                                                        <label
                                                            className="give-hidden"
                                                            htmlFor="give-amount"
                                                        >
                                                            Donation Amount:
                                                        </label>
                                                        <input
                                                            className="give-text-input give-amount-top filled fill_inited"
                                                            id="amount"
                                                            {...register('amount')}
                                                            name="amount"
                                                            key="amount"
                                                            type="text"
                                                            placeholder=""
                                                            value={donationAmount}
                                                            onChange={(e) => {
                                                                const onlyNumbers = e.target.value.replace(
                                                                    /[^0-9]/g,
                                                                    '',
                                                                );
                                                                setDonationAmount(onlyNumbers);
                                                            }}
                                                            pattern="[0-9]*"
                                                            readOnly={
                                                                donationAmount !== 'custom' ? undefined : false
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <ul className="give-donation-levels-wrap give-list-inline">
                                                        {donationDetail?.denominations?.map(
                                                            (denom: string) => (
                                                                <li key={denom}>
                                                                    <button
                                                                        type="button"
                                                                        data-price-id="0"
                                                                        className={`give-donation-level-btn give-btn give-btn-level-0 ${donationAmount === denom
                                                                                ? 'give-default-level'
                                                                                : ''
                                                                            }`}
                                                                        value={denom}
                                                                        data-default="1"
                                                                        onClick={() => handleDonationLevelClick(denom)}
                                                                    >
                                                                        ${denom}
                                                                    </button>
                                                                </li>
                                                            ),
                                                        )}
                                                        <li>
                                                            <button
                                                                type="button"
                                                                data-price-id="custom"
                                                                className={`give-donation-level-btn give-btn give-btn-level-custom ${donationAmount === 'custom'
                                                                        ? 'give-default-level'
                                                                        : ''
                                                                    }`}
                                                                value="custom"
                                                                onClick={() => handleDonationLevelClick('custom')}
                                                            >
                                                                Custom Amount
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <p>{errors.amount?.message}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 prasadamOverEmail">
                                                <div className="form-wrap" id="prasadamoveremail">

                                                    <Form.Group className="d-flex">
                                                        <Form.Label className="mr-2" style={{ fontSize: '18px' }}>
                                                            Prasadam over mail:
                                                        </Form.Label>
                                                        <Form.Check
                                                            type="radio"
                                                            {...register('prasadamOverEmail')}
                                                            id="prasadamOverEmailYes"
                                                            name="prasadamOverEmail"
                                                            value="yes"
                                                            label="Yes"
                                                            className="mr-2"
                                                            style={{ fontSize: '18px' }} // Adjust font size
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            {...register('prasadamOverEmail')}
                                                            id="prasadamOverEmailNo"
                                                            name="prasadamOverEmail"
                                                            value="no"
                                                            label="No"
                                                            className="mr-2"
                                                            style={{ fontSize: '18px' }} // Adjust font size
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row text-center">
                                            <div className="col-sm-12">
                                                <div className="text-center d-flex mb-3 update-donate-btn">
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-primary book-btn submit-btn mr-1 waves-effect waves-light"
                                                        disabled={loading}
                                                    >
                                                        Confirm donation
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDonationsTypes;
