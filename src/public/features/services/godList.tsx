import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';
import { admingodActions } from 'admin/features/godmaster/godSlice';
import { selectGods } from 'admin/features/godmaster/godSelector';
import ButtonV1 from 'sharedComponents/button/buttonv1';
import Heading from 'sharedComponents/heading/heading';

/* eslint no-underscore-dangle: 0 */
export function GodList() {
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);

    const godList = useSelector(selectGods);

    const handleViewService = (id:string) => {
        navigate(`/service-list/${id}`);
    };

    return (
        <section className="seva-list-section area-padding">

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-box text-center">
                            <Heading
                                headingWrapClass="heading-head-wrap"
                                title="Gods"
                                classes="text-center mt-3"
                                align="text-center"
                            />
                        </div>
                    </div>
                </div>

                <div className="seva-list mt-10">
                    {godList.length > 0 ? (
                        godList?.map((Seva: any) => (
                            <div className="seva-box">
                                <img
                                    className="seva-image"
                                    src={`${Seva.image}`}
                                    alt={`${Seva.name}`}
                                />
                                <h4>{Seva.name} </h4>
                                <div className="seva-box-bottom">
                                    <div className="left-side">
                                        <p className="seva-amount">
                                            <ViewMore
                                                classnames="seva-view-more"
                                                title="About"
                                                url={`/god-details/${Seva._id}`}
                                            />
                                        </p>
                                    </div>
                                    <ButtonV1
                                        onClick={() => handleViewService(Seva?._id)}
                                        label="View services"
                                        btnClassName=""
                                        imgAlt="right-arrow"
                                        imgClassName="right-arrow"
                                        imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-services-found">
                            <p>No god found </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default React.memo(GodList);
