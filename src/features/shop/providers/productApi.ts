import { APICore } from 'helpers/api';

export function getProducts() {
    const baseUrl = 'http://localhost:8080/api/products';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
