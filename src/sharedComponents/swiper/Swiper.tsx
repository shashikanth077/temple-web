import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'clsx';
// eslint-disable-next-line import/no-unresolved
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/no-unresolved
import {
    Navigation, A11y, Autoplay, Pagination,
} from 'swiper';

interface sliderProps{
    options:any;
    prevIcon?: string;
    nextIcon?:string;
    children: React.ReactNode;
    className?: string;
    navClass?: string;
    navStyle?: number,
    dotStyle?: number;
}

const SwiperSlider = forwardRef(
    (
        props:sliderProps,
        ref:any,
    ) => {
        const {
            prevIcon, nextIcon, children, className, navClass, options,
        } = props;
        const modules = options?.modules !== undefined ? options.modules : [];

        const prevClass = `prev-${navClass || 'swiper-nav'}`;
        const nextClass = `next-${navClass || 'swiper-nav'}`;
        const sliderOptions = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            autoplay: options?.autoplay ? {
                delay: 2500,
                disableOnInteraction: false,
            } : false,
            watchSlidesProgress: true,
            autoHeight: true,
            breakpoints: {},
            ...options,
            modules: [Navigation, Pagination, A11y, Autoplay, ...modules],
            navigation: options?.navigation
                ? {
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                }
                : false,
            pagination: options?.pagination
                ? {
                    clickable: true,
                }
                : false,
        };

        /* eslint-disable react/jsx-props-no-spreading */
        return (
            <div
                className={cn('swiper-wrap', className)}
                ref={ref}
            >
                <Swiper {...sliderOptions}>{children}</Swiper>

                {sliderOptions?.navigation && (
                    <>
                        <button
                            aria-label="prev"
                            type="button"
                            className={`swiper-button-prev ht-swiper-button-nav ${prevClass}`}
                        >
                            <i className={cn(prevIcon, 'icon')} />
                        </button>
                        <button
                            aria-label="next"
                            type="button"
                            className={`swiper-button-next ht-swiper-button-nav ${nextClass}`}
                        >
                            <i className={cn(nextIcon, 'icon')} />
                        </button>
                    </>
                )}
            </div>
        );
    },
);

export { SwiperSlide };

SwiperSlider.defaultProps = {
    prevIcon: 'pe-7s-angle-left',
    nextIcon: 'pe-7s-angle-right',
    navStyle: 1,
    dotStyle: 1,
};

export default SwiperSlider;
