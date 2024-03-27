import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceActions } from '../serviceSlice';
import { selectServiceList } from '../serviceSelector';
import { admingodActions } from 'admin/features/godmaster/godSlice';
import { useRedux } from 'hooks';
import { selectGods } from 'admin/features/godmaster/godSelector';
import { APICore } from 'helpers';
import { PublicImageURL } from 'constants/publicUrl';
import { formatCurrency } from 'helpers/currency';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import Heading from 'sharedComponents/heading/heading';

/* eslint no-underscore-dangle: 0 */
/* eslint-disable */
const ServiceList = () => {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const intl = useIntl();
    const {id} = useParams();

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);

    const godList = useSelector(selectGods);

    useEffect(() => {
        dispatch(serviceActions.getServices({ _id: id }));
    }, [dispatch, id]);

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
                    <Heading
                        headingWrapClass="heading-head-wrap"
                        title="List of services"
                        classes="text-center mt-3"
                        align="text-center"
                    />
                    </h2>
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
                                    <ButtonV1
                                        onClick={(e) =>handleBook(e,Seva?._id)}
                                        label='Book now'
                                        btnClassName=''
                                        imgAlt="right-arrow"
                                        imgClassName="right-arrow"
                                        imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                    />
                                </div>
                            </div>
                          )
                          
                        })}
                    </div>
                ) : (
                    <div className="no-services-found">
                        <p>No services found  </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceList;
