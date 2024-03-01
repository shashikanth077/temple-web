import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { serviceActions } from '../serviceSlice';
import { selectServiceList } from '../serviceSelector';
import { admingodActions } from 'admin/features/godmaster/godSlice';
import { useRedux } from 'hooks';
import { selectGods } from 'admin/features/godmaster/godSelector';
import { APICore } from 'helpers';
import { PublicImageURL } from 'constants/PublicUrl';
import { formatCurrency } from 'helpers/currency';

/* eslint no-underscore-dangle: 0 */
/* eslint-disable */
const ServiceList = () => {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);

    const godList = useSelector(selectGods);

    const [activeGod, setActiveGod] = useState(
        godList.length > 0 ? godList[0]?._id : null,
    );

    const [activeGodName, setActiveGodName] = useState(
        godList.length > 0 ? godList[0]?.name : null,
    );

    const handleGodClick = (value:string, name:string) => {
        setActiveGod(value);
        setActiveGodName(name);
    };

    useEffect(() => {
        dispatch(serviceActions.getServices({ _id: activeGod }));
    }, [dispatch, activeGod]);

    const serviceList = appSelector(selectServiceList);

    const handleBook = (e:any, id:string) => {
        if (!APICore?.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/service-book/${id}`);
            navigate('/login');
        } else {
            navigate(`/service-book/${id}`);
        }
    };

    return (

        <div className="member-services-section">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pl-0 xs-pr-0 sd-profile pr-0">
                    <h2 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pl-0 xs-pr-0 sd-side-heading fw400">
                        <span className="fw400">
                            <span className="fw700">List of services</span>
                        </span>
                    </h2>
                    <div className="service-form">
                        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 xssm-pr-0 pl-0 pr-0">
                            <label>Select God <span className="sd-imp">*</span></label>
                            <select
                                className="form-control service-list-dropdown"
                                onChange={event => handleGodClick(event.target.value, event.target.options[event.target.selectedIndex].text)}
                            >
                                <option>Select god</option>
                                {godList?.map((god: any) => (
                                    <option key={god._id} value={god._id}>
                                        {god.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="seva-list mt-10">
                {serviceList.length > 0 ? (
                    <div className="seva-container">
                        {serviceList?.map((Seva: any, index: number) => {
                          return (
                              <div className="seva-box">
                                <img
                                    className="seva-image"
                                    src={`${Seva.image}`}
                                    alt={`${Seva.serviceName}`}
                                />
                                <h4>{Seva.serviceName} </h4>
                                <div className="seva-box-bottom">
                                    <div className="left-side">
                                        <p className="seva-amount">
                                            {formatCurrency(intl, Seva?.price)}
                                        </p>
                                    </div>
                                    <button onClick={e => handleBook(e, Seva?._id)} type="button">
                                        Book now{' '}
                                        <img
                                            className="right-arrow"
                                            src={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                            alt="right-arrow"
                                        />
                                    </button>
                                </div>
                            </div>
                          )
                          
                        })}
                    </div>
                ) : (
                    <div className="no-services-found">
                        <p>No services found for {activeGodName} </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceList;
