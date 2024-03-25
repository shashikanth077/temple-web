import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Retrieves a service by its ID from the API.
 * @param payload - The payload containing the service ID.
 * @returns A Promise that resolves to the response from the API.
 */
export function getServiceById(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/service/${payload._id}`;
    const response = APICore.get(baseUrl, {});
    return response;
}
