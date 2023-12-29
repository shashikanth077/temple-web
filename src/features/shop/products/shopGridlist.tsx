import React from 'react';
import { selectCurrentCartData } from '../cart/cartSelectors';
import ProductGridListSingle from './shopGridListSingle';
import { useRedux } from 'hooks';

interface GridProps{
    products:any;
}
function ProductGridList(props:GridProps) {
    const { products } = props;
    const { appSelector } = useRedux();

    const CurrentCartItems = appSelector(selectCurrentCartData);

    const count = 1;
    return (

        products.length > 0
                && products?.map((product:any, index:number) => (
                    <div className="col-xl-4 col-sm-6" key={product.id}>
                        <ProductGridListSingle
                            product={product}
                            index={index}
                            cartItem={CurrentCartItems}
                            currency="$"
                        />
                    </div>
                ))

    );
}
export default ProductGridList;
