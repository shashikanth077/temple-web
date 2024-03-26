import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Collapse } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { selectSavedLocalDonatData } from './mydonations/donationsSelectors';
import { useRedux } from 'hooks';
import { formatCurrency } from 'helpers/currency';
import { myprofileActions } from 'admin/features/myprofile/myProfileSlice';
import { selectMyProfileDetails } from 'admin/features/myprofile/myProfileSelectors';
import { capitalizeFirstLetter } from 'utils/valueUtil';
import ButtonV1 from 'sharedComponents/button/buttonv1';

/* eslint-disable */
const DonationConfirm = () => {
    const { dispatch, appSelector } = useRedux();
    const [open, setOpen] = useState(true);
    const intl = useIntl();
    const BookDetails = appSelector(selectSavedLocalDonatData);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            myprofileActions.getMyProfileDetails({
                userid: BookDetails?.userid,
            }),
        );
    }, [dispatch]);

    const ProfileDetails: any = appSelector(selectMyProfileDetails);

    const handlePayment = async () => {
        navigate('/donation-payment/' + BookDetails?.donateTypeId + '/' + BookDetails?.userid);
    }

    const handleEdit = () => {
        navigate('/donation-confirm/' + BookDetails?.donateTypeId);
    }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header profile-header">
                                <h2 className="card-title">
                                    <b>Devotee details</b>
                                </h2>
                                <div className="card-tools">
                                    <Button
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        <i className="fas fa-minus" />
                                    </Button>
                                    <a
                                        aria-label="submitbutton"
                                        className="btn btn-primary submitbutton"
                                        href="/myprofile/edit-profile"
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                <Collapse in={open}>
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            <p>{ProfileDetails?.firstName}</p>
                                            <p>{ProfileDetails?.email}</p>
                                            <p>{ProfileDetails?.mobileNumber}</p>
                                            <p>{ProfileDetails?.homeNumber}</p>
                                            <p>{ProfileDetails?.nationality}</p>
                                        </div>

                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">
                                                Home Address
                                            </h5>
                                            <p>
                                                {
                                                    ProfileDetails.homeAddress
                                                        ?.address1
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails.homeAddress
                                                        ?.city
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails.homeAddress
                                                        ?.postalCode
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails.homeAddress
                                                        ?.province
                                                }
                                            </p>
                                        </div>

                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">
                                                Billing Address
                                            </h5>
                                            <p>
                                                {
                                                    ProfileDetails
                                                        .billingAddress
                                                        ?.address1
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails
                                                        .billingAddress?.city
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails
                                                        .billingAddress
                                                        ?.postalCode
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ProfileDetails
                                                        .billingAddress
                                                        ?.province
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 sd-dashboard">
                        <div className="sd-confirm-details">
                            <h2 className="sd-side-heading fw400">
                                <span className="fw400">
                                    <span className="fw700">Confirm</span>{" "}
                                    Details
                                </span>
                            </h2>
                            <div className="clearfix  sd-booking-details">
                                <h4>Donation details</h4>
                                <table className="table table-bordered sd-toggle-table">
                                    <thead>
                                        <tr>
                                            <th>Donation type</th>
                                            <th>Frequency</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{BookDetails?.type}</td>
                                            <td>{capitalizeFirstLetter(BookDetails?.frequency)}</td>
                                            <td>
                                                {formatCurrency(
                                                    intl,
                                                    BookDetails?.amount,
                                                )}{" "}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="clearfix mt-50 sd-form">
                                <ButtonV1
                                    onClick={handlePayment}
                                    btnType="submit"
                                    label='Proceed to Payment'
                                    btnClassName='btn btn-primary book-btn submit-btn mr-1 waves-effect waves-light'
                                    imgClassName='sd-arrow-btn ml-5'
                                    imageSrc='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAANCAYAAACUwi84AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYmEyYzU5MS01NjE1LTE5NDUtYjc1My1jYjAxMmYxZmY3ZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxNDVGRTA4QkM2MTFFQjk2QTU4N0VCNUUxNjUxMTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDIxNDVGREY4QkM2MTFFQjk2QTU4N0VCNUUxNjUxMTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjVhOWRhNTQtYzc4NC02YzRiLTlhY2UtNzZlN2Y4YTJhZDc1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZjQxYTk0ZmItNzcyNy0xMWViLWFmMzQtOWU5ZDkxNjgyNGEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EnAd9gAAAJFJREFUeNpi/P///yYGCPBjwAKYgPgjEPsC8SZsChiAJoDwhP8QcACIOaBiYMyAxGmGKjoLxALYFIBwGVTRDSAWw6YAhKOhil4BsQo2BaxAfAWqKAVdkhPqUBBoQbeCH4jPQCWr0R0JctBNqGQBujflgPgJVDIJ3U0g4jBUMhyLgxkYQbqAAfoeiNdjC2mAAAMAjQIRRut5EqsAAAAASUVORK5CYII='
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationConfirm;
