import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from 'public/features/auth/login/loginSlice';
import { selectStaticTopbar, selectContactDetails } from 'contents/content/contactSelectors';
import useRedux from 'hooks/useRedux';
import { APICore } from 'helpers/api';

/* eslint-disable */
function Topbar() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const userLogout = () => {
        dispatch(authActions.logout());
        navigate('/');
    };

    const TopbarDetails:any = appSelector(selectStaticTopbar);
    const contactDetails = appSelector(selectContactDetails);

    return (
        <section className="topbar d-flex align-items-center">
            <div className="contact-info px-5 col-lg-8 align-items-center d-lg-flex">
                <i className={`${contactDetails?.PhoneIcon}`}>
                    <a>{contactDetails?.Phonenumber}</a>
                </i>
                <i className={`${contactDetails?.EmailIcon}`}>
                    <a>{contactDetails?.Emailaddress}</a>
                </i>
                <i className={`${contactDetails?.AddressIcon}`}>
                    <a>{contactDetails?.Address}</a>
                </i>
            </div>
            <div className="social-links col-lg-4">
                <ul className="social-icons">
                    <li>{`${TopbarDetails?.FollowUs}`}:</li>
                    {contactDetails?.Sociallinks?.map((item:any) => (
                        <li key={item?.label}>
                            <a aria-label={`${item?.label}`} href={`${item?.link}`}>
                                <i className={`${item?.iconName}`} />
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="user-account-section">
                    <a aria-label={`${TopbarDetails?.UserIconCaption}`} href="/login">
                        <i className={`${TopbarDetails?.UserIcon}`}/>
                    </a>
                    {APICore.isUserAuthenticated()
                        ? (
                            <button type="button" onClick={() => userLogout()} className="logout-btn" aria-label="Member">
                                <i className="fas fa-sign-out-alt">{`${TopbarDetails?.UserLogoutTitle}`}</i>
                            </button>
                        )
                        : (
                            <a href="/login" className="member-portal-link" aria-label="Member">
                                {`${TopbarDetails?.UserIconCaption}`}
                            </a>
                        )}
                </div>
            </div>
        </section>
    );
}

export default Topbar;
