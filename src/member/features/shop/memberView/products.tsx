import React from 'react';
import ProductGridList from './productList';

interface shopProps{
    layout:any;
    products:any;
}

const ShopProducts = (props:shopProps) => {
    const { layout, products } = props;
    return (
        <div className="shop-bottom-area mt-35">
            <div className={`row ${layout}`}>
                <ProductGridList products={products} />
            </div>
        </div>
    );
};

export default ShopProducts;
