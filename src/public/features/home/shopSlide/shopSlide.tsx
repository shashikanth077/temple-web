import React, { useEffect } from 'react';
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
                            NumOfSlide={productList.length > 4 ? 4 : productList.length}
                            autoPly={false}
                        >
                            {productList?.map((product:any, index:any) => (
                                <Col key={product.productid} lg={productList.length > 4 ? 4 : productList.length} md={6}>
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
