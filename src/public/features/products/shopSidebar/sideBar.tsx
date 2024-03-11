import React from 'react';
import ShopTag from './shopTags';
import ShopCategories from './shopCategories';
import ShopSearch from './search';
import {
    getIndividualCategories,
    getIndividualTags,
} from 'helpers/products';
import { useRedux } from 'hooks';

interface sidebarProps {
    getSortParams: any;
    sideSpaceClass:string;
    products:any;
}
const ShopSidebar = (props:sidebarProps) => {
    const { dispatch, appSelector } = useRedux();

    const { getSortParams, sideSpaceClass, products } = props;
    const uniqueCategories = getIndividualCategories(products);
    const uniqueTags = getIndividualTags(products);

    return (
        <div className={`sidebar-style ${sideSpaceClass}`}>
            {/* shop search */}
            <ShopSearch />

            {/* filter by categories */}
            <ShopCategories
                categories={uniqueCategories}
                getSortParams={getSortParams}
            />

            {/* filter by tag */}
            <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
        </div>
    );
};

export default ShopSidebar;
