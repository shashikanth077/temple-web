import React from 'react';
import { setActiveSort } from 'helpers/products';

interface TagProps {
    tags:any;
    getSortParams:any;
}
/* eslint-disable */
const ShopTag = (props:TagProps) => {
    const { tags, getSortParams } = props;

    return (
        <div className="sidebar-widget mt-50">
            <h4 className="pro-sidebar-title">Tag </h4>
            <div className="sidebar-widget-tag mt-25">
                {tags ? (
                    <ul>
                        {tags.map((tag:string, key:number) => (
                            <li key={key}>
                                <button
                                    aria-label="tag"
                                    type="button"
                                    onClick={e => {
                                        getSortParams('tag', tag);
                                        setActiveSort(e);
                                    }}
                                >
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    'No tags found'
                )}
            </div>
        </div>
    );
};

export default ShopTag;
