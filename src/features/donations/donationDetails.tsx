import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useParams, useNavigate } from 'react-router-dom';
import { useRedux } from 'hooks';
import { selectDonationType } from 'admin/features/donations/donationSelector';
import { APICore } from 'helpers';
import { adminDonationTypeActions } from 'admin/features/donations/donationSlice';

/* eslint-disable */
const DonationDetails = () => {
    const { dispatch, appSelector } = useRedux();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationById({ _id: id }));
    }, [dispatch, id]);

    const serviceDetails = appSelector(selectDonationType);

    const handleBook = (e:any,id:string) => {
        if(!APICore.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/donation-confirm/${id}`);
            navigate('/login');
        } else {
            navigate(`/donation-confirm/${id}`);
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
                                    <img src={`${serviceDetails?.image}`} alt="service-thumb" />
                                </div>
                            </CSSTransition>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <CSSTransition in appear timeout={1000} classNames="fade-right">
                                <div className="product mb-40 ml-20">
                                    <div className="product__details-content mb-40">
                                        <h5 className="product-dtitle mb-20">{serviceDetails?.donationType}</h5>
                                        <div className="service-badges mb-4">
                                            <p className="team-badge bg-primary text-white rounded f-14 mt-2">{serviceDetails?.frequency}</p>
                                        </div>
                                        <p>{serviceDetails?.description}</p>
                                        <CSSTransition in appear timeout={500} classNames="fade-up">
                                            <a onClick={(e) =>handleBook(e,serviceDetails?._id)} className="tp-btn mr-20">Donate now</a>
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

export default React.memo(DonationDetails);
