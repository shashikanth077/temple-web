export {};

// import React, { useEffect, useRef, useState } from 'react';
// import { Modal } from 'react-bootstrap';
// // eslint-disable-next-line import/no-unresolved
// import {
//     EffectFade, Thumbs,
// } from 'swiper';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Toast } from 'primereact/toast';
// import { Loader } from 'react-bootstrap-typeahead';
// import { cartActions } from '../cart/cartSlice';
// import { selectCurrentCartData } from '../cart/cartSelectors';
// import { useRedux, useUser } from 'hooks';
// import { CartData } from 'models';
// import { clearState } from 'storeConfig/api/apiSlice';

// /* eslint no-underscore-dangle: 0 */
// interface productModalProps{
//     show:boolean;
//     onHide:any;
//     product:any;
//     currency:string;
//     discountedPrice:number |null;
//     finalProductPrice:number;
//     finalDiscountedPrice:number;
// }

// function ProductModal(props:productModalProps) {
//     const { dispatch, appSelector } = useRedux();
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);

//     const [loggedInUser] = useUser();
//     const navigate = useNavigate();

//     const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
//     const toast = useRef<any>(null);

//     const showToast = (severity:any, summary:any, detail:any) => {
//         toast?.current?.show({ severity, summary, detail });
//     };

//     useEffect(() => {
//         dispatch(cartActions.getCartDetails({ userid: loggedInUser.id }));
//     }, [dispatch, loggedInUser.id]);

//     const {
//         product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide,
//     } = props;

//     const [productStock, setProductStock] = useState(
//         product.variation ? product.variation[0].size[0].stock : product.stock,
//     );

//     const cartItemList: any = appSelector(selectCurrentCartData);
//     const cartItems: any = cartItemList?.list ?? [];

//     const [cartDataState, setCartDataState] = useState<CartData>(cartItems);
//     const [totalValue, setTotalPrice] = useState<number>(cartItems.totalPrice);
//     const [actionName, Setaction] = useState<string>('');
//     const [productVal, setProductId] = useState<string>('');

//     const gallerySwiperParams = {
//         spaceBetween: 10,
//         loop: true,
//         effect: 'fade',
//         fadeEffect: {
//             crossFade: true,
//         },
//         thumbs: {
//             swiper: thumbsSwiper || null,
//         },
//         modules: [EffectFade, Thumbs],
//     };

//     const AddtoCartItemsModal = (
//         e: React.MouseEvent,
//         productId: string,
//     ) => {
//         if (loggedInUser?.id) {
//             dispatch(cartActions.addtoCartItems({
//                 userid: loggedInUser?.id,
//                 productId,
//                 quantity: 1,
//             }));
//         } else {
//             navigate('/login');
//         }
//     };

//     const ProductCart = cartItems?.items.filter((item:any) => item.productId === product._id);

//     const handleCarts = (
//         e: React.MouseEvent,
//         productId: string,
//         action: string,
//     ) => {
//         e.stopPropagation();

//         Setaction(action);
//         setProductId(productId);
//         setCartDataState(prevCartData => {
//             if (
//                 !prevCartData
//                 || !prevCartData.items
//                 || !Array.isArray(prevCartData.items)
//             ) {
//                 return prevCartData;
//             }

//             const updatedItems = prevCartData.items.map(item => (item.productId === productId
//                 ? {
//                     ...item,
//                     quantity:
//                               action === 'increase'
//                                   ? item.quantity + 1
//                                   : Math.max(0, item.quantity - 1),
//                 }
//                 : item));

//             const updatedCartData = { ...prevCartData, items: updatedItems };
//             return updatedCartData;
//         });
//     };

//     const thumbnailSwiperParams = {
//         onSwiper: setThumbsSwiper,
//         spaceBetween: 10,
//         slidesPerView: 2,
//         touchRatio: 0.2,
//         freeMode: true,
//         loop: true,
//         slideToClickedSlide: true,
//         navigation: true,
//     };

//     const cartBtnStatus = false;

//     const onCloseModal = () => {
//         setThumbsSwiper(null);
//         onHide();
//     };

//     useEffect(() => {
//         if (successMessage) {
//             showToast('success', 'Success', successMessage);
//             dispatch(clearState());
//         }

