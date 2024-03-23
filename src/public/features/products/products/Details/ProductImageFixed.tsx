import React from 'react';

interface slideProps{
    product:any;
}

const ProductImageFixed = (props:slideProps) => {
    const { product } = props;

    return (
        <div className="product-large-image-wrapper">
            <div className="product-fixed-image">
                {product.image ? (
                    <img
                        src={`${product.image}`}
                        alt=""
                        className="img-fluid product-fixed-image"
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ProductImageFixed;
