import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useRedux } from 'hooks';
import { adminServiceActions } from 'admin/features/services/serviceSlice';
import { selectService } from 'admin/features/services/serviceSelector';
import { formatCurrency } from 'helpers/currency';
import { APICore } from 'helpers';

/* eslint-disable */
const ServiceDetails = () => {
    const { dispatch, appSelector } = useRedux();
    const { id } = useParams();
    const intl = useIntl();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(adminServiceActions.getServiceById({ _id: id }));
    }, [dispatch, id]);

    const serviceDetails = appSelector(selectService);

    const handleBook = (e:any,id:string) => {
        if(!APICore.isUserAuthenticated()){
            localStorage.setItem('targetUrl', `/service-book/${id}`);
            navigate('/login');
        } else {
            navigate(`/service-book/${id}`);
        }
    }

    return (
        <section className="shop-area pt-120 pb-70">
            <div className="container">
                <div className="shop-left-right ml-130 mr-130">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <CSSTransition in appear timeout={1000} classNames="fade-left">
                                <div className="productthumb mb-40">
                                    <img src={`${window.location.origin}/assets/images/products/1.jpg`} alt="product-thumb" />
                                </div>
                            </CSSTransition>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <CSSTransition in appear timeout={1000} classNames="fade-right">
                                <div className="product mb-40 ml-20">
                                    <div className="product__details-content mb-40">
                                        <h5 className="product-dtitle mb-20">{serviceDetails?.serviceName}</h5>
                                        <div className="service-badges mb-4">
                                            <p className="team-badge bg-primary text-white rounded f-14 mt-2">{serviceDetails?.bookingType}</p>
                                            <p className="team-badge bg-primary text-white rounded f-14 mt-2">{serviceDetails?.serviceType}</p>
                                            <p className="team-badge bg-primary text-white rounded f-14 mt-2">{serviceDetails?.daysahead} days ahead</p>
                                        </div>
                                        <p>{serviceDetails?.description}</p>
                                        <h5 className="product-dprice mt-30">{formatCurrency(intl, serviceDetails?.price)}</h5>
                                        <CSSTransition in appear timeout={500} classNames="fade-up">
                                            <a onClick={(e) =>handleBook(e,serviceDetails?._id)} className="tp-btn mr-20">Book now</a>
                                        </CSSTransition>
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(ServiceDetails);
