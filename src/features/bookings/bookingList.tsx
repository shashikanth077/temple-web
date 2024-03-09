import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import HeadingVersionOne from 'sharedComponents/heading/headingVersionOne';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';
import { selectSevaList } from 'features/bookings/bookingSelector';
import { myBookingsActions } from 'features/bookings/bookingSlice';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';
import { formatCurrency } from 'helpers/currency';
import { APICore } from 'helpers';
import ButtonV1 from 'sharedComponents/button/buttonv1';

/* eslint no-underscore-dangle: 0 */
export function BookingTypes() {
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(myBookingsActions.getSevaList({}));
    }, [dispatch]);

    const handleBook = (e:any, id:string) => {
        if (!APICore?.isUserAuthenticated()) {
            localStorage.setItem('targetUrl', `/seva-book/${id}`);
            navigate('/login');
        } else {
            navigate(`/seva-book/${id}`);
        }
    };

    const bookingTypes = useSelector(selectSevaList);
    const intl = useIntl();

    return (
        <section className="seva-list-section area-padding">
            <div className="container">
                <HeadingVersionOne classes="seva-heading" title="List of seva" />
                <div className="seva-list">
                    {bookingTypes?.map((Seva:any) => (
                        <div className="seva-box">
                            <img className="seva-image" src={`${Seva.image}`} alt={`${Seva.Seva}`} />
                            <h4>{Seva.name} </h4>
                            <h6><ViewMore classnames="seva-view-more" title="View more" url={`/seva-details/${Seva._id}`} />
                            </h6>
                            <div className="seva-box-bottom">
                                <div className="left-side">
                                    <p className="seva-amount">{formatCurrency(intl, Seva?.amount)}</p>
                                </div>
                                <ButtonV1
                                    onClick={e => handleBook(e, Seva?._id)}
                                    label="Book now"
                                    btnClassName=""
                                    imgAlt="right-arrow"
                                    imgClassName="right-arrow"
                                    imageSrc={`${window.location.origin}/${PublicImageURL}/icons/right-arrow.svg`}
                                />
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
}

export default React.memo(BookingTypes);
