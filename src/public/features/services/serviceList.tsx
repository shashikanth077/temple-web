import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { serviceActions } from './serviceSlice';
import { selectServiceList } from './serviceSelector';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';
import { formatCurrency } from 'helpers/currency';
import { admingodActions } from 'admin/features/godmaster/godSlice';
import { selectGods } from 'admin/features/godmaster/godSelector';
import { APICore } from 'helpers';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import Heading from 'sharedComponents/heading/heading';
import DataNotFound from 'sharedComponents/DataNotFound';

/* eslint no-underscore-dangle: 0 */
/* eslint-disable */
export function ServiceList() {
    const { dispatch, appSelector } = useRedux();
    const intl = useIntl();
    const navigate = useNavigate();

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

    const handleGodClick = (godId: string,name:string) => {
        setActiveGod(godId);
        setActiveGodName(name);
    };

    const handleBook = (e:any,id:string) => {
        if(!APICore?.isUserAuthenticated()){
            localStorage.setItem('targetUrl', `/service-book/${id}`);
            navigate('/login');
        } else {
            navigate(`/service-book/${id}`);
        }
    }


    useEffect(() => {
        dispatch(serviceActions.getServices({ _id: activeGod }));
    }, [dispatch, activeGod]);

    const serviceList = appSelector(selectServiceList);

    if (!serviceList || serviceList.length === 0) {
        return <DataNotFound />;
    }

    return (
        <section className="seva-list-section area-padding">
            
            <div className="container">
            <div className="row">
                    <div className="col-lg-12">
                        <div className="title-box text-center">
                            <Heading
                                headingWrapClass="heading-head-wrap"
                                title="Services"
                                classes="text-center mt-3"
                                align="text-center"
                            />
                        </div>
                    </div>
                </div>
                <div className="god-lists">
                    <div className="god-list-view">
                        {godList?.map((god: any) => (
                            <div
                                aria-label="activeLink"
                                tabIndex={0}
                                key={god._id}
                                className={`single-god-box ${activeGod === god._id ? "active" : ""}`}
                                onClick={() => handleGodClick(god._id,god.name)}
                                onKeyDown={() => handleGodClick(god._id,god.name)}
                            >
                                <div className="image-wrapper">
                                    <img src={god?.image} alt={god?.name} />
                                    <p>{god?.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="seva-list mt-10">
                    {serviceList.length > 0 ? (
                        serviceList?.map((Seva: any) => (
                            <div className="seva-box">
                                <img
                                    className="seva-image"
                                    src={`${Seva.image}`}
                                    alt={`${Seva.serviceName}`}
                                />
                                <h4>{Seva.serviceName} </h4>
                                <h6>
                                    <ViewMore
                                        classnames="seva-view-more"
                                        title="View more"
                                        url={`/service-details/${Seva._id}`}
                                    />
                                </h6>
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
                        ))
                    ) : (
                        <div className="no-services-found">
                            <p>No services found for {activeGodName} </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default React.memo(ServiceList);
