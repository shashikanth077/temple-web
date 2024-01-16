import React from 'react';

interface slideProps{
    product:any;
}

const ProductImageFixed = (props:slideProps) => {
    const { product } = props;

    return (
        <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
                <div className="product-img-badges">
                    {/* {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                    ) : (
                        ''
                    )} */}
                    {product.new ? <span className="purple">New</span> : ''}
                </div>
            ) : (
                ''
            )}

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
