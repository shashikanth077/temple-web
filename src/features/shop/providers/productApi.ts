import { APICore } from 'helpers/api';

export function getProducts() {
    const baseUrl = 'http://localhost:4000/api/getProducts';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
