import { APICore } from 'helpers/api';
import { config } from 'config/Env';

// cart data
export function getCartDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/cart/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function AddtoCart(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/cart`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function deleteCart(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/cart/delete/${payload.productId}/${payload.userid}/${payload.type}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function InsertShopDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/checkout/addhistory`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
