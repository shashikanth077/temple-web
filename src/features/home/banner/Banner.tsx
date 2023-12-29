import React from 'react';
import SlickSlider from 'sharedComponents/carosel/carosel';
import useRedux from 'hooks/useRedux';
import { selectStaticContentHome } from 'features/content/contactSelectors';

/* eslint-disable global-require */
const Banner = () => {
    const { appSelector } = useRedux();

    const bannerList:any = appSelector(selectStaticContentHome);

    return (
        <section className="home-slides slider-area">
            <SlickSlider
                arrowClassPrev="banner-home-next-pr"
                arrowClassNext="banner-home-prev-ar"
                NumOfSlide={1}
                autoPly
                dotsStatus
                autoplaySpeedVal={3000}
            >
                {
                    bannerList?.homeBanner?.map((item:any) => (
                        <div key={item.id}>
                            <div
                                className="slider-item"
                                style={{ backgroundImage: `url(${`assets/images/homebannerimages/${item.banner_image}`})` }}
                            >
                                <div className="container">
                                    <div className="slider-content">
                                        <h2>{item.main_title}</h2>
                                        <p>{item.caption}</p>
                                        {/* <Link to={`${process.env.PUBLIC_URL + item.btnLink}`} className="btn btn-brand">{item.btnText}</Link> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </SlickSlider>
        </section>
    );
};

export default React.memo(Banner);
