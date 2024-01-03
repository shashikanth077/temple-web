import React from 'react';
import {
    Button,
} from 'react-bootstrap';
import { FormInput } from 'sharedComponents/inputs';

interface ReportFilter {
    handleInputChange: any;
    SearchHandler:any;
    ClearHandler:any;
    seachFilter:any
}

const ReportFilter = (props:ReportFilter) => {
    const {
        handleInputChange, SearchHandler, ClearHandler, seachFilter,
    } = props;

    return (
        <div className="container-fluid report-filter mb-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <b>Search:</b>
                            </h3>
                        </div>

                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            value={seachFilter.devoteeId}
                                            name="devoteeId"
                                            key="devoteeId"
                                            onChange={handleInputChange}
                                            label="Devotee ID"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            value={seachFilter.devoteeName}
                                            name="devoteeName"
                                            key="devoteeName"
                                            onChange={handleInputChange}
                                            label="Devotee name"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            name="mobileNumber"
                                            value={seachFilter.mobileNumber}
                                            onChange={handleInputChange}
                                            key="mobileNumber"
                                            label="Mobile number"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            name="phoneNumber"
                                            value={seachFilter.phoneNumber}
                                            onChange={handleInputChange}
                                            key="phoneNumber"
                                            label="Phone number"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            name="postalCode"
                                            key="postalCode"
                                            value={seachFilter.postalCode}
                                            onChange={handleInputChange}
                                            label="Postal code"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            value={seachFilter.tickerId}
                                            name="tickerId"
                                            onChange={handleInputChange}
                                            key="tickerId"
                                            label="Ticker ID"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row text-center">
                                <div className="col-sm-12">

                                    <div className="text-center d-flex mb-3 update-profile-btn">
                                        <Button onClick={SearchHandler} type="submit" className="btn btn-primary submit-btn mr-2 waves-effect waves-light">
                                            Search
                                        </Button>
                                        <Button onClick={ClearHandler} type="button" className="btn btn-primary submit-btn mr-2 waves-effect waves-light">
                                            Clear
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFilter;
