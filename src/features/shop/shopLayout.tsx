import React, { useEffect } from 'react';
import { productActions } from './providers/productSlice';
import { cartActions } from './cart/cartSlice';
import ShopMain from './shopProducts/shopMain';
import { useRedux, useUser } from 'hooks';

export default function ShopLayout() {
  const { dispatch } = useRedux();
  const [loggedInUser] = useUser();

  useEffect(() => {
    dispatch(productActions.fetchproductList());
    dispatch(cartActions.getCartDetails({ userid: loggedInUser?.id }));
  }, [dispatch, loggedInUser]);

  return <ShopMain />;
}
