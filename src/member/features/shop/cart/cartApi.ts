import { APICore } from 'helpers/api';

// cart data
export function getCartDetails(payload:any) {
    const baseUrl = `http://localhost:8080/api/cart/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function AddtoCart(payload:any) {
    const baseUrl = 'http://localhost:8080/api/cart';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function deleteCart(payload:any) {
    const baseUrl = `http://localhost:8080/api/cart/delete/${payload.productId}/${payload.userid}/${payload.type}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function InsertShopDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/checkout/addhistory';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
