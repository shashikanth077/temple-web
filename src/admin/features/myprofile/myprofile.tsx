import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import ManageDeseaedAns from './deceased/Deceased';
import ManageFamily from './family/Family';
import { myprofileActions } from './myProfileSlice';
import { selectMyProfileDetails } from './myProfileSelectors';
import { useRedux } from 'hooks';

function Myprofile() {
    const [open, setOpen] = useState(true);
    const { dispatch, appSelector } = useRedux();

    const userInfo:any = sessionStorage.getItem('admintemple_user');
    const userArr = JSON.parse(userInfo);

    useEffect(() => {
        dispatch(myprofileActions.getMyProfileDetails({ userid: userArr.id }));
    }, [dispatch]);

    const ProfileDetails:any = appSelector(selectMyProfileDetails);
    console.log('ProfileDetails', ProfileDetails);

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header profile-header">
                                <h2 className="card-title">
                                    <b>My Profile</b>
                                </h2>
                                <div className="card-tools">
                                    <Button
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        <i className="fas fa-minus" />
                                    </Button>
                                    <a aria-label="submitbutton" className="btn btn-primary submitbutton" href="/myprofile/edit-profile" title="Edit">
                                        <i className="fas fa-edit" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                <Collapse in={open}>
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            <p>{ProfileDetails.firstName}</p>
                                            <p>{ProfileDetails.email}</p>
                                            <p>{ProfileDetails.mobileNumber}</p>
                                            <p>{ProfileDetails.homeNumber}</p>
                                            <p>{ProfileDetails.nationality}</p>
                                        </div>

                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">Home Address</h5>
                                            <p>{ProfileDetails.homeAddress?.address1}</p>
                                            <p>{ProfileDetails.homeAddress?.city}</p>
                                            <p>{ProfileDetails.homeAddress?.postalCode}</p>
                                            <p>{ProfileDetails.homeAddress?.province}</p>
                                        </div>

                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">Billing Address</h5>
                                            <p>{ProfileDetails.billingAddress?.address1}</p>
                                            <p>{ProfileDetails.billingAddress?.city}</p>
                                            <p>{ProfileDetails.billingAddress?.postalCode}</p>
                                            <p>{ProfileDetails.billingAddress?.province}</p>
                                        </div>

                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <ManageFamily />
                </div>
                <div className="row mt-3">
                    <ManageDeseaedAns />
                </div>
            </div>
        </section>
    );
}

export default Myprofile;
