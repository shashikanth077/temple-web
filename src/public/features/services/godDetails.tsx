import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useParams, useNavigate } from 'react-router-dom';
import { useRedux } from 'hooks';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import { admingodActions } from 'admin/features/godmaster/godSlice';
import { selectGod } from 'admin/features/godmaster/godSelector';
import Heading from 'sharedComponents/heading/heading';

/* eslint-disable */
const GodDetails = () => {
    const { dispatch, appSelector } = useRedux();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(admingodActions.getGodById({ _id: id }));
    }, [dispatch, id]);

    const serviceDetails = appSelector(selectGod);

    const handleBook = (e: any, id: string) => {
        navigate(`/service-list/${id}`);
    }

    return (
        <section className="shop-area area-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-box pb-5 text-center">
                            <Heading
                                headingWrapClass="heading-head-wrap"
                                title="About"
                                classes="text-center mt-3"
                                align="text-center"
                            />
                        </div>
                    </div>
                </div>

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
                                        <h5 className="product-dtitle mb-20">{serviceDetails?.name}</h5>
                                        <div className="service-badges mb-4">
                                            {serviceDetails?.worshipDay.map((day: string) => (
                                                <p key={day} className="team-badge bg-primary text-white rounded f-14 mt-2">
                                                    {day}
                                                </p>
                                            ))}
                                        </div>
                                        <p>{serviceDetails?.description}</p>
                                        <CSSTransition in appear timeout={500} classNames="fade-up">
                                            <ButtonV1
                                                onClick={(e) => handleBook(e, serviceDetails?._id)}
                                                label='View services'
                                                btnClassName='tp-btn mr-20'

                                            />

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

export default React.memo(GodDetails);
