import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    cartActions,
} from './cartSlice';
import { selectCurrentCartData } from './cartSelectors';
import { getDiscountPrice, cartItemStock } from 'helpers/products';
import { useRedux } from 'hooks';

const Cart = () => {
    const cartTotalPrice = 0;

    const { pathname } = useLocation();
    const { dispatch, appSelector } = useRedux();
    const [quantityCount, setQuantityCount] = useState(1);

    const currency = {
        currencyRate: 45.6,
        currencySymbol: '$',
    };

    useEffect(() => {
        dispatch(cartActions.getCartDetails({ cartId: 3, userid: 0, token: '4353435' }));
    }, [dispatch]);

    const cartItems:any = appSelector(selectCurrentCartData);

    // const [productStock, setProductStock] = useState(
    //     product.variation ? product.variation[0].size[0].stock : product.stock,
    // );

    return (

        <div className="cart-main-area pt-90 pb-100">
            <div className="container">
                {cartItems.list && Object.keys(cartItems.list).length >= 1 ? (
                    <>
                        <h3 className="cart-page-title">Your cart items</h3>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-content table-responsive cart-table-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Subtotal</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.list.products.map((cartItem:any, key:any) => {
                                                const discountedPrice = getDiscountPrice(
                                                    cartItem.product_price,
                                                    cartItem.discount,
                                                );

                                                // const finalProductPrice = (
                                                //     cartItem.product_price * currency.currencyRate
                                                // ).toFixed(2);
                                                // const finalDiscountedPrice = (
                                                //     discountedPrice * currency.currencyRate
                                                // ).toFixed(2);

                                                return (
                                                    <tr key={cartItem.product_id}>
                                                        <td aria-label="product-thumbail" className="product-thumbnail">
                                                            <Link
                                                                to={
                                                                    `${process.env.PUBLIC_URL
                                                                    }/product/${
                                                                        cartItem.cartid}`
                                                                }
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={`${window.location.origin}/${cartItem.product_image}`}
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </td>

                                                        <td className="product-name">
                                                            <Link
                                                                to={
                                                                    `${process.env.PUBLIC_URL
                                                                    }/product/${
                                                                        cartItem.cartid}`
                                                                }
                                                            >
                                                                {cartItem.product_name}
                                                            </Link>

                                                        </td>

                                                        <td className="product-price-cart">
                                                            {/* {discountedPrice !== null ? (
                                                                <>
                                                                    <span className="amount old">
                                                                        {currency.currencySymbol
                                          + cartItem.totalcartvalue}
                                                                    </span>
                                                                    <span className="amount">
                                                                        {currency.currencySymbol
                                          + cartItem.finaldiscountedprice}
                                                                    </span>
                                                                </>
                                                            ) : ( */}
                                                            <span className="amount">
                                                                {currency.currencySymbol
                                                               + cartItem.product_price}
                                                            </span>
                                                            {/* )} */}
                                                        </td>

                                                        <td className="product-quantity">
                                                            <div className="cart-plus-minus">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setQuantityCount(
                                                                        quantityCount > 1 ? quantityCount - 1 : 1,
                                                                    )}
                                                                    className="dec qtybutton"
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    className="cart-plus-minus-box"
                                                                    type="text"
                                                                    value={quantityCount}
                                                                    readOnly
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setQuantityCount(
                                                                        quantityCount > 1 ? quantityCount + 1 : 1,
                                                                    )}
                                                                    className="inc qtybutton"
                                                                    disabled={
                                                                        cartItem !== undefined
                                                                            && cartItem.quantity
                                                                            >= cartItemStock(
                                                                                cartItem,
                                                                            )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="product-subtotal">
                                                            {
                                                            //  {discountedPrice !== null
                                                            //     ? currency.currencySymbol
                                                            //         + (
                                                            //             cartItem.finaldiscountedprice * cartItem.quantity
                                                            //         ).toFixed(2)
                                                            //     :
                                                                currency.currencySymbol
                                                            + (
                                                                cartItem.product_price * cartItem.quantity
                                                            ).toFixed(2)
                                                            }
                                                        </td>

                                                        <td className="product-remove">
                                                            <button
                                                                aria-label="delete cart"
                                                                type="button"
                                                                onClick={() => dispatch(cartActions.deleteFromCart(
                                                                    {
                                                                        cartId: cartItems.list.cartid,
                                                                        userid: 0,
                                                                        token: '',
                                                                    },

                                                                ))}
                                                            >
                                                                <i className="fa fa-times" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-shiping-update-wrapper">
                                    <div className="cart-shiping-update">
                                        <Link
                                            to={`${process.env.PUBLIC_URL}/shop-grid-standard`}
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                    <div className="cart-clear">
                                        <button type="button" onClick={() => dispatch(cartActions.deleteAllFromCart())}>
                                            Clear Shopping Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="cart-tax">
                                    <div className="title-wrap">
                                        <h4 className="cart-bottom-title">
                                            Estimate Shipping And Tax
                                        </h4>
                                    </div>
                                    <div className="tax-wrapper">
                                        <p>
                                            Enter your destination to get a shipping estimate.
                                        </p>

                                        <div className="tax-select-wrapper">
                                            {/* <div className="tax-select">
                                                <label>* Country</label>
                                                <select className="email s-email s-wid">
                                                    <option>Bangladesh</option>
                                                    <option>Albania</option>
                                                    <option>Åland Islands</option>
                                                    <option>Afghanistan</option>
                                                    <option>Belgium</option>
                                                </select>
                                            </div> */}
                                            <div className="tax-select">
                                                <label>* Region / State</label>
                                                <select className="email s-email s-wid">
                                                    <option>Toronto</option>
                                                    <option>Others</option>
                                                </select>
                                            </div>
                                            <div className="tax-select">
                                                <label>* Zip/Postal Code</label>
                                                <input type="text" />
                                            </div>
                                            <button className="cart-btn-2" type="submit">
                                                Get A Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12">
                                <div className="grand-totall">
                                    <div className="title-wrap">
                                        <h4 className="cart-bottom-title section-bg-gary-cart">
                                            Cart Total
                                        </h4>
                                    </div>
                                    <h5>
                                        Total products{' '}
                                        <span>
                                            {currency.currencySymbol + cartItems.list.totalProducts.toFixed(2)}
                                        </span>
                                    </h5>

                                    <h4 className="grand-totall-title">
                                        Grand Total{' '}
                                        <span>
                                            {currency.currencySymbol + cartItems.list.totalprice.toFixed(2)}
                                        </span>
                                    </h4>
                                    <Link to={`${process.env.PUBLIC_URL}/checkout`}>
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon mb-30">
                                    <i className="pe-7s-cart" />
                                </div>
                                <div className="item-empty-area__text">
                                    No items found in cart <br />{' '}
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

export default Cart;
