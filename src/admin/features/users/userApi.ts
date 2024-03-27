import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Retrieves a list of users from the API.
 * @param payload - The payload for the API request.
 * @returns A Promise that resolves to the API response.
 */
export function getUsers(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/users`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves a user by their ID.
 * @param payload - The payload containing the user ID.
 * @returns A Promise that resolves to the response from the API.
 */
export function getUserById(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/${payload._id}/user`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addUser(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/user`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

/**
 * Updates the roles of a user.
 * @param payload - The payload containing the user ID and the new roles.
 * @returns A Promise that resolves to the updated user object.
 */
export function updateRoles(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/${payload._id}/roles`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

/**
 * Deletes a user.
 * @param payload - The payload containing the user information.
 * @returns A Promise that resolves to the response from the server.
 */
export function deleteUser(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/${payload._id}/activate`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

