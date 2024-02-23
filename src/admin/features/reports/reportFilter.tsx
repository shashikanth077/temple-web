import React, { useState } from 'react';
import {
    Button,
} from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { FormInput } from 'sharedComponents/inputs';

interface ReportFilter {
    handleInputChange: any;
    SearchHandler:any;
    ClearHandler:any;
    seachFilter:any
}

/* eslint-disable */
const ReportFilter = (props:ReportFilter) => {
    const {
        handleInputChange, SearchHandler, ClearHandler, seachFilter,
    } = props;

    const [date, setDate] = useState(null);

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
                                            onChange={(e) => handleInputChange("devoteeId", e.target.value)}
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
                                            onChange={(e) => handleInputChange("devoteeName", e.target.value)}
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
                                            name="devoteePhoneNumber"
                                            value={seachFilter.devoteePhoneNumber}
                                            onChange={(e) => handleInputChange("devoteePhoneNumber", e.target.value)}
                                            key="devoteePhoneNumber"
                                            label="Mobile number"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <FormInput
                                            type="text"
                                            name="serviceName"
                                            value={seachFilter.serviceName}
                                            onChange={(e) => handleInputChange("serviceName", e.target.value)}
                                            key="serviceName"
                                            label="Service name"
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
                                            name="ticketId"
                                            key="ticketId"
                                            value={seachFilter.ticketId}
                                            onChange={(e) => handleInputChange("ticketId", e.target.value)}
                                            label="Ticket ID"
                                            containerClass="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor='createdAt'>Created date</label>
                                        <Calendar
                                            className='mb-3'
                                            name="createdAt"
                                            value={moment(seachFilter.createdAt).toDate()}// Assuming createdAt is in your seachFilter
                                            onChange={(e) => handleInputChange("createdAt", e.value)}
                                            dateFormat="yy-mm-dd"
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
