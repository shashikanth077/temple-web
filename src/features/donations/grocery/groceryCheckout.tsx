import React from 'react';
import { Link } from 'react-router-dom';
import { selectCurrentGroceryCartItems } from './grocerySelector';
import { useRedux } from 'hooks';

const GroceryCheckout = () => {
    const { appSelector } = useRedux();

    const cartItems:any = appSelector(selectCurrentGroceryCartItems);

    const getTotalQuantity = () => {
        let total = 0;
        cartItems.forEach((item:any) => {
            total += item.quantity * item.price;
        });
        return total;
    };

    return (

        <div className="checkout-area pt-95 pb-100">
            <div className="container">
                {cartItems.length > 0 ? (
                    <>
                        <div className="row user-grocery-profile-details">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Donation Checkout</b></h3>
                                </div>
                                <div className="card-body">
                                    <div className="row user-profile-details">
                                        <div className="col-sm-4 invoice-col">
                                            <p>
                                                <i className="fa fa-user-circle" /> Shashikanth H r
                                            </p>
                                            <p>
                                                <i className="fa fa-envelope" /> shashikanth033@gmail.com
                                            </p>
                                            <p>
                                                <i className="fa fa-phone" /> 8123192799
                                            </p>
                                        </div>

                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">Home Address</h5>
                                            <p>Mandya</p>
                                            <p>Arizona</p>
                                            <p>Mxn</p>
                                            <p>571438</p>
                                        </div>
                                        <div className="col-sm-4 invoice-col">
                                            <h5 className="text-danger">Billing Address</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="billing-info-wrap">
                                    <h3>Billing Details</h3>
                                    <div className="row">

                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>Address</label>
                                                <input
                                                    className="billing-address"
                                                    placeholder="House number and street name"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>Town / City</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-select mb-20">
                                                <label>Country</label>
                                                <select>
                                                    <option>Select a country</option>
                                                    <option>Azerbaijan</option>
                                                    <option>Bahamas</option>
                                                    <option>Bahrain</option>
                                                    <option>Bangladesh</option>
                                                    <option>Barbados</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Postcode / ZIP</label>
                                                <input type="text" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="your-order-area">
                                    <h3>Your donation items summary</h3>
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
                                                    {cartItems.map((cartItem:any, key:any) => (
                                                        <li>
                                                            <span className="order-middle-left">
                                                                {cartItem.name} X {cartItem.quantity}
                                                            </span>{' '}
                                                            <span className="order-price">
                                                                ${cartItem.quantity * cartItem.price}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="your-order-total">
                                                <ul>
                                                    <li className="order-total">Total</li>
                                                    <li>
                                                        ${getTotalQuantity()}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="payment-method" />
                                    </div>
                                    <div className="place-order mt-25">
                                        <button type="button">Donate now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
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

export default GroceryCheckout;
