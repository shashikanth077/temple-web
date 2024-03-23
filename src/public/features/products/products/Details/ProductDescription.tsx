import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useIntl } from 'react-intl';
import { useRedux, useUser } from 'hooks';
import Loader from 'sharedComponents/loader/loader';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { formatCurrency } from 'helpers/currency';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

interface productProps{
    product:any;
}

/* eslint-disable */
const ProductDescriptionInfo = (props:productProps) => {
    const {
        product,
    } = props;

    const {dispatch} = useRedux();
    const [loggedInUser] = useUser();
    const navigate = useNavigate();
    const intl = useIntl();

    const { loading, error, successMessage } = useSelector(getApiState);
    const toast = useRef<any>(null);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast?.current?.show({ severity, summary, detail });
    };
      
    const [productStock, setProductStock] = useState(product.stock);
  
    const AddtoCartItems = (productid:number, quantity:number) => {
        if (!loggedInUser?.id) {
            navigate('/login');
        }
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
                <span>{formatCurrency(intl, product.price)}</span>
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
                    <div className="pro-details-cart btn-hover">
                        {productStock && productStock > 0 ? (
                            <button
                                type="button"
                                onClick={() => AddtoCartItems(product._id, 1)}
                                // disabled={ProductCartCurrentData[0]?.quantity >= productStock}
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
