import React, { Fragment, useState } from 'react';
import { EffectFade, Thumbs } from 'swiper';
// import AnotherLightbox from 'yet-another-react-lightbox';
// import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';
// import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Swiper, { SwiperSlide } from 'sharedComponents/swiper/Swiper';

/* eslint-disable */
interface slideProps{
    product:any;
}
const ProductImageGallery = (props:slideProps) => {
    const { product } = props;

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [index, setIndex] = useState(-1);
    const slides = product?.image.map((img:any, i:any) => ({
        src: process.env.PUBLIC_URL + img,
        key: i,
    }));

    // swiper slider settings
    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        thumbs:{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null},
        modules: [EffectFade, Thumbs],
    };

    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        freeMode: true,
        loop: true,
        slideToClickedSlide: true,
        navigation: true,
    };

    return (
        <>
            <div className="product-large-image-wrapper">
                {product.discount || product.new ? (
                    <div className="product-img-badges">
                        {product.discount ? (
                            <span className="pink">-{product.discount}%</span>
                        ) : (
                            ''
                        )}
                        {product.new ? <span className="purple">New</span> : ''}
                    </div>
                ) : (
                    ''
                )}
                {product?.image?.length ? (
                    <Swiper options={gallerySwiperParams}>
                        {product.image.map((single:any, key:any) => (
                            <SwiperSlide key={key}>
                                <button aria-label="image" type="button" className="lightgallery-button" onClick={() => setIndex(key)}>
                                    <i className="pe-7s-expand1" />
                                </button>
                                <div className="single-image">
                                    <img
                                        src={process.env.PUBLIC_URL + single}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                        {/* <AnotherLightbox
                            open={index >= 0}
                            index={index}
                            close={() => setIndex(-1)}
                            slides={slides}
                            plugins={[Thumbnails, Zoom, Fullscreen]}
                        /> */}
                    </Swiper>
                ) : null}

            </div>
            <div className="product-small-image-wrapper mt-15">
                {product?.image?.length ? (
                    <Swiper options={thumbnailSwiperParams}>
                        {product.image.map((single:any, key:any) => (
                            <SwiperSlide key={key}>
                                <div className="single-image">
                                    <img
                                        src={process.env.PUBLIC_URL + single}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : null}
            </div>
        </>
    );
};


export default ProductImageGallery;
