import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
export function getStaticContentDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/content`;
    const response = APICore.get(baseUrl, {});
    return response;
}

/**
 * Uploads a static file to the server.
 * @param payload - The file to be uploaded.
 * @returns A Promise that resolves to the server response.
 */
export function UploadStaticFile(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/staticupload`;
    const response = APICore.createWithFile(baseUrl, payload);
    return response;
}
