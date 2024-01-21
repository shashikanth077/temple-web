import React, { useEffect } from 'react';
import {
    Link,
} from 'react-router-dom';
import { selectContactList } from 'features/contact/contactSelectors';
import { selectCurrentCartData } from 'features/shop/cart/cartSelectors';
import { contactActions } from 'features/contact/contactSlice';
import { authActions } from 'features/auth/login/loginSlice';
import useRedux from 'hooks/useRedux';
import { APICore } from 'helpers/api';

function Topbar() {
    const { dispatch, appSelector } = useRedux();

    const userLogout = () => {
        dispatch(authActions.logout());
    };

    useEffect(() => {
        dispatch(contactActions.fetchContactList());
    }, [dispatch]);

    const {
        contactList, loading, error,
    } = appSelector(state => ({
        contactList: state.contact.list,
        loading: state.contact.loading,
        error: state.contact.error,
    }));

    const cartItems:any = appSelector(selectCurrentCartData);

    return (
        <section className="topbar d-flex align-items-center">
            <div className="contact-info px-5 col-lg-8 align-items-center d-lg-flex">
                <i className="fas fa-phone">
                    <a href="https://fontawesome.com/">{contactList?.phonenumber}</a>
                </i>
                <i className="fas fa-envelope">
                    <a href="https://fontawesome.com/">{contactList?.emailaddress}</a>
                </i>
                <i className="fas fa-map-marker-alt">
                    <a href="https://fontawesome.com/">{contactList?.address}</a>
                </i>
            </div>
            <div className="social-links col-lg-4">
                <ul className="social-icons">
                    <li>Follow us:</li>
                    <li>
                        <a aria-label={contactList?.sociallinks.fb_icon_name} href={contactList?.sociallinks.fb_link}>
                            <i className={contactList?.sociallinks.fb_icon_name} />
                        </a>
                    </li>
                    <li>
                        <a aria-label={contactList?.sociallinks.instagram_icon_name} href={contactList?.sociallinks.instagram_link}>
                            <i className={contactList?.sociallinks.instagram_icon_name} />
                        </a>
                    </li>
                    <li>
                        <a aria-label={contactList?.sociallinks.whatsapp_icon_name} href={contactList?.sociallinks.twitter_icon_name}>
                            <i className={contactList?.sociallinks.whatsapp_icon_name} />
                        </a>
                    </li>
                    <li>
                        <a aria-label={contactList?.sociallinks.twitter_icon_name} href={contactList?.sociallinks.whatsapp_icon_name}>
                            <i className={contactList?.sociallinks.twitter_icon_name} />
                        </a>
                    </li>
                    <li>
                        <a aria-label={contactList?.sociallinks.twitter_icon_name} href={contactList?.sociallinks.whatsapp_icon_name}>
                            <i className="fas fa-calendar-alt" />
                        </a>
                    </li>

                </ul>
                <div className="same-style cart-wrap d-none d-lg-block">
                    {APICore.isUserAuthenticated()
                        ? (
                            <Link className="icon-cart" to={`${process.env.PUBLIC_URL}/cart/view-cart`}>
                                <button type="button" className="icon-cart">
                                    <i className="fas fa-shopping-cart" />
                                    <span className="count-style">
                                        {cartItems?.list?.totalQuantity !== undefined ? cartItems.list.totalQuantity : 0}
                                    </span>
                                </button>
                            </Link>
                        ) : '' }
                </div>
                <div className="user-account-section">
                    <a aria-label="Member Portal" href="/login">
                        <i className="fas fa-user" />
                    </a>
                    {APICore.isUserAuthenticated()
                        ? (
                            <button type="button" onClick={() => userLogout()} className="logout-btn" aria-label="Member">
                                <i className="fas fa-sign-out-alt">Logout</i>
                            </button>

                        )
                        : (
                            <a href="/login" className="member-portal-link" aria-label="Member">
                                Member portal
                            </a>
                        )}
                </div>
            </div>
        </section>
    );
}

export default Topbar;
