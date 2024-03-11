import React, { useEffect } from 'react';
import { productActions } from './providers/productSlice';
import ShopMain from './shopProducts/shopMain';
import { useRedux, useUser } from 'hooks';

export default function ShopLayout() {
    const { dispatch } = useRedux();
    const [loggedInUser] = useUser();

    useEffect(() => {
        dispatch(productActions.fetchproductList());
    }, [dispatch, loggedInUser]);

    return <ShopMain />;
}
