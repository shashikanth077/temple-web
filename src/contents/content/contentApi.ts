import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/**
 * Retrieves contents from the API.
 * @param payload - The payload for the API request.
 * @returns A Promise that resolves to the API response.
 */
export function getContents(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/content`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
