import React, { useEffect } from 'react';
import {
    Col, Container, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useRedux from 'hooks/useRedux';
import { productActions } from 'features/shop/providers/productSlice';
import { selectProductsList } from 'features/shop/providers/productSelectors';
import SlickSlider from 'sharedComponents/carosel/carosel';
import './shopSlide.scss';

export default function Shop() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(productActions.fetchproductList());
    }, [dispatch]);

    const productList = appSelector(selectProductsList);

    return (
        <section className="shopping area-padding">
            <Container>
                <Row>
                    <div className="slider-area">
                        <SlickSlider
                            arrowClassPrev="shop-home-prev-pr"
                            arrowClassNext="shop-home-next-pr"
                            NumOfSlide={4}
                        >
                            {productList.map((product:any, index:any) => (
                                <Col key={product.productid} lg={4} md={6}>
                                    <Link to={`/product/${product.productid}`}>
                                        <div className="single-shop-box">
                                            <div className="thumb text-center">
                                                <img className="img-fluid" src={`${product.image[0]}`} alt="" />
                                            </div>
                                            <div className="content">
                                                <a href="##">{product.productname}</a>
                                                <div className="pricing">
                                                    <div className="regular-price">{product.price}</div>
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
