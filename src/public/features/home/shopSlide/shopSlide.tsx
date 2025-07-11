import React, { useEffect, useState } from 'react';
import {
    Col, Container, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { selectProductsList } from 'public/features/products/providers/productSelectors';
import { productActions } from 'public/features/products/providers/productSlice';
import useRedux from 'hooks/useRedux';
import SlickSlider from 'sharedComponents/carosel/carosel';
import './shopSlide.scss';
import { formatCurrency } from 'helpers/currency';

/* eslint no-underscore-dangle: 0 */
export default function Shop() {
    const { dispatch, appSelector } = useRedux();
    const intl = useIntl();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [slideOnPage, setSlideOnPage] = useState(1);
/* eslint-disable */
    useEffect(() => {
        dispatch(productActions.fetchproductList());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        if (screenWidth < 768) {
            setSlideOnPage(1);
        } else {
            setSlideOnPage(4);
        }
      }, [screenWidth]);

    const productList = appSelector(selectProductsList);

    if(!productList || productList.length === 0) {
        return null;
    }
    
    return (
        <section className="shopping area-padding">
            <Container>
                <Row>
                    <div className="slider-area">
                        <SlickSlider
                            arrowClassPrev="shop-home-prev-pr"
                            arrowClassNext="shop-home-next-pr"
                            NumOfSlide={slideOnPage}
                            autoPly={false}
                        >
                            {productList?.map((product:any, index:any) => (
                                <Col key={product.productid} lg={slideOnPage} md={slideOnPage + 2}>
                                    <Link to={`/products/details/${product._id}`}>
                                        <div className="single-shop-box">
                                            <div className="thumb text-center">
                                                <img className="img-fluid" src={`${product.image}`} alt="" />
                                            </div>
                                            <div className="content">
                                                <a href="##">{product.name}</a>
                                                <div className="pricing">
                                                    <div className="regular-price">{formatCurrency(intl, product.price)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </SlickSlider>
                    </div>
                </Row>
            </Container>
        </section>
    );
}