import { APICore } from 'helpers/api';
import { config } from 'config/Env';

export function getProducts() {
    const baseUrl = `${config.API_BASE_URL}/products`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function getProductById(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/product/${payload.id}`;
    const response = APICore.get(baseUrl, {});
    return response;
}
