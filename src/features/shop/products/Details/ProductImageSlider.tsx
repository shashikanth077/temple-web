import React from 'react';
import { Products } from 'models';
import Swiper, { SwiperSlide } from 'sharedComponents/swiper/Swiper';

interface slideProps{
    product:any;
}
const ProductImageGallerySlider = (props:slideProps) => {
    const { product } = props;

    // swiper slider settings
    const gallerySwiperParams = {
        spaceBetween: 15,
        slidesPerView: 3,
        loop: true,
        navigation: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    };
    return (
        <div className="product-large-image-wrapper product-large-image-wrapper--slider">
            {product?.image.length ? (
                <Swiper options={gallerySwiperParams}>
                    {product.image.map((single:any, key:number) => (
                        <SwiperSlide key={`${product.productid}`}>
                            <div className="single-image">
                                <img
                                    src={`${window.location.origin}/${single}`}
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : null}
        </div>
    );
};

export default ProductImageGallerySlider;
