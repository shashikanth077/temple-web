import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import {
    EffectFade, Thumbs,
} from 'swiper';
import { cartActions } from '../cart/cartSlice';
import { selectCurrentCartData } from '../cart/cartSelectors';
import Swiper, { SwiperSlide } from 'sharedComponents/swiper/Swiper';
// import SlickSlider from 'sharedComponents/carosel/carosel';
import { getProductCartQuantity } from 'helpers/products';
import { useRedux } from 'hooks';

interface productModalProps{
    show:boolean;
    onHide:any;
    product:any;
    currency:string;
    discountedPrice:number |null;
    finalProductPrice:number;
    finalDiscountedPrice:number;
}
function ProductModal(props:productModalProps) {
    const { dispatch, appSelector } = useRedux();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const {
        product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide,
    } = props;

    const [productStock, setProductStock] = useState(
        product.variation ? product.variation[0].size[0].stock : product.stock,
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const CurrentCartItems:any = appSelector(selectCurrentCartData);

    useEffect(() => {
        console.log(quantityCount);
        dispatch(cartActions.decreaseQuantity({
            quantity: quantityCount, cartid: 5, productid: product.productid, userid: 4, sessionId: '565656',
        }));
    }, [quantityCount]);

    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: thumbsSwiper || null,
        },
        modules: [EffectFade, Thumbs],
    };

    // console.log('modal', CurrentCartItems);
    const AddtoCartItemsModal = (productid:number, quantity:number) => {
        console.log('prpduct', productid);
        dispatch(cartActions.addtoCartItems({
            productid,
            currentCart: CurrentCartItems,
            quantity,
        }));
        dispatch(cartActions.getCartDetails({ cartId: 3, userid: 0, token: '4353435' }));
    };

    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 2,
        touchRatio: 0.2,
        freeMode: true,
        loop: true,
        slideToClickedSlide: true,
        navigation: true,
    };

    const productCartQty = getProductCartQuantity(
        CurrentCartItems,
        product,
    );

    const found:any = CurrentCartItems.list.products.find((item:any) => item.productid === product.productid);
    let cartBtnStatus:boolean | undefined;
    if (!found) {
        cartBtnStatus = false;
    } else {
        cartBtnStatus = true;
    }

    const onCloseModal = () => {
        setThumbsSwiper(null);
        onHide();
    };

    return (
        <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
            <Modal.Header closeButton />

            <div className="modal-body">
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className="product-large-image-wrapper">
                            {/* <Swiper options={gallerySwiperParams}> */}
                            {/* {product.image */}
                            {/* && product.image.map((img:string, i:number) => ( */}
                            {/* <SwiperSlide key={product.product_id}> */}
                            <div className="single-image">
                                <img
                                    src={product.image}
                                    className="img-fluid"
                                    alt="Product"
                                />
                            </div>
                            {/* //     </SwiperSlide> */}
                            {/* ))} */}
                            {/* </Swiper> */}
                        </div>
                        {/* <div className="product-small-image-wrapper mt-15">
                            <Swiper options={thumbnailSwiperParams}>
                                {product.image
                                    && product.image.map((img:string, i:number) => (
                                        <SwiperSlide key={product.product_id}>
                                            <div className="single-image">
                                                <img
                                                    src={process.env.PUBLIC_URL + img}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div> */}
                    </div>
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="product-details-content quickview-content">
                            <h2>{product.name}</h2>
                            <div className="product-details-price">
                                {/* {discountedPrice !== null ? (
                                    <>
                                        <span>
                                            {finalDiscountedPrice}
                                        </span>{' '}
                                        <span className="old">
                                            { finalProductPrice}
                                        </span>
                                    </>
                                ) : ( */}
                                <span>${finalProductPrice} </span>
                                {/* )} */}
                            </div>

                            <div className="pro-details-list">
                                <p>{product.shortDescription}</p>
                            </div>

                            {product.affiliateLink ? (
                                <div className="pro-details-quality">
                                    <div className="pro-details-cart btn-hover">
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
                                                className={
                                                    cartBtnStatus
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={() => AddtoCartItemsModal(product.productid, 1)}
                                                disabled={cartBtnStatus}
                                            >
                                                {' '}
                                                <i className="pe-7s-cart" />{' '}
                                                {cartBtnStatus
                                                    ? 'Added'
                                                    : 'Add to cart'}
                                            </button>
                                        ) : (
                                            <button type="button" disabled>Out of Stock</button>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductModal;
