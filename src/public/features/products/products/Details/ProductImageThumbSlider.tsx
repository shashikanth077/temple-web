import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { EffectFade, Thumbs } from 'swiper';
// eslint-disable-next-line import/no-unresolved
// import AnotherLightbox from 'yet-another-react-lightbox';
// import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';
// import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Swiper, { SwiperSlide } from 'sharedComponents/swiper/Swiper';

interface slideProps{
    product:any;
    thumbPosition:any;
}

/* eslint-disable */
// @ts-nocheck 
const ProductImageGalleryLeftThumb = (props:slideProps) => {
    const { product, thumbPosition } = props;

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [index, setIndex] = useState(-1);

    const slides = product?.image.map((img:any, i:number) => ({
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
        loop: true,
        slideToClickedSlide: true,
        direction: 'vertical',
        breakpoints: {
            320: {
                slidesPerView: 4,
                direction: 'horizontal',
            },
            640: {
                slidesPerView: 4,
                direction: 'horizontal',
            },
            768: {
                slidesPerView: 4,
                direction: 'horizontal',
            },
            992: {
                slidesPerView: 4,
                direction: 'horizontal',
            },
            1200: {
                slidesPerView: 4,
                direction: 'vertical',
            },
        },
    };

    /* eslint-disable no-use-before-define */
    return (
        <div className="row row-5 test">
            <div
                className={clsx(thumbPosition && thumbPosition === 'left'
                    ? 'col-xl-10 order-1 order-xl-2'
                    : 'col-xl-10')}
            >
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
                            {product?.image.map((single:any, key:number) => (
                                <SwiperSlide key={key}>
                                    <button type="button" aria-label="slide" className="lightgallery-button" onClick={() => setIndex(key)}>
                                        <i className="pe-7s-expand1" />
                                    </button>
                                    <div className="single-image">
                                        <img
                                           src={`${window.location.origin}/${single}`}
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
            </div>
            <div
                className={clsx(thumbPosition && thumbPosition === 'left'
                    ? 'col-xl-2 order-2 order-xl-1'
                    : 'col-xl-2')}
            >
                <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
                    {product?.image?.length ? (
                        <Swiper options={thumbnailSwiperParams}>
                            {product.image.map((single:any, key:any) => (
                                <SwiperSlide key={key}>
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
                    ) : null }

                </div>
            </div>
        </div>
    );
};



export default ProductImageGalleryLeftThumb;
