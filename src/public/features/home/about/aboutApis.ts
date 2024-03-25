import { APICore } from 'helpers/api';
import { config } from 'config/Env';

// cart data
export function getAboutDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/getaboutImages`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
