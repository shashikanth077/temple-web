import React from 'react';
import clsx from 'clsx';
import ProductImageGallery from './ProductImageGallery';
import ProductDescriptionInfo from './ProductDescription';
import ProductImageGallerySideThumb from './ProductImageThumbSlider';
import ProductImageFixed from './ProductImageFixed';

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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null

    );
};

export default ProductImageDescription;
