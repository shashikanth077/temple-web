import React, { useEffect } from 'react';
import { productActions } from './providers/productSlice';
import { cartActions } from './cart/cartSlice';
import ShopMain from './shopProducts/shopMain';
import { useRedux } from 'hooks';

export default function ShopLayout() {
    const { dispatch } = useRedux();

    useEffect(() => {
        dispatch(productActions.fetchproductList());
        dispatch(cartActions.getCartDetails({ cartId: 3, userid: 0, token: '4353435' }));
    }, [dispatch]);

    return <ShopMain />;
}
