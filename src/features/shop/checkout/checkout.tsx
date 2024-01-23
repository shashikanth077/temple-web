import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { selectCurrentCartData } from '../cart/cartSelectors';
import { cartActions } from '../cart/cartSlice';
import { useRedux, useUser } from 'hooks';
import { CAProvinces } from 'constants/CAProvinces';
import { myprofileActions } from 'admin/features/myprofile/myProfileSlice';
import { selectMyProfileDetails } from 'admin/features/myprofile/myProfileSelectors';
import { formatCurrency } from 'helpers/currency';

const Checkout = () => {
    const { dispatch, appSelector } = useRedux();
    const [loggedInUser] = useUser();
    const intl = useIntl();

    const [isChecked, setIsChecked] = useState(false);
    const [billingAddressFill, setBillingAddress] = useState<any>('');
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        dispatch(cartActions.getCartDetails({ userid: loggedInUser.id }));
        dispatch(myprofileActions.getMyProfileDetails({ userid: loggedInUser.id }));
    }, [dispatch]);

    const cartItemList: any = appSelector(selectCurrentCartData);
    const cartItems: any = cartItemList?.list ?? [];

    const ProfileDetails:any = appSelector(selectMyProfileDetails);

    React.useEffect(() => {
        if (isChecked) {
            setBillingAddress(ProfileDetails.homeAddress);
        } else {
            setBillingAddress('');
        }
    }, [isChecked]);

    const handleBillingToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
    };

    const currency = {
        currencyRate: 44.6,
        currencySymbol: '$',
    };

    console.log('billingAddressFill', billingAddressFill);
    return (

        <div className="checkout-area pt-95 pb-100">
            <div className="container">
                {cartItems && cartItems?.items?.length >= 1 ? (

                    <div className="row">

                        <div className="col-lg-7">
                            <div className="billing-info-wrap">
                                <h3>Billing Details</h3>

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input" checked={isChecked} onChange={handleBillingToggle} type="checkbox" id="saveAddress" />
                                            <label className="form-check-label d-flex align-items-center" htmlFor="saveAddress">
                                                Save as default address
                                                <a aria-label="profile-edit" className="btn btn-primary checkout-edit-btn" href="/myprofile/edit-profile" title="Edit">
                                                    <i className="fas fa-edit ml-2" />
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="billing-info mb-20">
                                            <label>Address</label>
                                            <input
                                                className="billing-address"
                                                name="billingAddress"
                                                value={billingAddressFill?.address1}
                                                placeholder="House number and street name"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="billing-info mb-20">
                                            <label>Town / City</label>
                                            <input type="text" name="billingCity" value={billingAddressFill?.city} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="billing-info mb-20">
                                            <label>State</label>
                                            <select
                                                value={selectedState}
                                                onChange={event => setSelectedState(event.target.value)}
                                                name="state"
                                                id="state"
                                                className="billing-selectinput mb-20"
                                            >
                                                <option value="">Select</option>
                                                {CAProvinces?.map((option:any, index:any) => (
                                                    <option value={option.name}>{option.name} </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="billing-info mb-20">
                                            <label>Postcode / ZIP</label>
                                            <input type="text" name="billingZipCode" value={billingAddressFill?.postalCode} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="billing-info mb-20">
                                            <label>Phone</label>
                                            <input type="text" name="billingMobilenumber" value="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="billing-info mb-20">
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={ProfileDetails.email} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="additional-info-wrap">
                                    <h4>Additional information</h4>
                                    <div className="additional-info">
                                        <label>Order notes</label>
                                        <textarea
                                            placeholder="Notes about your order, e.g. special notes for delivery. "
                                            name="message"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="your-order-area">
                                <h3>Your order</h3>
                                <div className="your-order-wrap gray-bg-4">
                                    <div className="your-order-product-info">
                                        <div className="your-order-top">
                                            <ul>
                                                <li>Product</li>
                                                <li>Total</li>
                                            </ul>
                                        </div>
                                        <div className="your-order-middle">
                                            <ul>
                                                {cartItems.items.map((cartItem:any, key:any) => (
                                                    <li>
                                                        <span className="order-middle-left">
                                                            {cartItem.name} X {cartItem.quantity}
                                                        </span>{' '}
                                                        <span className="order-price">
                                                            {formatCurrency(intl, cartItem.price
                                                                            * cartItem.quantity) }

                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="your-order-bottom">
                                            <ul>
                                                <li className="your-order-shipping">Shipping</li>
                                                <li>Free shipping</li>
                                            </ul>
                                        </div>
                                        <div className="your-order-total">
                                            <ul>
                                                <li className="order-total">Total</li>
                                                <li>
                                                    {currency.currencySymbol
                                + cartItems.totalPrice.toFixed(2)}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="payment-method" />
                                </div>
                                <div className="place-order mt-25">
                                    <button type="button">Place Order</button>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon mb-30">
                                    <i className="pe-7s-cash" />
                                </div>
                                <div className="item-empty-area__text">
                                    No items found in cart to checkout <br />{' '}
                                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Checkout;
