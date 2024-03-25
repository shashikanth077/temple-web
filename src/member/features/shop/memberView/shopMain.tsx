import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ShopTopbar from './shoptopBar/shopTopbar';
import { selectProductsList } from './providers/productSelectors';
import ShopProducts from './products';
import { useRedux } from 'hooks';
import { getSortedProducts } from 'helpers/products';
/* eslint-disable */
const ShopGridStandard = () => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setItemOffset] = useState(0);
    const [currentData, setCurrentData] = useState([]);

    const { appSelector } = useRedux();
    const products = appSelector(selectProductsList);

    const pageLimit = 10;
    const pageCount = products && products.length ? Math.ceil(products.length / pageLimit) : 0;

    const getLayout = (layouPage:any) => {
        setLayout(layouPage);
    };

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * pageLimit) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`,
        );
        setItemOffset(newOffset);
    };

    const getFilterSortParams = (sortTypeVal:any, sortVal:any) => {
        setFilterSortType(sortTypeVal);
        setFilterSortValue(sortVal);
    };

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setCurrentData(sortedProducts?.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <div className="shop-area pt-95 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 order-1 order-lg-2">

                    {products && <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />}
                        <ShopProducts layout={layout} products={currentData} />

                        <div className="pro-pagination-style text-center mt-30">
                            <nav aria-label="Page navigation comments" className="mt-4">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">>"
                                    activeClassName="active"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="<<"
                                    renderOnZeroPageCount={null}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopGridStandard;
