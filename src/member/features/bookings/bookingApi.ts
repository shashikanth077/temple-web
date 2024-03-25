import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Retrieves the list of bookings for a user.
 * @param payload - The payload for the API request.
 * @returns A Promise that resolves to the API response.
 */
export function getBookingList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/mybookings`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves the available seva types from the API.
 * @returns A Promise that resolves to the response containing the seva types.
 */
export function getSevaTypes(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/sevas`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves shopping orders for a specific user and type.
 * @param payload - The payload containing the user ID and order type.
 * @returns A Promise that resolves to the response from the API.
 */
export function getShoppingOrders(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/orders/${payload.userId}/${payload.type}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Books a seva.
 * @param payload - The payload containing the seva details.
 * @returns The response from the API call.
 */
export function bookSeva(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/booking`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
