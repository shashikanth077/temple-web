import React from 'react';
import Button from 'sharedComponents/button/button';

const ShopSearch = () => (
    <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-50 mt-25">
            <form className="pro-sidebar-search-form" action="#">
                <input type="text" placeholder="Search here..." />
                <Button classnames="shop-search"><i className="fas fa-search" />
                </Button>
            </form>
        </div>
    </div>
);

export default ShopSearch;
