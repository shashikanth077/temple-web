import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { UpdateQuantity, removeItem, ClearCart } from './grocerySlice';
import { useRedux } from 'hooks';

/* eslint-disable */
interface CartItems {
    currentItems: any;
}

const MySwal = withReactContent(Swal);

const CartGrocery = (prop: CartItems) => {
    const { currentItems } = prop;
    const { dispatch } = useRedux();
    const navigate = useNavigate();

    let newArray: any;
    if (Array.isArray(currentItems)) {
        newArray = currentItems;
    } else {
        newArray = [currentItems]
    }

    const getTotalQuantity = () => {
        let total = 0
        newArray.forEach((item: any) => {
            total += item.quantity * item.price
        })
        return total
    }

    const CheckoutGrocery = () => {

        let total = getTotalQuantity();

        if (total < 50) {
            MySwal.fire({
                title: <p>Please donate minimum $50</p>,
            }).then(() => {
            })
        } else {
            navigate("/donation/grocery/checkout");
        }
    }

    const CleanGroceryCart = () => {
        dispatch(ClearCart());
    }

    const RemoveFromCart = (productid: any) => {
        dispatch(removeItem({ _id: productid }));
    }

    const UpdateQty = (e: any, productId: any) => {
        let UpdateData = {
            quantity: e.target.value,
            _id: productId
        }
        dispatch(UpdateQuantity(UpdateData));
    };

    return (
        <>
            {newArray &&
                <div className="card card-solid">
                    <div className="card-header">
                        <h3 className="card-title">
                            <b>Cart Items</b>
                        </h3>
                        Donation items count : <b id="items_count" className="items_count">{newArray?.length}</b>
                    </div>
                    <div className="card-body pb-0">
                        <div className="row" id="temp_products_container">
                            <div className="col-12 col-sm-6 col-md-12 d-flex align-items-stretch flex-column">
                                {newArray?.map((Item: any, index: number) => (
                                    <div className="card bg-light d-flex flex-fill mb-4">
                                        <div className="card-header text-muted border-bottom-0" />
                                        <div className="card-body pt-0">
                                            <div className="row">
                                                <div className="col-10">
                                                    <h2 className="lead">
                                                        <b>{Item.name}</b>
                                                    </h2>
                                                    <h6>
                                                        <b>${Item.price}</b>
                                                    </h6>
                                                    <div className="text-left">
                                                        <b> <b>${Item.price}</b> * {Item.quantity} <input type="text" value={Item.quantity} min="1" onChange={e => UpdateQty(e, Item._id)} className="form-control-sm grocery-qty-input w-25" /> = ${Item.price * Item.quantity} </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" onClick={() => RemoveFromCart(Item._id)} className="btn btn grocery-btn">Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-left">
                            <p>Total : $ <b id="total_products_price">{getTotalQuantity()}</b>
                            </p>
                            <button type="button" onClick={() => CheckoutGrocery()} className="btn btn-sm grocery-btn mr-2">
                                <i className="fa fa-check-circle" /> Checkout
                            </button>
                            <button type="button" onClick={() => CleanGroceryCart()} className="btn btn-sm grocery-btn">
                                <i className="fa fa-trash"  /> Clear
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CartGrocery;
