import { config } from 'config/Env';
import { APICore } from 'helpers/api';

/* eslint-disable */
/**
 * Retrieves the details of a god by their ID.
 * @param payload - The payload containing the god's ID.
 * @returns A Promise that resolves to the response from the API.
 */
export function getGodByIdDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/god/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves the details of gods.
 * @param payload - The payload for the API request.
 * @returns A Promise that resolves to the response from the API.
 */
export function getGodsDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/gods`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Adds gods to the server.
 * @param payload - The data payload containing the gods information.
 * @returns The response from the server.
 */
export function addGods(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/god`;
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

/**
 * Edits the gods with the given payload.
 * @param payload - The payload containing the data to update the gods.
 * @returns The response from the API call.
 */
export function editGods(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/god/` + payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

/**
 * Deletes a god based on the provided payload.
 * @param payload - The payload containing the god's ID.
 * @returns The response from the API call.
 */
export function deleteGods(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/god/delete/${payload._id}`;
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}