//         if (error) {
//             showToast('error', 'Error', error);
//             dispatch(clearState());
//         }
//     }, [successMessage, error, dispatch]);

//     return (
//         <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
//             <Modal.Header closeButton />
//             <Toast ref={toast} />
//             {loading && <Loader />}
//             <div className="modal-body">
//                 <div className="row">
//                     <div className="col-md-5 col-sm-12 col-xs-12">
//                         <div className="product-large-image-wrapper">
//                             {/* <Swiper options={gallerySwiperParams}> */}
//                             {/* {product.image */}
//                             {/* && product.image.map((img:string, i:number) => ( */}
//                             {/* <SwiperSlide key={product.product_id}> */}
//                             <div className="single-image">
//                                 <img
//                                     src={product.image}
//                                     className="img-fluid"
//                                     alt="Product"
//                                 />
//                             </div>
//                             {/* //     </SwiperSlide> */}
//                             {/* ))} */}
//                             {/* </Swiper> */}
//                         </div>
//                         {/* <div className="product-small-image-wrapper mt-15">
//                             <Swiper options={thumbnailSwiperParams}>
//                                 {product.image
//                                     && product.image.map((img:string, i:number) => (
//                                         <SwiperSlide key={product.product_id}>
//                                             <div className="single-image">
//                                                 <img
//                                                     src={process.env.PUBLIC_URL + img}
//                                                     className="img-fluid"
//                                                     alt=""
//                                                 />
//                                             </div>
//                                         </SwiperSlide>
//                                     ))}
//                             </Swiper>
//                         </div> */}
//                     </div>
//                     <div className="col-md-7 col-sm-12 col-xs-12">
//                         <div className="product-details-content quickview-content">
//                             <h2>{product.name}</h2>
//                             <div className="product-details-price">
//                                 {/* {discountedPrice !== null ? (
//                                     <>
//                                         <span>
//                                             {finalDiscountedPrice}
//                                         </span>{' '}
//                                         <span className="old">
//                                             { finalProductPrice}
//                                         </span>
//                                     </>
//                                 ) : ( */}
//                                 <span>${finalProductPrice} </span>
//                                 {/* )} */}
//                             </div>

//                             <div className="pro-details-list">
//                                 <p>{product.fullDescription}</p>
//                             </div>

//                             {product.affiliateLink ? (
//                                 <div className="pro-details-quality">
//                                     <div className="pro-details-cart btn-hover">
//                                         <a
//                                             href={product.affiliateLink}
//                                             rel="noopener noreferrer"
//                                             target="_blank"
//                                         >
//                                             Buy Now
//                                         </a>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="pro-details-quality">
//                                     <div className="cart-plus-minus">
//                                         <button
//                                             type="button"
//                                             onClick={e => handleCarts(
//                                                 e,
//                                                 product.productid,
//                                                 'decrease',
//                                             )}
//                                             className="dec qtybutton"
//                                         >
//                                             -
//                                         </button>
//                                         <input
//                                             className="cart-plus-minus-box"
//                                             type="text"
//                                             value={
//                                                 ProductCart[0].quantity ? ProductCart[0].quantity : 0
//                                             }
//                                             readOnly
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={e => handleCarts(
//                                                 e,
//                                                 product.productid,
//                                                 'increase',
//                                             )}
//                                             className="inc qtybutton"
//                                         >
//                                             +
//                                         </button>
//                                     </div>
//                                     <div className="pro-details-cart btn-hover">
//                                         {productStock && productStock > 0 ? (
//                                             <button
//                                                 type="button"
//                                                 className={
//                                                     cartBtnStatus
//                                                         ? 'active'
//                                                         : ''
//                                                 }
//                                                 onClick={e => AddtoCartItemsModal(e, product.productid)}
//                                                 disabled={cartBtnStatus}
//                                             >
//                                                 {' '}
//                                                 <i className="pe-7s-cart" />{' '}
//                                                 {cartBtnStatus
//                                                     ? 'Added'
//                                                     : 'Add to cart'}
//                                             </button>
//                                         ) : (
//                                             <button type="button" disabled>Out of Stock</button>
//                                         )}
//                                     </div>

//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// }

// export default ProductModal;
