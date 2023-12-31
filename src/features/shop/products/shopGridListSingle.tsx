import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cartActions } from '../cart/cartSlice';
// import { addToWishlist } from '../../store/slices/wishlist-slice';
import ProductModal from './productModal';
import { getDiscountPrice } from 'helpers/products';
import { useRedux } from 'hooks';

interface ProductSingleProps {
    cartItem: any;
    currency: any;
    product: any;
    index:number;
}

/* eslint no-underscore-dangle: 0 */
const ProductGridListSingle = (props:ProductSingleProps) => {
    const { dispatch } = useRedux();

    const {
        cartItem, currency, product, index,
    } = props;

    // console.log('cart items', cartItem);
    const discountedPrice:number|null = getDiscountPrice(product.price, product.discount);
    const [modalShow, setModalShow] = useState(false);
    const finalProductPrice = +(product.price).toFixed(2);
    const finalDiscountedPrice = +(
        (discountedPrice) || 0.0 * currency.currencyRate
    ).toFixed(2);

    const AddtoCartItems = (productid:number, quantity:number) => {
        dispatch(cartActions.addtoCartItems({
            productid,
            currentCart: cartItem,
            quantity,
        }));
        dispatch(cartActions.getCartDetails({ cartId: 3, userid: 0, token: '4353435' }));
    };

    const found:any = cartItem.list.products.find((item:any) => item.productid === product.productid);
    let cartBtnStatus:boolean | undefined;
    if (!found) {
        cartBtnStatus = false;
    } else {
        cartBtnStatus = true;
    }

    // console.log('final updated cart in product single page', cartItem);
    // console.log('final updated cart in product id', product.productid);

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
                            {/* {product.discount ? (
                                <span className="pink">-{product.discount}%</span>
                            ) : (
                                ''
                            )} */}
                            {product.new ? <span className="purple">New</span> : ''}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="product-action">
                        {/* <div className="pro-same-action pro-wishlist">
                            <button
                                aria-label="add to whisylist"
                                type="button"
                            >
                                <i className="fas fa-heart" />
                            </button>
                        </div> */}
                        <div className="pro-same-action pro-cart">
                            {affiliateLink}
                            {StockElement}
                        </div>
                        <div className="pro-same-action pro-quickview">
                            <button type="button" aria-label="quickview" onClick={() => setModalShow(true)} title="Quick View">
                                <i className="fas fa-low-vision" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-content text-center">
                    <h3>
                        <Link to={`${process.env.PUBLIC_URL}/products/details/${product._id}`}>
                            {product.name}
                        </Link>
                    </h3>

                    <div className="product-price">
                        {/* {discountedPrice !== null ? (
                            <>
                                <span>{finalDiscountedPrice}</span>{' '}
                                <span className="old">
                                    { finalProductPrice}
                                </span>
                            </>
                        ) : ( */}
                        <span>${finalProductPrice} </span>
                        {/* )} */}
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
                                {product.discount || product.new ? (
                                    <div className="product-img-badges">
                                        {/* {product.discount ? (
                                            <span className="pink">-{product.discount}%</span>
                                        ) : (
                                            ''
                                        )} */}
                                        {product.new ? <span className="purple">New</span> : ''}
                                    </div>
                                ) : (
                                    ''
                                )}
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
                                {/* {discountedPrice !== null ? (
                                    <>
                                        <span>
                                            {finalDiscountedPrice}
                                        </span>{' '}
                                        <span className="old">
                                            {finalProductPrice}
                                        </span>
                                    </>
                                ) : ( */}
                                <span>${ finalProductPrice} </span>
                                {/* )} */}
                            </div>
                            {/* {product.rating && product.rating > 0 ? (
                                <div className="rating-review">
                                    <div className="product-list-rating">
                                        <Rating ratingValue={product.rating} />
                                    </div>
                                </div>
                            ) : (
                                ''
                            )} */}
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

                                <div className="shop-list-wishlist ml-10">
                                    {/* <button
                                        aria-label="Add to whislist"
                                        type="button"
                                        className={wishlistItem !== undefined ? 'active' : ''}
                                        disabled={wishlistItem !== undefined}
                                        title={
                                            wishlistItem !== undefined
                                                ? 'Added to wishlist'
                                                : 'Add to wishlist'
                                        }
                                        onClick={() => dispatch(addToWishlist(product))}
                                    >
                                        <i className="pe-7s-like" />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                discountedPrice={discountedPrice}
                finalProductPrice={finalProductPrice}
                finalDiscountedPrice={finalDiscountedPrice}
            />
        </>
    );
};

export default ProductGridListSingle;
