import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useIntl } from 'react-intl';
import { cartActions } from '../../cart/cartSlice';
import { selectCurrentCartData } from '../../cart/cartSelectors';
import { useRedux, useUser } from 'hooks';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/api/apiSlice';
import { CartData } from 'models';
import { formatCurrency } from 'helpers/currency';

interface productProps{
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
        discountedPrice,
        finalDiscountedPrice,
        finalProductPrice
    } = props;

    const {dispatch,appSelector} = useRedux();
    const [loggedInUser] = useUser();
    const navigate = useNavigate();
    const intl = useIntl();

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);
    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast?.current?.show({ severity, summary, detail });
    };
    
    useEffect(() => {
        dispatch(cartActions.getCartDetails({ userid: loggedInUser?.id }));
    }, [dispatch, loggedInUser?.id]);

    const [productStock, setProductStock] = useState(product.stock);
    let cartItemList: any = appSelector(selectCurrentCartData);
    let cartItems: any = cartItemList?.list ?? [];
  
    const [cartDataState, setCartDataState] = useState<CartData>(cartItems);
    const [totalValue,setTotalPrice] = useState<number>(cartItems.totalPrice);
    const [actionName,Setaction] =  useState<string>('');
    const [productVal,setProductId] =  useState<string>('');
  
    const AddtoCartItems = (productid:number, quantity:number) => {
        if (loggedInUser?.id) {
            dispatch(cartActions.addtoCartItems({
                userid: loggedInUser?.id,
                productId: productid,
                quantity,
            }));
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        let totalPrice = cartDataState?.items?.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        }, 0);
        setTotalPrice(totalPrice);
        if(actionName == 'increase') {
            dispatch(cartActions.addtoCartItems({productId:productVal,userid:loggedInUser.id,quantity:1}));
        }
        if(actionName == 'decrease') {
            dispatch(cartActions.addtoCartItems({type:"decrease",productId:productVal,userid:loggedInUser.id,quantity:1}));
        }
    }, [cartDataState,actionName,productVal]); 

    let ProductCart = cartItems?.items?.filter((item:any) => item.productId == product._id);
    let ProductCartCurrentData;

    if(ProductCart && ProductCart.length > 0) {
        ProductCartCurrentData = ProductCart;
    } else {
        ProductCartCurrentData=[]
    }

    const handleCarts = (
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
            return updatedCartData;
        });
    };

   

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

    return (
        <>
            <Toast ref={toast} />
            {loading && <Loader />}
        <div className="product-details-content ml-70">
            <h2>{product.name}</h2>
            <div className="product-details-price">
                {discountedPrice !== null ? (
                    <>
                        <span>{finalDiscountedPrice}</span>{' '}
                        <span className="old">
                            {finalDiscountedPrice}
                        </span>
                    </>
                ) : (
                    <span>{formatCurrency(intl, product.price)}</span>
                )}
            </div>
            <div className="pro-details-list">
                <p>{product.fullDescription}</p>
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
                            onClick={(
                                e,
                            ) =>
                                handleCarts(
                                    e,
                                    product._id,
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
                                (ProductCartCurrentData[0]?.quantity) ? ProductCartCurrentData[0]?.quantity : 0
                            }
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={(
                                e,
                            ) =>
                            handleCarts(
                                    e,
                                    product._id,
                                    "increase",
                                )
                            }
                            className="inc qtybutton"
                        >
                            +
                        </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                        {productStock && productStock > 0 ? (
                            <button
                                type="button"
                                onClick={() => AddtoCartItems(product._id,1)}
                                disabled={ProductCartCurrentData[0]?.quantity >= productStock}
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
        </div>
        </>
    );
};

export default ProductDescriptionInfo;
