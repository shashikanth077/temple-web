import React from 'react';
import { useParams } from 'react-router-dom';
import ProductImageDescription from './ProductDetails';
import { useRedux } from 'hooks';
import { selectProductsList } from 'features/shop/providers/productSelectors';

/* eslint no-underscore-dangle: 0 */
const Product = () => {
    const { id } = useParams();
    const { appSelector } = useRedux();

    const products = appSelector(selectProductsList);

    const productInfo:any = products.find((product:any) => product._id.toString() === id);
    // console.log('prod info', productInfo.productid);
    return (
        productInfo.productid > 0
            ? (
                <ProductImageDescription
                    spaceTopClass="pt-100"
                    galleryType="fixedImage"
                    spaceBottomClass="pb-100"
                    product={productInfo}
                />
            ) : null

    );
};

export default Product;
