import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageDescription from './ProductDetails';
import { useRedux } from 'hooks';
import { selectProduct } from 'features/shop/providers/productSelectors';
import { productActions } from 'features/shop/providers/productSlice';

/* eslint no-underscore-dangle: 0 */
const Product = () => {
    const { id } = useParams();
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(productActions.fetchproduct({ id }));
    }, [dispatch, id]);

    const product = appSelector(selectProduct);

    return Object.keys(product)?.length > 0 ? (
        <ProductImageDescription
            spaceTopClass="pt-100"
            galleryType="fixedImage"
            spaceBottomClass="pb-100"
            product={product}
        />
    ) : null;
};

export default Product;
