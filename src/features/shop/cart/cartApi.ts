import { APICore } from 'helpers/api';

// cart data
export function getCartDetails(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getCartDetails/';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function AddtoCart(payload:any) {
    const baseUrl = 'http://localhost:4000/api/Addtocart/';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function deleteCart(payload:any) {
    const baseUrl = 'http://localhost:4000/api/deletefromcart/';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function decreaseQty(payload:any) {
    const baseUrl = 'http://localhost:4000/api/decreaseqty/';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
