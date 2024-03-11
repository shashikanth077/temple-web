import React from 'react';
import { setActiveSort } from 'helpers/products';

interface categoryProps {
    categories:any;
    getSortParams:any;
}

/* eslint-disable */
const ShopCategories = (props:categoryProps) => {
    const { categories, getSortParams } = props;

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Categories </h4>
            <div className="sidebar-widget-list mt-30">
                {categories ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <button
                                    aria-label="category"
                                    type="button"
                                    onClick={e => {
                                        getSortParams('category', '');
                                        setActiveSort(e);
                                    }}
                                >
                                    <span className="checkmark" /> All Categories
                                </button>
                            </div>
                        </li>
                        {categories.map((category:string, key:number) => (
                            <li key={`${category}+${key}`}>
                                <div className="sidebar-widget-list-left">
                                    <button
                                        aria-label="category"
                                        type="button"
                                        onClick={e => {
                                            getSortParams('category', category);
                                            setActiveSort(e);
                                        }}
                                    >
                                        {' '}
                                        <span className="checkmark" /> {category}{' '}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    'No categories found'
                )}
            </div>
        </div>
    );
};

export default ShopCategories;
