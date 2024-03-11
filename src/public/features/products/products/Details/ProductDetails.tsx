import React from 'react';
import clsx from 'clsx';
import ProductImageGallery from './ProductImageGallery';
import ProductDescriptionInfo from './ProductDescription';
import ProductImageGallerySideThumb from './ProductImageThumbSlider';
import ProductImageFixed from './ProductImageFixed';
import { getDiscountPrice } from 'helpers/products';
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

    const discountedPrice:any = getDiscountPrice(product?.price, product?.discount);
    const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);

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
        Object.keys(product)?.length > 0
            ? (
                <div className={clsx('shop-area', spaceTopClass, spaceBottomClass)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                {GalleryType}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <ProductDescriptionInfo
                                    product={product}
                                    discountedPrice={discountedPrice}
                                    currency={4}
                                    finalDiscountedPrice={finalDiscountedPrice}
                                    finalProductPrice={finalProductPrice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null

    );
};

export default ProductImageDescription;
