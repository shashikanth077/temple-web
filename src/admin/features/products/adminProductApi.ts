import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
export function getProducts() {
    const baseUrl = `${config.API_BASE_URL}/api/products`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function getProductById(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/product/${payload._id}`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function addProducts(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/product`;
    const response = APICore.createWithFile(baseUrl, payload);
    return response;
}

/**
 * Updates the products with the given payload.
 * 
 * @param payload - The payload containing the updated product data.
 * @returns The response from the API after updating the products.
 */
export function updateProducts(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/product/${payload.get('_id')}`;
    const response = APICore.createWithFileUpdate(baseUrl, payload);
    return response;
}

export function deleteproducts(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/product/delete/${payload._id}`;
    const response = APICore.create(baseUrl, {});
    return response;
}
