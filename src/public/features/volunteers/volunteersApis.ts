import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Inserts a new volunteer into the system.
 * @param payload - The data of the volunteer to be inserted.
 * @returns A Promise that resolves to the response from the server.
 */
export function InsertVolunteers(payload:any) {
    const baseUrl = config.API_BASE_URL + '/api/volunteers';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
