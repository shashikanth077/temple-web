import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
export function getVolunteersData(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/volunteers`;
    const response = APICore.get(baseUrl, {});
    return response;
}

/**
 * Approves a volunteer.
 * @param payload - The payload containing the data for the volunteer approval.
 * @returns The response from the API call.
 */
export function volunteerApprove(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/volunteerapprove`;
    const response = APICore.update(baseUrl, payload);
    return response;
}
