import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../cart/cartSlice';

interface productProps{
    cartItems: any;
    currency:any;
    product:any;
    discountedPrice:number;
    finalDiscountedPrice:number;
    finalProductPrice:number;
}

/* eslint-disable */
const ProductDescriptionInfo = (props:productProps) => {
    const {
        product,
        currency,
        cartItems,
        discountedPrice,
        finalDiscountedPrice,
        finalProductPrice
    } = props;

    const dispatch = useDispatch();

    const [productStock, setProductStock] = useState(product.stock);
    const [quantityCount, setQuantityCount] = useState(1);


    // const productCartQty = getProductCartQuantity(
    //     cartItems,
    //     product,
    // ); //enable in futre
    const productCartQty = 7;

    return (
        <div className="product-details-content ml-70">
            <h2>{product.productname}</h2>
            <div className="product-details-price">
                {discountedPrice !== null ? (
                    <>
                        <span>{ finalDiscountedPrice}</span>{' '}
                        <span className="old">
                            {finalDiscountedPrice}
                        </span>
                    </>
                ) : (
                    <span>{ finalProductPrice} </span>
                )}
            </div>
            {/* {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                        <Rating ratingValue={product.rating} />
                    </div>
                </div>
            ) : (
                ''
            )} */}
            <div className="pro-details-list">
                <p>{product.shortDescription}</p>
            </div>

            {product.affiliateLink ? (
                <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover ml-0">
                        <a
                            href={product.affiliateLink}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
            ) : (
                <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                        <button
                            type="button"
                            onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
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
                                quantityCount < productStock - productCartQty
                                    ? quantityCount + 1
                                    : quantityCount,
                            )}
                            className="inc qtybutton"
                        >
                            +
                        </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                        {productStock && productStock > 0 ? (
                            <button
                                type="button"
                                onClick={() => dispatch(cartActions.addtoCartItems({
                                    productid:product.productid,
                                    currentCart:cartItems,
                                    quantity: quantityCount,

                                }))}
                                disabled={productCartQty >= productStock}
                            >
                                {' '}
                                Add To Cart{' '}
                            </button>
                        ) : (
                            <button type="button" disabled>Out of Stock</button>
                        )}
                    </div>

                </div>
            )}
            {/* {product.category ? (
                <div className="pro-details-meta">
                    <span>Categories :</span>
                    <ul>
                        {product.category.map((single:any, key:number) => (
                            <li key={key}>
                                <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                                    {single}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                ''
            )} */}
            {/* {product.tag ? (
                <div className="pro-details-meta">
                    <span>Tags :</span>
                    <ul>
                        {product.tag.map((single:any, key:number) => (
                            <li key={key}>
                                <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                                    {single}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                ''
            )} */}

        </div>
    );
};

export default ProductDescriptionInfo;
