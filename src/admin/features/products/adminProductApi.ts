import { APICore } from 'helpers/api';

/* eslint-disable */
export function getProducts() {
    const baseUrl = 'http://localhost:8080/api/products';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getProductById(payload:any) {
    const baseUrl = `http://localhost:8080/api/product/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addProducts(payload:any) {
    const baseUrl = 'http://localhost:8080/api/product';
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function updateProducts(payload:any) {
    const baseUrl = `http://localhost:8080/api/product/${payload.get('_id')}`;
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteproducts(payload:any) {
    const baseUrl = `http://localhost:8080/api/product/delete/${payload._id}`;
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}
