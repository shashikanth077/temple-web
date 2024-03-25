import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Retrieves the list of reports based on the provided payload.
 * @param payload - The payload containing the necessary data for the API request.
 * @returns A Promise that resolves to the response from the API.
 */
export function getReportList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/getTranscation`;
    const response = APICore.get(baseUrl, payload);
    return response;
}
