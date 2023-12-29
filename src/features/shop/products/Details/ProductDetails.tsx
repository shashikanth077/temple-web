import React from 'react';
import clsx from 'clsx';
import ProductImageGallery from './ProductImageGallery';
import ProductDescriptionInfo from './ProductDescription';
import ProductImageGallerySideThumb from './ProductImageThumbSlider';
import ProductImageFixed from './ProductImageFixed';
import { getDiscountPrice } from 'helpers/products';
import { selectCurrentCartData } from 'features/shop/cart/cartSelectors';
import { useRedux } from 'hooks';

interface imageProps{
    spaceTopClass:string;
    spaceBottomClass:string;
    galleryType:string;
    product:any;
}
const ProductImageDescription = (props:imageProps) => {
    const {
        spaceTopClass, spaceBottomClass, galleryType, product,
    } = props;

    const currency = {
        currencyRate: 45.56,
    };

    const { appSelector } = useRedux();

    const discountedPrice:any = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);

    const cartItems:any = appSelector(selectCurrentCartData);
    console.log('prod  items', product);

    let GalleryType;
    if (galleryType === 'leftThumb') {
        GalleryType = (
            <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
            />
        );
    } else if (galleryType === 'rightThumb') {
        GalleryType = <ProductImageGallerySideThumb thumbPosition="right" product={product} />;
    } else if (galleryType === 'fixedImage') {
        GalleryType = <ProductImageFixed product={product} />;
    } else {
        GalleryType = <ProductImageGallery product={product} />;
    }
    return (
        product.productid > 0
            ? (
                <div className={clsx('shop-area', spaceTopClass, spaceBottomClass)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                {GalleryType}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                {/* product description info */}
                                <ProductDescriptionInfo
                                    product={product}
                                    discountedPrice={discountedPrice}
                                    currency={4}
                                    finalDiscountedPrice={finalDiscountedPrice}
                                    finalProductPrice={finalProductPrice}
                                    cartItems={cartItems}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null

    );
};

export default ProductImageDescription;
