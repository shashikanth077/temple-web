import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { useIntl } from 'react-intl';
import { cartActions } from './cartSlice';
import { selectCurrentCartData } from './cartSelectors';
import { getDiscountPrice, cartItemStock } from 'helpers/products';
import { useRedux, useUser } from 'hooks';
import { CartData } from 'models';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { formatCurrency } from 'helpers/currency';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';
import { config } from 'config/Env';

/* eslint-disable */
const Cart = () => {
    const [loggedInUser] = useUser();
    const { dispatch, appSelector } = useRedux();

    const intl = useIntl();

    const { loading, error, successMessage } = useSelector(getApiState);

    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const currency = {
        currencyRate: 45.6,
        currencySymbol: "$",
    };

    useEffect(() => {
        dispatch(cartActions.getCartDetails({ userid: loggedInUser.id }));
    }, [dispatch, loggedInUser.id]);

    let cartItemList: any = appSelector(selectCurrentCartData);
    let cartItems: any = cartItemList?.list ?? [];

    const [cartDataState, setCartDataState] = useState<CartData>(cartItems);
    const [totalValue, setTotalPrice] = useState<number>(cartItems.totalPrice);
    const [actionName, Setaction] = useState<string>("");
    const [productVal, setProductId] = useState<string>("");

    useEffect(() => {
        let totalPrice = cartDataState?.items?.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        }, 0);
        setTotalPrice(totalPrice);
    }, [cartDataState, actionName, productVal]); // Include cartDataState in the dependency array to run the effect when it changes

    const handleDeleteCart = (payload: any) => {
        dispatch(cartActions.deleteFromCart(payload));
        setCartDataState((prevCartData) => {
            if (
                !prevCartData ||
                !prevCartData.items ||
                !Array.isArray(prevCartData.items)
            ) {
                console.error("Invalid cart data structure");
                return prevCartData;
            }

            if (payload.type) {
                const updatedCartData = { ...prevCartData, items: [] };
                return updatedCartData;
            } else {
                const updatedItems = prevCartData.items.filter(
                    (item) => item.productId !== payload.productId,
                );
                const updatedCartData = {
                    ...prevCartData,
                    items: updatedItems,
                };
                return updatedCartData;
            }
        });
    };

    useEffect(() => {
        if (successMessage) {
            showToast("success", "Success", successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast("error", "Error", error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const handleIncrease = (
        e: React.MouseEvent,
        productId: string,
        action: string,
    ) => {
        e.stopPropagation();

        Setaction(action);
        setProductId(productId);
        setCartDataState((prevCartData) => {
            if (
                !prevCartData ||
                !prevCartData.items ||
                !Array.isArray(prevCartData.items)
            ) {
                return prevCartData;
            }

            const updatedItems = prevCartData.items.map((item) =>
                item.productId === productId
                    ? {
                          ...item,
                          quantity:
                              action === "increase"
                                  ? item.quantity + 1
                                  : Math.max(0, item.quantity - 1),
                      }
                    : item,
            );

            const updatedCartData = { ...prevCartData, items: updatedItems };

            console.log("updatedCartData",updatedCartData);
            // Check if the action is 'decrease' and the quantity is 0
            if (
                action === "decrease" &&
                updatedItems.find((item) => item.productId === productId)
                    ?.quantity === 0
            ) {
                const deletePayload = {
                    userid: loggedInUser.id,
                    productId: productId,
                };

                // Dispatch the delete action
                dispatch(cartActions.deleteFromCart(deletePayload));

                // Wait for the delete action to complete
                //dispatch(cartActions.getCartDetails({ userid: loggedInUser.id })).then(() => {
                // Remove the deleted item from the local state
                setCartDataState((prev) => ({
                    ...prev,
                    items: prev.items.filter(
                        (item) => item.productId !== productId,
                    ),
                }));
                dispatch(
                    cartActions.getCartDetails({ userid: loggedInUser.id }),
                );
                // });
            } else {
                // Dispatch the appropriate action based on the quantity
                dispatch(
                    cartActions.addtoCartItems({
                        type: action === "increase" ? "increase" : "decrease",
                        productId: productId,
                        userid: loggedInUser.id,
                        quantity: 1,
                    }),
                );

                // Wait for the action to complete
                //dispatch(cartActions.getCartDetails({ userid: loggedInUser.id })).then(() => {
                // Update the local state with the new data
                //setCartDataState(updatedCartData);
                //});
            }

            return updatedCartData;
        });
    };

    return (
        <>
            <Toast ref={toast} />
            {loading && <Loader />}
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                    {cartDataState && cartDataState?.items?.length >= 1 ? (
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
                                                {cartDataState.items.map(
                                                    (
                                                        cartItem: any,
                                                        key: any,
                                                    ) => {
                                                        const discountedPrice =
                                                            getDiscountPrice(
                                                                cartItem.price,
                                                                cartItem.discount,
                                                            );
                                                        return (
                                                            <tr
                                                                key={
                                                                    cartItem.key
                                                                }
                                                            >
                                                                <td
                                                                    aria-label="product-thumbail"
                                                                    className="product-thumbnail"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={`${cartItem.image}`}
                                                                        alt=""
                                                                    />
                                                                </td>

                                                                <td className="product-name">
                                                                    {
                                                                        cartItem.name
                                                                    }
                                                                </td>

                                                                <td className="product-price-cart">
                                                                    <span className="amount">
                                                                    {formatCurrency(intl, cartItem.price)}
                                                                    </span>
                                                                </td>

                                                                <td className="product-quantity">
                                                                    <div className="cart-plus-minus">
                                                                        <button
                                                                            type="button"
                                                                            onClick={(
                                                                                e,
                                                                            ) =>
                                                                                handleIncrease(
                                                                                    e,
                                                                                    cartItem.productId,
                                                                                    "decrease",
                                                                                )
                                                                            }
                                                                            className="dec qtybutton"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <input
                                                                            className="cart-plus-minus-box"
                                                                            type="text"
                                                                            value={
                                                                                cartItem.quantity
                                                                            }
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={(
                                                                                e,
                                                                            ) =>
                                                                                handleIncrease(
                                                                                    e,
                                                                                    cartItem.productId,
                                                                                    "increase",
                                                                                )
                                                                            }
                                                                            className="inc qtybutton"
                                                                            disabled={
                                                                                cartItem !==
                                                                                    undefined &&
                                                                                cartItem.quantity >=
                                                                                    cartItemStock(
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
                                                                        formatCurrency(intl, cartItem.price * cartItem.quantity)  
                                                                    }
                                                                </td>

                                                                <td className="product-remove">
                                                                    <button
                                                                        aria-label="delete cart"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDeleteCart(
                                                                                {
                                                                                    userid: loggedInUser.id,
                                                                                    productId:
                                                                                        cartItem.productId,
                                                                                },
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa fa-times" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    },
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-shiping-update-wrapper">
                                        <div className="cart-shiping-update">
                                        {loggedInUser ? (
                                            <Link to={`/online-store`}>
                                                Continue Shopping
                                            </Link>
                                        ) : (
                                            <Link to={`/purchase`}>
                                                Continue Shopping
                                            </Link>
                                        )}
                                        </div>
                                        <div className="cart-clear">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteCart({
                                                        userid: loggedInUser.id,
                                                        productId: 0,
                                                        type: "delete-all",
                                                    })
                                                }
                                            >
                                                Clear Shopping Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row cart-grand-total">
                                <div className="col-lg-6 col-md-12">
                                    <div className="grand-totall">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title mb-3 section-bg-gary-cart">
                                                Cart Total
                                            </h4>
                                        </div>
                                        <h4 className="grand-totall-title">
                                            Grand Total{" "}
                                            <span>
                                                {formatCurrency(intl, totalValue)  }
                                            </span>
                                        </h4>
                                        <Link
                                            to={`/checkout`}
                                        >
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
                                        No items found in cart <br />{" "}
                                        <Link
                                            to={`/purchase`}
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default React.memo(Cart);
