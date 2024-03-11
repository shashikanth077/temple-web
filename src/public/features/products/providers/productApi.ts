import { APICore } from 'helpers/api';

export function getProducts() {
    const baseUrl = 'http://localhost:8080/api/products';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getProductById(payload:any) {
    const baseUrl = `http://localhost:8080/api/product/${payload.id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
