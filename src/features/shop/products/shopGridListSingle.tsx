import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'react-bootstrap-typeahead';
import { Toast } from 'primereact/toast';
import { cartActions } from '../cart/cartSlice';
// import ProductModal from './productModal';
import { getDiscountPrice } from 'helpers/products';
import { useRedux, useUser } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';

interface ProductSingleProps {
    cartItem: any;
    currency: any;
    product: any;
}

/* eslint no-underscore-dangle: 0 */
const ProductGridListSingle = (props:ProductSingleProps) => {
    const { dispatch } = useRedux();
    const [loggedInUser] = useUser();
    const navigate = useNavigate();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const {
        cartItem, currency, product,
    } = props;

    const discountedPrice:number|null = getDiscountPrice(product.price, product.discount);
    const [modalShow, setModalShow] = useState(false);
    const finalProductPrice = +(product.price).toFixed(2);
    const finalDiscountedPrice = +(
        (discountedPrice) || 0.0 * currency.currencyRate
    ).toFixed(2);

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const AddtoCartItems = (productid:number, quantity:number) => {
        if (loggedInUser?.id) {
            dispatch(cartActions.addtoCartItems({
                userid: loggedInUser?.id,
                productId: productid,
                currentCart: cartItem,
                quantity,
            }));
            dispatch(cartActions.getCartDetails({ userid: loggedInUser.id }));
        } else {
            navigate('/login');
        }
    };

    const found:any = cartItem?.list?.products?.find((item:any) => item.productid === product.productid);
    let cartBtnStatus:boolean | undefined;
    if (!found) {
        cartBtnStatus = false;
    } else {
        cartBtnStatus = true;
    }

    let affiliateLink;
    if (product.affiliateLink) {
        affiliateLink = (
            <a
                href={product.affiliateLink}
                rel="noopener noreferrer"
                target="_blank"
            >
                {' '}
                Buy now{' '}
            </a>
        );
    }

    let StockElement;
    if (product.stock && product.stock > 0) {
        StockElement = (
            <button
                aria-label="stock"
                type="button"
                onClick={() => AddtoCartItems(product._id, 1)}
                className={
                    cartBtnStatus
                        ? 'active'
                        : ''
                }
                disabled={cartBtnStatus}
                title={
                    cartBtnStatus ? 'Added to cart' : 'Add to cart'
                }
            >
                {' '}
                <i className="pe-7s-cart" />{' '}
                {cartBtnStatus
                    ? 'Added'
                    : 'Add to cart'}
            </button>
        );
    } else {
        StockElement = (
            <button
                aria-label="stock"
                type="button"
                disabled
                className="active"
            >
                Out of Stock
            </button>
        );
    }
    return (
        <>
            <Toast ref={toast} />
            {loading && <Loader />}
            <div className="product-wrap mb-25">
                <div className="product-img">
                    <Link to={`${process.env.PUBLIC_URL}/products/details/${product._id}`}>
                        <img
                            className="default-img"
                            src={product?.image}
                            alt=""
                        />
                        {/* {product.image.length > 1 ? (
                            <img
                                className="hover-img"
                                src={process.env.PUBLIC_URL + product.image[1]}
                                alt=""
                            />
                        ) : (
                            ''
                        )} */}
                    </Link>
                    {product.discount || product.new ? (
                        <div className="product-img-badges">
                            {product.new ? <span className="purple">New</span> : ''}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="product-action">
                        <div className="pro-same-action pro-cart">
                            {affiliateLink}
                            {StockElement}
                        </div>
                        {/* <div className="pro-same-action pro-quickview">
                            <button type="button" aria-label="quickview" onClick={() => setModalShow(true)} title="Quick View">
                                <i className="fas fa-low-vision" />
                            </button>
                        </div> */}
                    </div>
                </div>
                <div className="product-content text-center">
                    <h3>
                        <Link to={`${process.env.PUBLIC_URL}/products/details/${product._id}`}>
                            {product.name}
                        </Link>
                    </h3>

                    <div className="product-price">
                        <span>${finalProductPrice} </span>
                    </div>
                </div>
            </div>
            <div className="shop-list-wrap mb-30">
                <div className="row">
                    <div className="col-xl-4 col-md-5 col-sm-6">
                        <div className="product-list-image-wrap">
                            <div className="product-img">
                                <Link to={`${process.env.PUBLIC_URL}/products/details/${product.id}`}>
                                    <img
                                        className="default-img img-fluid"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    {/* {product.image.length > 1 ? (
                                        <img
                                            className="hover-img img-fluid"
                                            src={process.env.PUBLIC_URL + product.image[1]}
                                            alt=""
                                        />
                                    ) : (
                                        ''
                                    )} */}
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-md-7 col-sm-6">
                        <div className="shop-list-content">
                            <h3>
                                <Link to={`${process.env.PUBLIC_URL}/products/details/${product._id}`}>
                                    {product.name}
                                </Link>
                            </h3>
                            <div className="product-list-price">
                                <span>${ finalProductPrice} </span>
                            </div>
                            {product.shortDescription ? (
                                <p>{product.shortDescription}</p>
                            ) : (
                                ''
                            )}

                            <div className="shop-list-actions d-flex align-items-center">
                                <div className="shop-list-btn btn-hover">
                                    {affiliateLink}
                                    {StockElement}
                                </div>

                                <div className="shop-list-wishlist ml-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            {/* <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                discountedPrice={discountedPrice}
                finalProductPrice={finalProductPrice}
                finalDiscountedPrice={finalDiscountedPrice}
            /> */}
        </>
    );
};

export default ProductGridListSingle;
