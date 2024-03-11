import React, { Fragment } from 'react';
import ShopTopAction from './shopTopaction';

interface topBarProps{
    getLayout:any;
    getFilterSortParams:any;
    productCount:number
    sortedProductCount:number
}

const ShopTopbar = (props:topBarProps) => {
    const {
        getLayout, getFilterSortParams, productCount, sortedProductCount,
    } = props;
    return (
        <ShopTopAction
            getLayout={getLayout}
            getFilterSortParams={getFilterSortParams}
            productCount={productCount}
            sortedProductCount={sortedProductCount}
        />
    );
};

export default ShopTopbar;
